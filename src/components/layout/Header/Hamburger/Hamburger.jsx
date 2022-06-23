import { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './Hamburger.module.css';

const Hamburger = ({ toggle, opened = false, hasClose = false, additionalClasses = '' }) => {
    return (
        <button className={clsx(classes.wrap, additionalClasses, opened && classes.active)} onClick={toggle}>
            {hasClose && (
                <svg>
                    <use xlinkHref="#icon-close" />
                </svg>
            )}
            <span />
        </button>
    );
};

Hamburger.propTypes = {
    toggle: PropTypes.func.isRequired,
    additionalClasses: PropTypes.string,
    opened: PropTypes.bool,
    hasClose: PropTypes.bool,
};

export default memo(Hamburger);
