const SweetService = require('../src/services/SweetService');
const Sweet = require('../src/models/sweet');

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
    service.addSweet(new Sweet(1, 'Ladoo', 'Festival', 100, 50));
    service.addSweet(new Sweet(2, 'Barfi', 'Milk-Based', 150, 30));
  });

  test('should return all sweets', () => {
    const sweets = service.getAllSweets();

    expect(sweets.length).toBe(2);
    expect(sweets[0].name).toBe('Ladoo');
    expect(sweets[1].price).toBe(150);
    expect(sweets[0].category).toBe('Festival');
    expect(sweets[1].quantity).toBe(30);
  });
});

describe('SweetService - Edit Sweet', () => {
  let service;

  beforeEach(() => {
    service = new SweetService();
    service.addSweet(new Sweet(1, 'Ladoo', 'Desi', 100, 10));
  });

  test('should edit an existing sweet', () => {
    const updatedSweet = new Sweet(1, 'Motichoor Ladoo', 'Desi', 120, 15);
    const result = service.editSweet(1, updatedSweet);

    expect(result.name).toBe('Motichoor Ladoo');
    expect(result.price).toBe(120);
    expect(result.quantity).toBe(15);
  });

  test('should return null if sweet not found', () => {
    const updatedSweet = new Sweet(2, 'Barfi', 'Milk', 80, 5);
    const result = service.editSweet(2, updatedSweet);

    expect(result).toBeNull();
  });
});

