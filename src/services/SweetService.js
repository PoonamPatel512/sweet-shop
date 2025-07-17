class SweetService {
  constructor() {
    this.sweets = [];
  }

  addSweet(sweet) {
    this.sweets.push(sweet);
  }

  getAllSweets() {
    return this.sweets;
  }

  // Edit an existing sweet by ID
  editSweet(id, updatedSweet) {
    const index = this.sweets.findIndex((sweet) => sweet.id === id);
    if (index !== -1) {
      this.sweets[index] = updatedSweet;
      return updatedSweet;
    }
    return null;
  }

  // Delete a sweet by ID
  deleteSweet(id) {
    const index = this.sweets.findIndex((sweet) => sweet.id === id);
    if (index !== -1) {
      const deleted = this.sweets.splice(index, 1)[0]; // remove and return deleted sweet
      return deleted;
    }
    return null;
  }

  // Search sweets by name (case-insensitive)
  searchSweets(name) {
    return this.sweets.filter((sweet) =>
      sweet.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  // Purchase sweet by ID and quantity
  purchaseSweet(id, quantity) {
    const sweet = this.sweets.find((s) => s.id === id);
    if (!sweet) {
      throw new Error("Sweet not found");
    }
    if (sweet.quantity < quantity) {
      throw new Error("Insufficient stock");
    }
    sweet.quantity -= quantity;
  }
}

module.exports = SweetService;
