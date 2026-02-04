const BaseController = require('./BaseController');

class BooksController extends BaseController {
  async getAllBooks() {
    return await this.axiosInstance.get('/BookStore/v1/Books');
  }

  async addBook(userId, isbn, token) {
    return await this.axiosInstance.post(
      '/BookStore/v1/Books',
      {
        userId,
        collectionOfIsbns: [
          {
            isbn,
          },
        ],
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
  }

  async updateBook(userId, isbnCurrent, isbnNew, token) {
    return await this.axiosInstance.put(
      `/BookStore/v1/Books/${isbnCurrent}`,
      {
        userId,
        isbn: isbnNew,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
  }

  async removeBook(userId, isbn, token) {
    return await this.axiosInstance.delete('/BookStore/v1/Book', {
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        userId,
        isbn,
      },
    });
  }

  async removeAllBooks(userId, token) {
    return await this.axiosInstance.delete(`/BookStore/v1/Books?UserId=${userId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}

module.exports = new BooksController();
