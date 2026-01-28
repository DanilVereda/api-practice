const { default: axios } = require('axios');

describe('Tests for posts API', () => {
  test('Create new photo for album with id - 3', async () => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/photos', {
      albumId: 3,
      id: 5001,
      title: 'Carpathian mountains photo',
      url: 'https://via.placeholder.com/641/92cch14952',
      thumbnailUrl: 'https://via.placeholder.com/154/92gfw41c952',
    });
    const photo = response.data;
    // console.log(photo);
    const status = response.status;
    expect(status).toBe(201);
    expect(photo.id).toEqual(5001);
    expect(photo.albumId).toEqual(3);
    expect(photo.title).toBe('Carpathian mountains photo');
    expect(photo.url).toContain('https');
    expect(photo.thumbnailUrl).toContain('https');
  });
});
