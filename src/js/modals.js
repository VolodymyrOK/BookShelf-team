import refs from './refs';

const { closeModalBtn, idModalBackdrop } = refs;

// Обработчик клика по кнопке закрытия модального окна
closeModalBtn.addEventListener('click', closeModalId);

// Функция открытия модального окна по идентификатору
export function openModalId() {
  idModalBackdrop.classList.remove('is-hidden');
  document.body.style.overflowY = 'hidden';
  document.addEventListener('keydown', onCloseModalESC);
}

// Функция закрытия модального окна по идентификатору
function closeModalId() {
  idModalBackdrop.classList.add('is-hidden');
  document.body.style.overflowY = 'auto';
  document.removeEventListener('keydown', onCloseModalESC);
}

const onCloseModalESC = e => {
  if (e.key === 'Escape') {
    closeModalId();
  }
};
