import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AreaChart, Area, YAxis, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { CHART_X_AXIS_24H, CHART_X_AXIS_1M, CHART_X_AXIS_1W, CHART_X_AXIS_1Y } from '@constants';
import { isEqual, checkAndToFixedValue } from '@utils';
import classes from './Chart.module.css';

const splitDateAndGetFirstPart = date => date.split(',')[0];
const ticksObj = {
    [CHART_X_AXIS_24H]: date => {
        const spiltDate = date.split(',');

        return spiltDate[spiltDate.length - 1];
    },
    [CHART_X_AXIS_1W]: splitDateAndGetFirstPart,
    [CHART_X_AXIS_1M]: splitDateAndGetFirstPart,
    [CHART_X_AXIS_1Y]: splitDateAndGetFirstPart,
};
const margin = { top: 10, right: 10, bottom: 10, left: 10 };
const cursorStyle = { stroke: 'rgba(196, 196, 196, 0.2)', strokeWidth: 1 };
const contentStyle = {
    display: 'none',
};
const activeDotStyle = { r: 5, fill: '#8f42fc', stroke: '#ffffff', strokeWidth: 3, position: 'relative' };
const xAxisStyle = { fill: '#85878f', fontSize: '12px', fontWeight: 500 };

const Chart = ({ data, tick, currentPayload, setCurrentPayload }) => {
    const changeHandler = e => {
        const activeData = e.activePayload;

        if (!activeData) {
            return;
        }

        const { payload } = activeData[0];

        if (isEqual(payload, currentPayload)) {
            return;
        }

        setCurrentPayload(() => ({
            ...payload,
            value: checkAndToFixedValue(payload.value),
        }));
    };
    const tickFormatter = date => ticksObj[tick](date);
    const minMaxValues = useMemo(() => {
        const values = data.map(item => item.value);

        return [Math.min(...values), Math.max(...values)];
    }, [data]);

    return (
        <div className={classes.wrap}>
            <ResponsiveContainer className={classes.inner}>
                <AreaChart width={640} height={375} data={data} margin={margin} onMouseMove={changeHandler}>
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8d3cb4" stopOpacity={0.5} />
                            <stop offset="100%" stopColor="#8d3cb4" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Tooltip isAnimationActive={false} cursor={cursorStyle} contentStyle={contentStyle} />
                    <YAxis axisLine={false} hide tickLine={false} type="number" domain={minMaxValues} />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        minTickGap={2}
                        tickMargin={10}
                        tick={xAxisStyle}
                        tickFormatter={tickFormatter}
                    />
                    <Area
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="value"
                        stroke="#da8bff"
                        fillOpacity={0.6}
                        fill="url(#color)"
                        activeDot={activeDotStyle}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

Chart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        }).isRequired
    ).isRequired,
    tick: PropTypes.string.isRequired,
    setCurrentPayload: PropTypes.func.isRequired,
    currentPayload: PropTypes.shape({
        date: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    }).isRequired,
};

export default memo(Chart);
