function count() {
    let menu;
     do { 
         menu = prompt('To enter one of these operations: additions(+), subtraction(-), multiplication(*), division(/).');
     } while (["+", "-", "*", "/"].indexOf(menu) === -1);
     function getArgument(arg) {
        let result;
        do {
          result = +prompt(arg);
        } while(Number.isNaN(result));
        return result;
      }
    const num1 = getArgument("To enter the first number:");
    const num2 = getArgument("To enter the second number:");
         switch (menu) {
             case "*":
                 return `${num1} * ${num2} = ${num1 * num2}`;
             case "+":
                 return `${num1} + ${num2} = ${num1 + num2}`;
             case "-":
                 return `${num1} - ${num2} = ${num1 - num2}`;
             case "/":
                 if (num2 !== 0) {
                     return `${num1} / ${num2} = ${num1 / num2}`;
                 } else {
                     return "You can't divide by zero";
                 }
         }
     }
     alert(count());