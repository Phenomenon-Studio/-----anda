export const asyncEach = (array, cb, interval = 10) => {
    let time = Date.now();
    let i = 0;
    const last = array.length - 1;
    const next = () => {
        while (i <= last) {
            const now = Date.now();
            const diff = now - time;

            if (diff > interval) {
                time = now;

                setTimeout(next, 0);

                break;
            }

            cb(array[i], i++, array);
        }
    };

    next();
};
