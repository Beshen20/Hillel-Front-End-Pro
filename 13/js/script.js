class Products {
  constructor() {
    this.cheese = [10, 20];
    this.salad = [20, 5];
    this.potato = [15, 10];
    this.seasoning = [15, 0];
    this.mayonnaise = [20, 5];
  }

  switchSize(size) {
    const [small, average, large] = [
      [50, 20],
      [75, 30],
      [100, 40]
    ];
    const sizes = {
      small,
      average,
      large
    };
    const [price, calories] = sizes[size];
    return {
      price,
      calories
    };
  }

  getProduct(name) {
    const [price, calories] = this[name];
    return {
      price,
      calories
    };
  }
}

class Hamburger {
  constructor() {
    this.price = 0;
    this.colories = 0;
    this.products = new Products();
  }

  result(price, calories) {
    document.getElementById('price').innerHTML = price;
    document.getElementById('calories').innerHTML = calories;
  }

  calc(size) {
    const {
      price,
      calories
    } = this.products.switchSize(size);
    this.price += price;
    this.calories += calories;

    let checkedBoxes = document.querySelectorAll('input[name=add]:checked');
    for (let i = 0; i < checkedBoxes.length; i++) {
      let add = checkedBoxes[i].id;
      const {
        price,
        calories
      } = this.products.getProduct(add);

      this.price += price;
      this.calories += calories;
    }

    this.result(this.price, this.calories);
  }

  resetData() {
    this.price = 0;
    this.calories = 0;
    this.result(this.price, this.calories);
  }
}

document.getElementById('form').addEventListener('submit', function (e) {
  const hamburger = new Hamburger(Products);
  hamburger.resetData();
  hamburger.calc(document.querySelector('input[name="size"]:checked').value);
  e.preventDefault();
});