import { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './InfoMessage.module.css';

const InfoMessage = ({ text, additionalClasses = '', ...rest }) => {
    return (
        <div className={clsx(classes.wrap, additionalClasses)} {...rest}>
            <svg>
                <use xlinkHref="#icon-info" />
            </svg>
            <span>{text}</span>
        </div>
    );
};

InfoMessage.propTypes = {
    additionalClasses: PropTypes.string,
    text: PropTypes.string.isRequired,
};

export default memo(InfoMessage);
