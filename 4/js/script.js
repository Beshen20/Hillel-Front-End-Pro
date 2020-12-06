function calculator() {
    const operands = [];
  
    function getMenu(argMenu) {
      let result;
      do {
        result = prompt(argMenu);
      } while (["+", "-", "*", "/"].indexOf(result) === -1);
      return result;
    }
  
    function getArgument(arg) {
      let result;
      do {
        result = +prompt(arg);
      } while (Number.isNaN(result));
      return result;
    }
  
    function getOperandCount() {
      let count;
      do {
        count = +prompt("How many operands do you specify?");
      } while (count < 2 || count > 4 || Number.isNaN(count));
      return count;
    }
  
    function calcResult(fun) {
      return operands.reduce((acc, operand) => fun(acc, operand));
    }
  
    const menu = getMenu(
      "To enter one of these operations: additions(+), subtraction(-), multiplication(*), division(/)."
    );
  
    const countOfOperands = getOperandCount();
  
    for (let i = 0; i < countOfOperands; i++) {
      let operand = getArgument(`Argument ${i + 1}`);
      operands.push(operand);
    }
  
    function getResult() {
      switch (menu) {
        case "*":
          return `${operands.join(" * ")} = ${calcResult((a, b) => a * b)}`;
        case "+":
          return `${operands.join(" + ")} = ${calcResult((a, b) => a + b)}`;
        case "-":
          return `${operands.join(" - ")} = ${calcResult((a, b) => a - b)}`;
        case "+":
          return `${operands.join(" / ")} = ${calcResult((a, b) => {
            if (b === 0) {
              alert("You cant divide by zero");
              return 0;
            } else {
              return a / b;
            }
          })}`;
      }
    }
    alert(getResult());
  }
  calculator();