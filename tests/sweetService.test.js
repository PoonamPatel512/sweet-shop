const SweetService = require('../src/services/SweetService');

describe('SweetService - Add Sweet', () => {
  let service;

  beforeEach(() => {
    service = new SweetService();
  });

  test('should add a sweet to the list', () => {
    const sweet = {
      id: 1,
      name: 'Ladoo',
      category: 'Pastry',
      price: 20,
      quantity: 50
    };

    service.addSweet(sweet);
    const sweets = service.getAllSweets();

    expect(sweets.length).toBe(1);
    expect(sweets[0]).toEqual(sweet);
  });
});
