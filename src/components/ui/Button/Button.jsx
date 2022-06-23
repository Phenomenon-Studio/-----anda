import { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './Button.module.css';

const Button = forwardRef((props, ref) => {
    const {
        children,
        tagName = 'a',
        width,
        size = 'medium',
        color,
        variant = 'contained',
        additionalClasses,
        ...rest
    } = props;
    const withRef = tagName === 'a' ? { ref } : null;
    const Tag = tagName;

    const classNames = clsx(
        classes.btn,
        classes[width],
        classes[size],
        classes[color],
        classes[variant],
        additionalClasses
    );

    return (
        <Tag className={classNames} {...withRef} {...rest}>
            {children}
        </Tag>
    );
});

Button.displayName = 'Button';

Button.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
    tagName: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'secondary']),
    size: PropTypes.oneOf(['medium', 'mini']),
    variant: PropTypes.oneOf(['bordered-gradient', 'bordered', 'connected']),
    width: PropTypes.oneOf(['full']),
    additionalClasses: PropTypes.string,
};

export default memo(Button);
