import { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './BlockInfo.module.css';

const BlockInfo = ({ label, value, subValue, additionalClasses = '' }) => {
    return (
        <div className={clsx(classes.wrap, additionalClasses)}>
            <div className={classes.label}>{label}:</div>
            <div className={classes.value}>{value}</div>
            {subValue && <div className={classes.subValue}>~ {subValue} usd</div>}
        </div>
    );
};

BlockInfo.propTypes = {
    additionalClasses: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    subValue: PropTypes.string,
};

export default memo(BlockInfo);
