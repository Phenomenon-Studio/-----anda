const getType = obj => {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

export const isEqual = (a, b) => {
    const areArraysEqual = () => {
        if (a.length !== b.length) {
            return false;
        }

        for (let i = 0; i < a.length; i++) {
            if (!isEqual(a[i], b[i])) {
                return false;
            }
        }

        return true;
    };
    const areObjectsEqual = () => {
        if (Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }

        for (const key in a) {
            if (Object.prototype.hasOwnProperty.call(a, key)) {
                if (!isEqual(a[key], b[key])) {
                    return false;
                }
            }
        }

        return true;
    };
    const arePrimitivesEqual = () => a === b;
    const type = getType(a);

    if (type !== getType(b)) {
        return false;
    }

    switch (type) {
        case 'array':
            return areArraysEqual();
        case 'object':
            return areObjectsEqual();
        default:
            return arePrimitivesEqual();
    }
};
