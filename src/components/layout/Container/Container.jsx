import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './Container.module.css';

const Container = props => {
    const { children, size } = props;

    return <div className={clsx(classes.container, classes[size])}>{children}</div>;
};

Container.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
    size: PropTypes.oneOf(['mini', 'full']),
};

export default Container;
