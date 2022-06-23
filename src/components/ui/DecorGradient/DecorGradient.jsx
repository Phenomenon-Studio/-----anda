import { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './DecorGradient.module.css';

const DecorGradient = ({ variant = 'primary', size = 'medium' }) => {
    return <div className={clsx(classes.wrap, 'o-hidden', classes[variant], classes[size])} />;
};

DecorGradient.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary']),
    size: PropTypes.oneOf(['medium', 'mini', 'large']),
};

export default memo(DecorGradient);
