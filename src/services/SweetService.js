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
}

module.exports = SweetService;
