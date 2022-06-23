import { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './Chip.module.css';

const Chip = ({ icons, title, additionalClasses = '' }) => {
    return (
        <div className={clsx(classes.wrap, additionalClasses)}>
            {icons.map(icon => (
                <svg key={icon}>
                    <use xlinkHref={icon} />
                </svg>
            ))}
            <h5 className={classes.title}>{title}</h5>
        </div>
    );
};

Chip.propTypes = {
    icons: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    additionalClasses: PropTypes.string,
    title: PropTypes.string.isRequired,
};

export default memo(Chip);
