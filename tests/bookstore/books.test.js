const BooksController = require('../../controllers/BooksController');
const UserController = require('../../controllers/UserController');
const { books } = require('../../test-data/books');
const { users } = require('../../test-data/users');

let token;

beforeAll(async () => {
  const responseAuth = await UserController.login(users.user1.username, users.user1.password);

  const userData = responseAuth.data;
  token = userData.token;
  console.log('Auth performed');
});

describe('Get books', () => {
  test('Get all books and verify number', async () => {
    const response = await BooksController.getAllBooks();
    const books = response.data.books;
    expect(response.status).toBe(200);
    expect(books).toHaveLength(8);
  });
});

describe('Add books', () => {
  afterAll(async () => {
    const response = await BooksController.removeAllBooks(users.user1.userId, token);
    expect(response.status).toBe(204);
  });

  test('Add "Git Pocket Guide book" book to a user', async () => {
    const response = await BooksController.addBook(users.user1.userId, books[0].isbn, token);
    const responseJson = response.data;
    expect(responseJson.books[0].isbn).toBe(books[0].isbn);
    expect(response.status).toBe(201);
  });

  test('Add "Learning JavaScript Design Patterns" book to a user', async () => {
    const response = await BooksController.addBook(users.user1.userId, books[1].isbn, token);
    const responseJson = response.data;
    expect(responseJson.books[0].isbn).toBe(books[1].isbn);
    expect(response.status).toBe(201);
  });

  test('Add "Designing Evolvable Web APIs with ASP.NET" book to a user', async () => {
    const response = await BooksController.addBook(users.user1.userId, books[2].isbn, token);
    const responseJson = response.data;
    expect(responseJson.books[0].isbn).toBe(books[2].isbn);
    expect(response.status).toBe(201);
  });

  test('Add "Speaking JavaScript" book to a user', async () => {
    const response = await BooksController.addBook(users.user1.userId, books[3].isbn, token);
    const responseJson = response.data;
    expect(responseJson.books[0].isbn).toBe(books[3].isbn);
    expect(response.status).toBe(201);
  });
});

describe('Update books', () => {
  beforeAll(async () => {
    await BooksController.addBook(users.user1.userId, books[0].isbn, token);
    await BooksController.addBook(users.user1.userId, books[1].isbn, token);
    await BooksController.addBook(users.user1.userId, books[2].isbn, token);
  });

  afterAll(async () => {
    const response = await BooksController.removeAllBooks(users.user1.userId, token);
    expect(response.status).toBe(204);
  });

  test('Update "Git Pocket Guide book" to "You Dont Know JS"', async () => {
    const response = await BooksController.updateBook(
      users.user1.userId,
      books[0].isbn,
      books[4].isbn,
      token,
    );
    const responseJson = response.data;
    expect(response.status).toBe(200);
    const updatedBook = responseJson.books.find((book) => book.isbn === books[4].isbn);
    expect(updatedBook).toBeDefined();
  });

  test('Update "Learning JavaScript Design Patterns" to "Understanding ECMAScript 6"', async () => {
    const response = await BooksController.updateBook(
      users.user1.userId,
      books[1].isbn,
      books[7].isbn,
      token,
    );
    const responseJson = response.data;
    expect(response.status).toBe(200);
    const updatedBook = responseJson.books.find((book) => book.isbn === books[7].isbn);
    expect(updatedBook).toBeDefined();
  });

  test('Update "Designing Evolvable Web APIs with ASP.NET" to "Eloquent JavaScript, Second Edition"', async () => {
    const response = await BooksController.updateBook(
      users.user1.userId,
      books[2].isbn,
      books[6].isbn,
      token,
    );
    const responseJson = response.data;
    expect(response.status).toBe(200);
    const updatedBook = responseJson.books.find((book) => book.isbn === books[6].isbn);
    expect(updatedBook).toBeDefined();
  });
});

describe('Remove books', () => {
  beforeAll(async () => {
    await BooksController.addBook(users.user1.userId, books[0].isbn, token);
    await BooksController.addBook(users.user1.userId, books[5].isbn, token);
    await BooksController.addBook(users.user1.userId, books[7].isbn, token);
  });

  test('Remove "Git Pocket Guide book"', async () => {
    const response = await BooksController.removeBook(users.user1.userId, books[0].isbn, token);
    expect(response.status).toBe(204);
  });

  test('Remove "Programming JavaScript Applications"', async () => {
    const response = await BooksController.removeBook(users.user1.userId, books[5].isbn, token);
    expect(response.status).toBe(204);
  });

  test('Remove "Understanding ECMAScript 6"', async () => {
    const response = await BooksController.removeBook(users.user1.userId, books[7].isbn, token);
    expect(response.status).toBe(204);
  });
});
