const calc = new Calculator(10);

function Calculator(startingValue) {
  this.base = startingValue;
  this.sum = function (b) {
    return this.base += b;
  };
  this.mult = function (b) {
    return this.base *= b;
  };
  this.sub = function (b) {
    return this.base -= b;
  };
  this.div = function (b) {
    return this.base /= b;
  };
  this.set = function (b) {
    return this.base = b;
  };

  this.get = function () {
    return this.base;
  };
}
console.log(calc.sum(5)); // 15
console.log(calc.mult(10)); //150
console.log(calc.sub(40)); // 110
console.log(calc.div(10)); // 11
console.log(calc.set(50)); // 50
console.log(calc.sum(5)); // 55
console.log(calc.get()); // 55
console.log(calc.sum(5)); // 60
console.log(calc.base); // 60