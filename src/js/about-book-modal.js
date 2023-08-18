// Імпорт необхідних модулів і зображень
import { openModalId } from './modals';
import refs from './refs';
import onError from './error';
import BooksService from './BooksService';
import { booksOrdered } from './components/header';

import amazonPng from '../images/shopping/amazon-icon1x.png';
import amazonPng2x from '../images/shopping/amazon-icon2x.png';
import appleBookPng from '../images/shopping/applebook-icon1x.png';
import appleBookPng2x from '../images/shopping/applebook-icon2x.png';
import bookShopPng from '../images/shopping/bookshop-icon1x.png';
import bookShopPng2x from '../images/shopping/bookshop-icon2x.png';

const {
  allModal,
  storageButton,
  removeStorageBtn,
  storageDescription,
  homePage,
} = refs;

const booksService = new BooksService();

// Константа для зберігання даних в локальному сховищі
const STORAGE_KEY = 'storage-data';

// Масив та об'єкт для зберігання даних
let storageArr2 = [];
let storageObj = {};

// Додавання обробників подій
storageButton.addEventListener('click', onStorageAdd);
removeStorageBtn.addEventListener('click', onStorageDelete);
homePage.addEventListener('click', onBookClick);

function onBookClick(evt) {
  if (evt.target.className !== 'all-book-popup') return;

  const booklId = evt.target.dataset.bookid;
  openModalId();
  createModal(booklId);
}

// // Асинхронна функція для створення вмісту модалки за допомогою отриманих даних
async function createModal(bookId) {
  allModal.innerHTML = '';
  try {
    booksService.bookId = bookId;
    const data = await booksService.getBooksById();
    createStorageObject(data);
    storageCheck();
    createMarkup(data);
    // return data;
  } catch (err) {
    onError(err);
  }
}

// Функція, що заповнює об'єкт даними зі звернення
function createStorageObject(data) {
  storageObj = {
    book_image: data.book_image,
    title: data.title,
    author: data.author,
    marketAmazon: data.buy_links[0].url,
    marketAppleBooks: data.buy_links[1].url,
    marketBookshop: data.buy_links[4].url,
    description: data.description,
    list_name: data.list_name,
    id: data._id,
  };
}

// Функція для перевірки наявності даних у локальному сховищі
function storageCheck() {
  const storageArr = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const idToFind = storageObj.id;

  if (!storageArr || storageArr.length === 0) {
    storageButton.style.display = 'block';
    removeStorageBtn.style.display = 'none';
    booksOrdered();
    return;
  } else {
    const objToFind = storageArr.find(obj => obj.id === idToFind);
    if (!objToFind) {
      storageButton.style.display = 'block';
      removeStorageBtn.style.display = 'none';
    } else {
      storageButton.style.display = 'none';
      removeStorageBtn.style.display = 'block';
    }
  }
  booksOrdered();
}

// Функція для створення розмітки модалки
function createMarkup(data) {
  const bookModalImage = data.book_image;
  const bookTitle = data.title;
  const bookAuthor = data.author;
  const bookDescription = data.description;
  const bookDescriptionNone = 'There is no summary for this book.';
  const marketAmazon = data.buy_links[0].url;
  const marketAppleBooks = data.buy_links[1].url;
  const marketBookshop = data.buy_links[4].url;

  const html = `
    <img src="${bookModalImage}" alt="Зображення книги" class="image-about-book-modal">
    <div class="info-modal">
      <h2 class="title-about-book-modal">${bookTitle}</h2>
      <p class="author-about-book-modal">${bookAuthor}</p>
      <p class="text-about-book-modal">${
        data.description === '' ? bookDescriptionNone : bookDescription
      }</p>
      <ul class="shop-modal-list">
        <li class="shop-modal-item"><a href="${marketAmazon}" target="_blank">
          <img
            width="62"
            height="19"
            srcset="${amazonPng} 1x, ${amazonPng2x} 2x" 
            src="${amazonPng}"
            alt="Amazon"
          /></a>
        </li>
        <li class="shop-modal-item"><a href="${marketAppleBooks}" target="_blank">
          <img
            width="33"
            height="32"
            srcset="${appleBookPng} 1x, ${appleBookPng2x} 2x"
            src="${appleBookPng}"
            alt="AppleBooks"
          /></a>
        </li>
        <li class="shop-modal-item"><a href="${marketBookshop}" target="_blank">
          <img
            width="38"
            height="36"
            srcset="${bookShopPng} 1x, ${bookShopPng2x} 2x"
            src="${bookShopPng}"
            alt="Book-Shop"
          /></a>
        </li>
      </ul>
    </div>
  `;

  allModal.innerHTML = html;
}

// Функція для додавання даних до локального сховища
function onStorageAdd() {
  const realStorageArr = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const dataToSave = storageObj;

  if (!realStorageArr || realStorageArr.length === 0) {
    storageArr2.push(dataToSave);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageArr2));
  } else {
    realStorageArr.push(dataToSave);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(realStorageArr));
  }

  storageDescription.textContent =
    'Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.';
  storageCheck();
}

// Функція для видалення даних з локального сховища
function onStorageDelete() {
  storageDescription.textContent = '';

  const idToDelete = storageObj.id;
  const storageArr = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const indexToDelete = storageArr.findIndex(obj => obj.id === idToDelete);
  storageArr.splice(indexToDelete, 1);
  storageArr2.splice(indexToDelete, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storageArr));
  storageCheck();
}
