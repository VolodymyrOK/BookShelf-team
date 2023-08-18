import emptyDtTab1x from '/src/images/shopping-list-empty/tablet/books.png';
import emptyDtTab2x from '/src/images/shopping-list-empty/tablet/books@2x.png';
import emptyMob1x from '/src/images/shopping-list-empty/mobile/books.png';
import emptyMob2x from '/src/images/shopping-list-empty/mobile/books@2x.png';

import Pagination from 'tui-pagination';
import { booksOrdered } from './header';

const cartEl = document.querySelector('.js-shopping-cart');
const cartListEl = document.querySelector('.shopping-list-container');
const paginationContainer = document.getElementById('pagination');

const STORAGE_KEY = 'storage-data';

let page;
let currentPage = 1;
let itemsPerPage;
let visiblePages;
let resizeTimeout;

cartListEl.addEventListener('click', deleteCard);
window.addEventListener('resize', changePagOptionsByScreenWidth);
document.addEventListener('DOMContentLoaded', firstPageLoaded);

createShoppingList();

function createShoppingList() {
  const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!storageData || storageData.length === 0) {
    createEmptyCart();
  } else {
    const totalItems = storageData.length;
    initPagination(totalItems);
    createFullCart(storageData, currentPage);
  }
}

// Функція створення порожнього кошика
function createEmptyCart() {
  const markup = `
    <div class="cart-empty">
      <p class="cart-empty__text">
        This page is empty, add some books and proceed to order.
      </p>
      <picture>
        <source
          srcset="
            ${emptyDtTab1x} 1x,
            ${emptyDtTab2x} 2x
          "
          media="(min-width: 768px)"
        />
        <img
          srcset="
            ${emptyMob1x} 1x,
            ${emptyMob2x} 2x
            "
          src="${emptyMob1x}"
          alt="Empty cart"
          loading="lazy"
          class="cart-empty__img"
        />
      </picture>
    </div>`;

  cartEl.innerHTML = markup;
}

// Функція створення повного кошика
function createFullCart(arr, page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsOnPage = arr.slice(startIndex, endIndex);
  const descriptionNone = 'There is no summary for this book.';

  const markup = itemsOnPage
    .map(
      ({
        book_image,
        author,
        list_name,
        description,
        title,
        id,
        marketAmazon,
        marketAppleBooks,
        marketBookshop,
      }) =>
        `<li class="shoplist-book-container card js-card" data-book-id="${id}">
  <picture>
    <img
      loading="lazy"
      src="${
        book_image
          ? book_image
          : './images/placeholders/very-small-placeholder.png'
      }"
      alt="${title}"
      class="shoplist-book-img"
    />
  </picture>
  <div class="shoplist-desc-container">
    <h4 class="shoplist-book-title">${title.trim()}</h4>
    <p class="shoplist-book-genre">${list_name.trim()}</p>
    <p class="shoplist-book-description">${
      description === '' ? descriptionNone : description.trim()
    }</p>
    <div class="shoplist-icons">
      <p class="shoplist-book-author">${author.trim()}</p>
      <ul class="shoplist-icons-list">
        <li class="shoplist-icons-li">
          <a href="${marketAmazon}" target="blank">
            <div class="shoplist-icon-amazon"></div>
          </a>
        </li>
        <li class="shoplist-icons-li">
          <a href="${marketAppleBooks}" target="blank">
            <div class="shoplist-icon-apple"></div>
          </a>
        </li>
        <li class="shoplist-icons-li">
          <a href="${marketBookshop}" target="blank">
            <div class="shoplist-icon-bookshop"></div>
          </a>
        </li>
      </ul>
    </div>
    <button class="shoplist-trash"></button>
  </div>
</li>`
    )
    .join('');
  cartListEl.innerHTML = markup;
}

// Функція ініціалізації пагінації
function initPagination(totalItems) {
  const pagination = new Pagination(paginationContainer, {
    totalItems: totalItems,
    itemsPerPage: itemsPerPage,
    visiblePages: visiblePages,
    centerAlign: true,
    page: currentPage,
  });
  // Обробка подій пагінації та оновлення списку
  pagination.on('afterMove', eventData => {
    currentPage = eventData.page;
    const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    createFullCart(storageData, currentPage);
    return currentPage;
  });
}

// Функція видалення картки + виклик функції перемальовки сторінки
function deleteCard(evt) {
  if (evt.target.classList.contains('shoplist-trash')) {
    if (!confirm('Are you sure?')) return;
    const card = evt.target.closest('.js-card');
    const bookId = card.dataset.bookId;
    const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const newStorageData = storageData.filter(object => object.id !== bookId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorageData));
    if (!newStorageData.length) {
      card.remove();
      createEmptyCart();
    }

    const countPages = Math.ceil(newStorageData.length / itemsPerPage);
    if (countPages >= currentPage) {
      card.remove();
      createShoppingList();
    } else {
      page = countPages;
      currentPage = countPages;
      card.remove();
      createShoppingList();
    }
    booksOrdered();
  }
}

// Функція зміни кількості відображення карток на сторінці в залежності від ширини екрану
function changePagOptionsByScreenWidth() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    visiblePages = 1;
    itemsPerPage = 4;
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(function () {
      createShoppingList();
    }, 200);
  } else if (screenWidth >= 768) {
    itemsPerPage = 3;
    visiblePages = 3;
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(function () {
      createShoppingList();
    }, 200);
  }
}

// Функція зміни кількості відображення карток на сторінці в залежності від ширини екрану при першої загрузці сторінки
function firstPageLoaded() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    visiblePages = 1;
    itemsPerPage = 4;
    createShoppingList();
  } else if (screenWidth >= 768) {
    itemsPerPage = 3;
    visiblePages = 3;
    createShoppingList();
  }
}
