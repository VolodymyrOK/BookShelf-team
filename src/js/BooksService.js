import axios from 'axios';

axios.defaults.baseURL = 'https://books-backend.p.goit.global/books/';

const END_POINT_CATEGORY_LIST = 'category-list';
const END_POINT_TOP = 'top-books';
const END_POINT_BOOKSBYCATEGORY = 'category';

export default class BooksService {
  constructor() {
    this.page = 1;
    this.perPage = 40;
    this.searchQuery = '';
    this.selectedCategory = '';
    (this.bookId = ''), (this.totalBooks = 0);
  }

  async getCategoryList() {
    const { data } = await axios.get(`${END_POINT_CATEGORY_LIST}`);
    return data;
  }

  async getTopBooks() {
    const { data } = await axios.get(`${END_POINT_TOP}`);
    return data;
  }

  async getBooksByCategory() {
    const { data } = await axios.get(
      `${END_POINT_BOOKSBYCATEGORY}?category=${this.selectedCategory}`
    );

    return data;
  }

  async getBooksById() {
    const { data } = await axios.get(`${this.bookId}`);
    return data;
  }

  resetPage() {
    this.page = 1;
  }

  incrPage() {
    this.page += 1;
  }

  resetTotalBooks() {
    this.totalBooks = 0;
  }

  incrTotalBooks() {
    this.totalBooks += this.perPage;
  }
}
