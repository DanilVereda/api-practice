const { default: axios } = require('axios');

describe('Tests for posts API', () => {
  test('Create new albums for user with id - 5', async () => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/albums', {
      userId: 5,
      id: 101,
      title: 'Album with nature photos',
    });
    const album = response.data;
    // console.log(album);
    const status = response.status;
    expect(status).toBe(201);
    expect(album.id).toEqual(101);
    expect(album.userId).toEqual(5);
    expect(album.title).toBe('Album with nature photos');
  });
});
