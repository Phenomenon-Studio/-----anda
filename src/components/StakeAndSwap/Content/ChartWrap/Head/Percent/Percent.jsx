import { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './Percent.module.css';

const Percent = ({ changedValue, changedPercentValue }) => {
    const [isPositive, setIsPositive] = useState(changedValue > 0);
    const sign = isPositive ? '+' : '';

    useEffect(() => {
        setIsPositive(changedValue > 0);
    }, [changedValue]);

    return (
        <div className={clsx(classes.percent, isPositive ? 'color-success' : 'color-alert')}>
            {sign}
            {changedValue || 0}$ ({changedPercentValue || 0}%)
        </div>
    );
};

Percent.propTypes = {
    changedValue: PropTypes.number.isRequired,
    changedPercentValue: PropTypes.number.isRequired,
};

export default memo(Percent);
