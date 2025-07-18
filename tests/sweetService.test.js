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

describe('SweetService - Delete Sweet', () => {
  let service;

  beforeEach(() => {
    service = new SweetService();
    service.addSweet(new Sweet(1, 'Ladoo', 'Indian', 100, 5));
    service.addSweet(new Sweet(2, 'Barfi', 'Indian', 150, 3));
  });

  test('should delete the sweet with the given ID', () => {
    const deleted = service.deleteSweet(1);

    expect(deleted.name).toBe('Ladoo');
    expect(service.getAllSweets().length).toBe(1);
    expect(service.getAllSweets()[0].name).toBe('Barfi');
  });

  test('should return null if sweet with given ID is not found', () => {
    const result = service.deleteSweet(99);
    expect(result).toBeNull();
  });
});

describe('SweetService - Search Sweets', () => {
  let service;

  beforeEach(() => {
    service = new SweetService();
    service.addSweet(new Sweet(1, 'Kaju Katli', 'Indian', 200, 4));
    service.addSweet(new Sweet(2, 'Gulab Jamun', 'Indian', 120, 10));
    service.addSweet(new Sweet(3, 'Rasgulla', 'Bengali', 110, 8));
  });

  test('should return sweets matching the search query', () => {
    const results = service.searchSweets('gulab');

    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Gulab Jamun');
  });

  test('should return multiple sweets if matched', () => {
    const results = service.searchSweets('a');
    expect(results.length).toBeGreaterThan(1);
  });

  test('should return empty array if no match found', () => {
    const results = service.searchSweets('Chocolate');
    expect(results.length).toBe(0);
  });
});

describe('SweetService - Purchase Sweet', () => {
  let service;

  beforeEach(() => {
    service = new SweetService();
    service.addSweet(new Sweet(1, 'Ladoo', 'Mithai', 100, 10));
  });

  test('should decrease quantity after purchase', () => {
    service.purchaseSweet(1, 3);
    const sweets = service.getAllSweets();
    expect(sweets[0].quantity).toBe(7);
  });

  test('should throw error for insufficient stock', () => {
    expect(() => {
      service.purchaseSweet(1, 20);
    }).toThrow('Insufficient stock');
  });

  test('should throw error if sweet ID not found', () => {
    expect(() => {
      service.purchaseSweet(99, 1);
    }).toThrow('Sweet not found');
  });
});

describe('SweetService - Restock Sweet', () => {
  let service;

  beforeEach(() => {
    service = new SweetService();
    service.addSweet(new Sweet(1, 'Jalebi', 'Mithai', 80, 5));
  });

  test('should increase quantity after restocking', () => {
    service.restockSweet(1, 10);
    const sweets = service.getAllSweets();
    expect(sweets[0].quantity).toBe(15);
  });

  test('should throw error if sweet not found', () => {
    expect(() => {
      service.restockSweet(99, 5);
    }).toThrow('Sweet not found');
  });
});

