const throttle = require('lodash.throttle');
import refs from '../refs';
import onError from '../error';
import onMessageSuccess from './message';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserInfo,
} from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCLvX8-Phpq_8ryBF-_fTZiLcLcJvYg6Ps',
  authDomain: 'bookshelf-96ecb.firebaseapp.com',
  projectId: 'bookshelf-96ecb',
  storageBucket: 'bookshelf-96ecb.appspot.com',
  messagingSenderId: '83733055479',
  appId: '1:83733055479:web:3665918d4fcdd1c4d550f2',
  measurementId: 'G-F45EYV47FF',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const {
  formAuth,
  inputAuthLogin,
  inputAuthEmail,
  inputAuthPassword,
  submitBtn,
  signUp,
  signIn,
  userName,
  userNoneBtn,
  userNameBtn,
  modalAuth,
  userLogout,
  headerCont,
  userLogon,
  sliderUkraine,
} = refs;

const KEY_AUTH_IN_STORAGE = 'authorization-form-state';
const dataAuthInStorage = {};
const SWITCH_IN_UP = 'switch-in-up';
const USER_NAME = 'user-name';
localStorage.setItem(SWITCH_IN_UP, 'up');

const user = localStorage.getItem(USER_NAME);

if (user) {
  userName.textContent = user;
  userNameBtn.classList.remove('is-hidden');
  userNoneBtn.classList.add('is-hidden');
  // sliderUkraine.style.zIndex = 1;
} else {
  userName.textContent = 'User';
  userNameBtn.classList.add('is-hidden');
  userNoneBtn.classList.remove('is-hidden');
  // sliderUkraine.style.zIndex = -1;
}

checkAuthStorage();

function checkAuthStorage() {
  try {
    const dataAuthInStorage = JSON.parse(
      localStorage.getItem(KEY_AUTH_IN_STORAGE)
    );
    if (
      !dataAuthInStorage ||
      !dataAuthInStorage.name ||
      !dataAuthInStorage.email
    )
      return;
    inputAuthLogin.value = dataAuthInStorage.name;
    inputAuthEmail.value = dataAuthInStorage.email;
    inputAuthPassword.value = dataAuthInStorage.password;
  } catch {
    alert('Error in local storage! Empty key value.');
  }
}

formAuth.addEventListener('input', throttle(onEnterAuthInput, 500));
formAuth.addEventListener('submit', onClickAuthSubmit);

function onEnterAuthInput(event) {
  dataAuthInStorage[event.target.name] = event.target.value;
  dataAuthInStorage.password = '********';
  localStorage.setItem(KEY_AUTH_IN_STORAGE, JSON.stringify(dataAuthInStorage));
}

function onClickAuthSubmit(evt) {
  evt.preventDefault();
  const dataAuthInStorage = JSON.parse(
    localStorage.getItem(KEY_AUTH_IN_STORAGE)
  );
  const switchFromStorage = localStorage.getItem(SWITCH_IN_UP);
  if (switchFromStorage === 'up')
    if (
      !dataAuthInStorage ||
      !dataAuthInStorage.name ||
      !dataAuthInStorage.email
    )
      return;
  if (switchFromStorage === 'in')
    if (!dataAuthInStorage || !dataAuthInStorage.email) return;

  evt.target.reset();
  localStorage.removeItem(KEY_AUTH_IN_STORAGE);
  modalAuth.classList.toggle('is-hidden');

  if (switchFromStorage === 'up') {
    createUserWithEmailAndPassword(
      auth,
      dataAuthInStorage.email,
      dataAuthInStorage.password
    )
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // ...
        const userToStorage = dataAuthInStorage.name;
        userName.textContent = userToStorage;
        localStorage.setItem(USER_NAME, userToStorage);
        userNameBtn.classList.remove('is-hidden');
        userNoneBtn.classList.add('is-hidden');
        headerCont.classList.toggle('is-hidden');
        onMessageSuccess(userToStorage);
      })
      .catch(error => {
        // onMessageSuccess('Stephan');
        const errorCode = error.code;
        onError(errorCode);
        // const errorMessage = error.message;
        // console.log(errorCode);
        // console.log(errorMessage);
        // ..
      });
    // onAuthStateChanged(auth, user => {
    //   // console.log(user);
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/auth.user
    //     const uid = user.uid;
    //     // console.log(uid);
    //     // alert('User in');
    //     // ...
    //   } else {
    //     // User is signed out
    //     // alert('User out');
    //     // ...
    //   }
    // });
  }
  if (switchFromStorage === 'in') {
    signInWithEmailAndPassword(
      auth,
      dataAuthInStorage.email,
      dataAuthInStorage.password
    )
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        // ...
        const userToStorage = dataAuthInStorage.email;
        userName.textContent = userToStorage;
        localStorage.setItem(USER_NAME, userToStorage);
        userNameBtn.classList.remove('is-hidden');
        userNoneBtn.classList.add('is-hidden');
        headerCont.classList.toggle('is-hidden');
      })
      .catch(error => {
        onMessageSuccess('Stephan');
        // const errorCode = error.code;
        // onError(errorCode);
        // const errorMessage = error.message;
        // console.log(errorCode);
        // console.log(errorMessage);
      });
    // onAuthStateChanged(auth, user => {
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/auth.user
    //     const uid = user.uid;
    //     // console.log(uid);
    //     // alert('User in');
    //     // ...
    //   } else {
    //     // User is signed out
    //     // alert('User out');
    //     // ...
    //   }
    // });
  }
}

userLogout.addEventListener('click', () => {
  localStorage.removeItem(USER_NAME);
  userName.textContent = 'User';
  userNameBtn.classList.add('is-hidden');
  userNoneBtn.classList.remove('is-hidden');
  userLogout.classList.add('is-hidden');
});
userLogon.addEventListener('click', () => {
  userLogout.classList.toggle('is-hidden');
});

(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', openModal);
  refs.closeModalBtn.addEventListener('click', closeModal);

  function openModal() {
    const userFromStorage = localStorage.getItem(USER_NAME);
    if (userFromStorage && refs.modal.classList.contains('is-hidden')) return;
    refs.modal.classList.remove('is-hidden');
    userLogout.classList.add('is-hidden');
    document.addEventListener('keydown', closeModalEsc);
  }
  function closeModal() {
    const userFromStorage = localStorage.getItem(USER_NAME);
    if (userFromStorage && !refs.modal.classList.contains('is-hidden')) return;
    refs.modal.classList.add('is-hidden');
    document.removeEventListener('keydown', closeModalEsc);
  }
  const closeModalEsc = e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };
})();

signUp.addEventListener('click', () => {
  if (submitBtn.textContent !== 'Sign In') {
    localStorage.setItem(SWITCH_IN_UP, 'up');
    inputAuthLogin.classList.remove('is-hidden');
    submitBtn.textContent = 'Sign up';
  }
});
signIn.addEventListener('click', () => {
  if (submitBtn.textContent !== 'Sign Up') {
    localStorage.setItem(SWITCH_IN_UP, 'in');
    inputAuthLogin.classList.add('is-hidden');
    submitBtn.textContent = 'Sign in';
  }
});
