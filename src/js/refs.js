import { doc } from 'firebase/firestore';

export default {
  burgerBtn: document.querySelector('.js-burger'),
  iconClose: document.querySelector('.close-menu'),
  iconBurger: document.querySelector('.open-menu'),
  mobileMenu: document.querySelector('.mobile-menu'),
  singupBtn: document.querySelector('.js-authorization'),
  shoppingList: document.querySelector('.js-shopping-list'),
  homeLink: document.querySelector('.js-home-link'),

  checkTheme: document.querySelector('.check-theme'),

  formAuth: document.querySelector('.modal-form-auth'),
  inputAuthLogin: document.querySelector('[type="text"]'),
  inputAuthEmail: document.querySelector('[type="email"]'),
  inputAuthPassword: document.querySelector('[type="password"]'),
  submitBtn: document.querySelector('.sign-button-auth-submit'),
  signUp: document.querySelector('[data-sign-up]'),
  signIn: document.querySelector('[data-sign-in]'),
  modalAuth: document.querySelector('[data-modalauth]'),
  userNoneBtn: document.querySelector('.auth-logon-noneuser'),
  userNameBtn: document.querySelector('.auth-logon-isuser'),
  userNone: document.querySelector('.auth-logon-noneuser-text'),
  userName: document.querySelector('.auth-logon-isuser-text'),
  userLogout: document.querySelector('.auth-logout'),
  userLogon: document.querySelector('.auth-logon'),

  categoryListEl: document.querySelector('.category__list'),
  scrollUp: document.querySelector('.scroll-up'),
  sliderArrowDown: document.querySelector('.slider-arrow-down'),
  sponsorsList: document.querySelector('.sponsors-list'),
  categoryChoice: document.querySelector('.category-choice'),
  bookList: document.querySelector('.book-list'),
  bookList0: document.querySelector('.books0'),
  mainBody: document.body,

  loadMoreBtn: document.querySelector('.load-more'),

  listTitle: document.querySelector('.book-list-title'),
  listTitleSpan: document.querySelector('.book-list-title-span'),

  sliderUkraine: document.querySelector('.slider-swiper'),

  homePage: document.querySelector('.home-page'),
  allModal: document.querySelector('#allModal'),
  storageButton: document.querySelector('.add-storage-button'),
  removeStorageBtn: document.querySelector('.remove-modal-btn'),
  storageDescription: document.querySelector('.storage-description'),
  idModal: document.querySelector('.about-book-modal'),
  idModalBackdrop: document.querySelector('.backdrop-modal'),
  closeModalBtn: document.querySelector('#modal-close'),
};
