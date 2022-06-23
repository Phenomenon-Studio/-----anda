import { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './MessageContent.module.css';

const MessageContent = ({ title, description, isError = false, additionalClasses = '' }) => {
    return (
        <div className={clsx(classes.wrap, additionalClasses)}>
            <svg className={classes.icon}>
                <use xlinkHref={isError ? '#icon-info-alert' : '#icon-info-success'} />
            </svg>
            <div>
                <h5 className={classes.title}>{title}</h5>
                <p className={classes.description}>{description}</p>
            </div>
        </div>
    );
};

MessageContent.propTypes = {
    isError: PropTypes.bool,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    additionalClasses: PropTypes.string,
};

export default memo(MessageContent);
