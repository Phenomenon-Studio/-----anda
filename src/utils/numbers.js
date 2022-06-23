export const setAmount = amount => (Number(amount) ? Number(parseFloat(amount).toFixed(8)) : 0);

export const fpArithmetic = (op, x, y) => {
    let n = {
        '*': x * y,
        '-': x - y,
        '+': x + y,
        '/': x / y,
    }[op];

    return Math.round(n * 1000000000000000000000000000000000000) / 1000000000000000000000000000000000000;
};

export const getZerosCount = value => -Math.floor(Math.log10(Number(value)) + 1);

export const checkAndToFixedValue = price => {
    const zerosCount = getZerosCount(price);
    let fixedPrice = price.toFixed(2);

    if (zerosCount === 1) {
        fixedPrice = price.toFixed(3);
    } else if (zerosCount === 2) {
        fixedPrice = price.toFixed(4);
    } else if (zerosCount === 3) {
        fixedPrice = price.toFixed(5);
    } else if (zerosCount === 4) {
        fixedPrice = price.toFixed(6);
    } else if (zerosCount === 5) {
        fixedPrice = price.toFixed(7);
    } else if (zerosCount === 6) {
        fixedPrice = price.toFixed(8);
    }

    return fixedPrice;
};
