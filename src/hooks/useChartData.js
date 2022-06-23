import { useEffect, useState, useContext, useRef } from 'react';
import * as dayjs from 'dayjs';
import StakeAndSwapContext from '@context/StakeAndSwapContext';
import { CHART_X_AXIS_24H, CHART_X_AXIS_1W, CHART_X_AXIS_1M, CHART_X_AXIS_1Y, UPDATE_TIME_CHART } from '@constants';
import { getDateFromUnix, calculateValue, checkAndToFixedValue, getFallbackChartData } from '@utils';

export const useChartData = (name, setCurrentPayload) => {
    const { priceP } = useContext(StakeAndSwapContext);
    const [state, setState] = useState(() => ({
        loading: true,
        disabled: false,
    }));
    const binanceRef = useRef(null);

    useEffect(() => {
        const getData = async () => {
            setState(prevState => ({ ...prevState, disabled: true }));

            if (!binanceRef.current) {
                const ccxt = await import('ccxt');
                binanceRef.current = new ccxt.binance();
            }

            const tickers = await binanceRef.current.fetchOHLCV('B/USDT', '1d');
            let list = [];

            try {
                if (name === CHART_X_AXIS_24H) {
                    const res = await fetch('/api/chart/hour');
                    const {
                        data: {
                            data: { pairHourDatas },
                        },
                    } = await res.json();

                    if (pairHourDatas?.length) {
                        list = pairHourDatas
                            .reduce((acc, cur, i) => {
                                const idData = i + 1;
                                const tickerValue = tickers[tickers.length - (1 + idData)][2];

                                acc.push({
                                    date: getDateFromUnix(cur.hourStartUnix),
                                    value: calculateValue(Number(cur.reserve0), Number(cur.reserve1), tickerValue),
                                });

                                return acc;
                            }, [])
                            .reverse();
                    } else {
                        list = getFallbackChartData(dayjs().subtract(24, 'hour').format('MMM DD, YYYY, hh:mm A'));
                    }
                } else if (name === CHART_X_AXIS_1W) {
                    const res = await fetch('/api/chart/week');
                    const {
                        data: {
                            data: { pairHourDatas },
                        },
                    } = await res.json();

                    if (pairHourDatas?.length) {
                        list = pairHourDatas
                            .reduce((acc, cur, i) => {
                                const idData = i + 1;
                                const tickerValue = tickers[tickers.length - (1 + idData * 7)][2];

                                acc.push({
                                    date: getDateFromUnix(cur.hourStartUnix),
                                    value: calculateValue(Number(cur.reserve0), Number(cur.reserve1), tickerValue),
                                });

                                return acc;
                            }, [])
                            .reverse();
                    } else {
                        list = getFallbackChartData(dayjs().subtract(1, 'week').format('MMM DD, YYYY, hh:mm A'));
                    }
                } else if (name === CHART_X_AXIS_1M) {
                    const res = await fetch('/api/chart/day');
                    const {
                        data: {
                            data: { pairDayDatas },
                        },
                    } = await res.json();

                    if (pairDayDatas?.length) {
                        list = pairDayDatas
                            .reduce((acc, cur, i) => {
                                const idData = i + 1;
                                const tickerValue = tickers[tickers.length - (1 + idData * 30)][2];

                                acc.push({
                                    date: getDateFromUnix(cur.date),
                                    value: calculateValue(Number(cur.reserve0), Number(cur.reserve1), tickerValue),
                                });
                                return acc;
                            }, [])
                            .reverse();
                    } else {
                        list = getFallbackChartData(dayjs().subtract(1, 'month').format('MMM DD, YYYY, hh:mm A'));
                    }
                } else if (name === CHART_X_AXIS_1Y) {
                    const res = await fetch('/api/chart/year');
                    const {
                        data: {
                            data: { pairDayDatas },
                        },
                    } = await res.json();

                    if (pairDayDatas?.length) {
                        list = pairDayDatas
                            .reduce((acc, cur, i) => {
                                const idData = i + 1;
                                const tickerValue = tickers[tickers.length - (1 + idData * 365)][2];

                                acc.push({
                                    date: getDateFromUnix(cur.date),
                                    value: calculateValue(Number(cur.reserve0), Number(cur.reserve1), tickerValue),
                                });

                                return acc;
                            }, [])
                            .reverse();
                    } else {
                        list = getFallbackChartData(dayjs().subtract(1, 'year').format('MMM DD, YYYY, hh:mm A'));
                    }
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error.message);

                if (name === CHART_X_AXIS_24H) {
                    list = getFallbackChartData(dayjs().subtract(24, 'hour').format('MMM DD, YYYY, hh:mm A'));
                } else if (name === CHART_X_AXIS_1W) {
                    list = getFallbackChartData(dayjs().subtract(1, 'week').format('MMM DD, YYYY, hh:mm A'));
                } else if (name === CHART_X_AXIS_1M) {
                    list = getFallbackChartData(dayjs().subtract(1, 'month').format('MMM DD, YYYY, hh:mm A'));
                } else if (name === CHART_X_AXIS_1Y) {
                    list = getFallbackChartData(dayjs().subtract(1, 'year').format('MMM DD, YYYY, hh:mm A'));
                }
            }

            list.push({
                date: dayjs().format('MMM DD, YYYY, hh:mm A'),
                value: priceP.price * tickers[tickers.length - 1][2],
            });

            let lastPrice = 0;
            const cycle = (id = 0) => {
                if (id < list.length) {
                    let change = list[id].value - lastPrice;
                    let changePercent = 0;
                    if (list[id].value == change) {
                        change = 0;
                        changePercent = 0;
                        if (list[id].value != 0) {
                            change = list[id].value;
                            changePercent = 100;
                        }
                    } else {
                        changePercent = (100 * (list[id].value - lastPrice)) / lastPrice;
                    }
                    list[id].change = change.toFixed(8);
                    list[id].changePercent = changePercent.toFixed(2);
                    lastPrice = list[id].value;
                    id++;
                    cycle(id);
                } else {
                    return true;
                }
            };

            cycle();

            return list;
        };

        const updateState = async (canChangeLoading = false) => {
            try {
                if (canChangeLoading) {
                    setState(prevState => ({ ...prevState, loading: true }));
                }

                const data = await getData();
                const lastDataItem = data[data.length - 1];

                setCurrentPayload({
                    ...lastDataItem,
                    value: checkAndToFixedValue(lastDataItem.value),
                });
                setState(() => ({
                    disabled: false,
                    loading: false,
                    data,
                    lastDataItem: { ...lastDataItem, value: checkAndToFixedValue(lastDataItem.value) },
                }));
            } catch (error) {
                setState(() => ({
                    disabled: false,
                    loading: false,
                    error: error.message,
                }));
            }
        };

        updateState(true);

        const intervalId = setInterval(() => {
            updateState();
        }, UPDATE_TIME_CHART);

        return () => {
            clearInterval(intervalId);
        };
    }, [name, priceP?.price, setCurrentPayload]);

    return state;
};
