import { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './CircleProgressBar.module.css';

const CircleProgressBar = ({ progress, color, variant = 'primary', additionalClasses = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-2 -2 34 34"
            className={clsx(classes.progressBar, classes[variant], additionalClasses)}
            style={{ '--progress-color': color, '--progress': 100 - progress }}
        >
            {variant === 'primary' && <circle cx="15" cy="15" r="15" className={classes.progressBarBg} />}
            <circle cx="15" cy="15" r="15" className={classes.progressBarLineBg} />
        </svg>
    );
};

CircleProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    additionalClasses: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary']),
};

export default memo(CircleProgressBar);
