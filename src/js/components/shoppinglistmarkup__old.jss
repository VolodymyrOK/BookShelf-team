// Markup shopping list
function makeShoplistMarkup(shoppingList) {
  const {
    book_image,
    author,
    list_name,
    description,
    title,
    id,
    marketAmazon,
    marketAppleBooks,
    marketBookshop,
  } = shoppingList;

  const shoplistBookContainer = document.createElement('li');
  shoplistBookContainer.classList.add('shoplist-book-container');
  shoplistBookContainer.dataset.id = id;

  const shoplistMarkup = `<img src="${book_image}" class="shoplist-book-img">
        <div class="shoplist-desc-container">
          <h4 class="shoplist-book-title">${title}</h4>
          <p class="shoplist-book-genre">${list_name}</p>
          <p class="shoplist-book-description">${description}</p>
           <p class="shoplist-book-author">${author}</p>
        </div>
        <div class="shoplist-icons">
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
        <div class="shoplist-trash"></div>
`;

  shoplistBookContainer.innerHTML = shoplistMarkup;

  return shoplistBookContainer;
}

export { makeShoplistMarkup };
