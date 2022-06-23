export const rAF = cb => {
    let globalID;
    let ticking = false;

    return (...args) => {
        if (!ticking) {
            cancelAnimationFrame(globalID);

            globalID = null;
            globalID = requestAnimationFrame(() => {
                ticking = false;

                return cb(...args);
            });
            ticking = true;
        }
    };
};
