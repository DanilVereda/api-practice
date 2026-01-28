const { default: axios } = require('axios');

describe('Tests for posts API', () => {
  test('Create new post for user with id - 10', async () => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      userId: 10,
      id: 101,
      title: 'Test post',
      body: 'This post about API testing',
    });
    const post = response.data;
    // console.log(post);
    const status = response.status;
    expect(status).toBe(201);
    expect(post.id).toEqual(101);
    expect(post.userId).toEqual(10);
    expect(post.title).toBe('Test post');
    expect(post.body).toContain('This post about API testing');
  });
});
