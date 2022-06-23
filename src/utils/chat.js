export const createPairIds = (id, count, step) => {
    const [pairId, pairIdString] = id.split('-');
    const pairIdNumber = Number(pairIdString);
    let prevPairIdNumber;

    return new Array(count).fill().map(() => {
        const newPairIdNumber = prevPairIdNumber ? prevPairIdNumber - step : pairIdNumber - step;
        prevPairIdNumber = newPairIdNumber;

        return `${pairId}-${newPairIdNumber}`;
    });
};

export const calculateValue = (reverse0, reverse1, tickerValue) => {
    return (reverse0 / reverse1) * tickerValue;
};

export const getFallbackChartData = date => [{ date, value: 0 }];
