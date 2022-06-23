import { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './Loader.module.css';

const Loader = ({ variant = 'center', additionalClasses = '' }) => {
    return (
        <div className={clsx(classes.wrap, additionalClasses, classes[variant])}>
            <div className={classes.inner}>
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    );
};

Loader.propTypes = {
    variant: PropTypes.oneOf(['center', 'right']),
    additionalClasses: PropTypes.string,
};

export default memo(Loader);
