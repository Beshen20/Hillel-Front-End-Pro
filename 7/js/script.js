function sequentialAdd() {
    function sumTo(n) {
        if (n === 1) {
            return 1;
        }
        return n + sumTo(n - 1);
    }
    let isParamOk = false;
    let isTryInput = true;
    let userParam;
    do {
        userParam = +prompt('Введите число для суммирования');
        if (!Number.isNaN(userParam) && userParam >= 1) {
            isParamOk = true;
        } else {
            isTryInput = confirm('Введите пожалуйста число,число не меньше 1.Попробуете снова?');
        }
    } while (isTryInput && !isParamOk);
    alert(sumTo(userParam));
}
sequentialAdd();