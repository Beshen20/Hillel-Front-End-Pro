const SUM = 'sum';
const MULT = 'mult';
const DIV = 'div';
const SUB = 'sub';
const SET = 'set';
const calc = createCalculator(10);

function isOperandNaN(operand) {
    return isNaN(operand);
}

function createCalculator(operandA) {
    let store = operandA;

    function getOperation(operation, operandB) {
        if (isOperandNaN(operandB)) {
            return null;
        }

        const operationHandler = {
            [SUM](b) {
                store += b;
                return store;
            },
            [MULT](b) {
                store *= b;
                return store;
            },
            [SUB](b) {
                store -= b;
                return store;
            },
            [DIV](b) {
                store /= b;
                return store;
            },
            [SET](b) {
                store = b;
                return b;
            }
        };

        return operationHandler[operation](operandB);
    }

    return {
        [SUM](operand) {
            return getOperation(SUM, operand);
        },
        [MULT](operand) {
            return getOperation(MULT, operand);
        },
        [SUB](operand) {
            return getOperation(SUB, operand);
        },
        [DIV](operand) {
            return getOperation(DIV, operand);
        },
        [SET](operand) {
            return getOperation(SET, operand);
        },
    };
}
console.log(calc.sum(5)); // 15
console.log(calc.mult(10)); //150
console.log(calc.sub(40)); // 110
console.log(calc.div(10)); // 11
console.log(calc.set(50)); // 50
console.log(calc.sum(5)); // 55
console.log(calc.sum('Hello')); //null
console.log(calc.sum(5)); // 60