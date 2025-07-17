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

describe('SweetService - Get All Sweets', () => {
  let service;

  beforeEach(() => {
    service = new SweetService();
    service.addSweet(new Sweet('Ladoo', 100));
    service.addSweet(new Sweet('Barfi', 150));
  });

  test('should return all sweets', () => {
    const sweets = service.getAllSweets();

    expect(sweets.length).toBe(2);
    expect(sweets[0].name).toBe('Ladoo');
    expect(sweets[1].price).toBe(150);
  });
});
