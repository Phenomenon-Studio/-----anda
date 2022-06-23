import { memo } from 'react';
import PropTypes from 'prop-types';
import classes from './SettingsInputWrap.module.css';

const SettingsInputWrap = ({ children, title }) => {
    return (
        <div className={classes.wrap}>
            <h6 className={classes.title}>{title}</h6>
            {children}
        </div>
    );
};

SettingsInputWrap.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
    title: PropTypes.string.isRequired,
};

export default memo(SettingsInputWrap);
