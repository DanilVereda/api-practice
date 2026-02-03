const { default: axios } = require('axios');

describe('Tests for comments API', () => {
  test('Get all comments and verify length', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
    const comments = response.data;
    const status = response.status;
    expect(status).toBe(200);
    expect(comments.length).toBe(500);
  });

  test('Get sixth comments and verify fields', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments/6');
    const comment = response.data;
    const status = response.status;
    expect(status).toBe(200);
    expect(comment.id).toEqual(6);
    expect(comment.name).toBe('et fugit eligendi deleniti quidem qui sint nihil autem');
    expect(comment.email).toBe('Presley.Mueller@myrl.com');
    expect(comment.body).toContain('consectetur qui praesentium');
  });

  test('Create new comment for post with id 2', async () => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/comments', {
      postId: 2,
      id: 501,
      name: 'Test comment',
      email: 'test@gmail.com',
      body: 'Test body for test comment',
    });
    const comment = response.data;
    // console.log(comment);
    const status = response.status;
    expect(status).toBe(201);
    expect(comment.id).toEqual(501);
    expect(comment.name).toBe('Test comment');
    expect(comment.email).toBe('test@gmail.com');
    expect(comment.body).toContain('Test body for test comment');
  });
});
