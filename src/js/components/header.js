import refs from '../refs';
const { burgerBtn, iconClose, iconBurger, mobileMenu } = refs;
///////////////////////////Перемикач кнопки бургер//////////////////////////////
let isOpen = true;
booksOrdered();
burgerBtn.addEventListener('click', handlerChangeBtnMenu);
function handlerChangeBtnMenu() {
  const refs = {
    blockAuth: document.querySelector('.block-auth'),
  };
  if (isOpen) {
    iconClose.classList.remove('is-hidden');
    iconBurger.classList.add('is-hidden');
    mobileMenu.classList.remove('is-hidden');
    setTimeout(() => {
      refs.blockAuth.style.display = 'block';
    }, 250);
    document.body.classList.add('pos-fixed');
    isOpen = false;
  } else {
    iconClose.classList.add('is-hidden');
    iconBurger.classList.remove('is-hidden');
    mobileMenu.classList.add('is-hidden');
    refs.blockAuth.removeAttribute('style');
    document.body.classList.remove('pos-fixed');
    isOpen = true;
  }
}

function booksOrdered() {
  const storageArr = JSON.parse(localStorage.getItem('storage-data'));
  let booksInList = 0;
  if (storageArr) booksInList = storageArr.length;
  const qtyOrderedBooks = document.querySelectorAll('.purchased-books');
  qtyOrderedBooks.forEach(content => (content.textContent = booksInList));
}

export { booksOrdered };
