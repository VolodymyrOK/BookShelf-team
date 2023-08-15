import { booksOrdered } from './header';
import { makeShoplistMarkup } from './shoppinglistmarkup';
import Pagination from 'tui-pagination';

const BOOKS_IN_STORAGE = 'storage-data';
const shoppingListContainer = document.querySelector(
  '.shopping-list-empty-page'
);

const shoppingListFromLocalstorage = localStorage.getItem(BOOKS_IN_STORAGE);

if (shoppingListFromLocalstorage) {
  let shoppingList = JSON.parse(shoppingListFromLocalstorage);
  const shoplistBooks = shoppingList.map(makeShoplistMarkup);

  // Create new container and replace markup
  const newShoppingListContainer = document.createElement('ul');
  newShoppingListContainer.classList.add('shopping-list-container');

  shoplistBooks.forEach(book => {
    newShoppingListContainer.appendChild(book);
  });

  shoppingListContainer.replaceWith(newShoppingListContainer);

  // Add trash to each element
  const shoplistTrash = document.querySelectorAll('.shoplist-trash');

  shoplistTrash.forEach(trash => {
    trash.addEventListener('click', removesBookFromShoppingList);
  });

  // Fix updating on the page
  if (shoppingList.length === 0)
    newShoppingListContainer.replaceWith(shoppingListContainer);

  // Update Local Storage
  function removesBookFromShoppingList(event) {
    const id = event.target.closest('.shoplist-book-container').dataset.id;
    console.log();
    shoppingList = shoppingList.filter(book => book.id !== id);
    localStorage.setItem(BOOKS_IN_STORAGE, JSON.stringify(shoppingList));
    newShoppingListContainer.removeChild(
      event.target.closest('.shoplist-book-container')
    );
    booksOrdered();
    if (shoppingList.length === 0)
      newShoppingListContainer.replaceWith(shoppingListContainer);
  }
}
