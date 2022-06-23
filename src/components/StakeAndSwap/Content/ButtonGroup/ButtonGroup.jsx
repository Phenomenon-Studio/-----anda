import { memo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import classes from './ButtonGroup.module.css';

const ButtonGroup = ({
    list,
    active,
    setActive,
    isSetFullData,
    canToggle = false,
    additionalClasses = '',
    disabled = false,
}) => {
    const clickHandler = item => {
        const data = isSetFullData ? item : item.name;

        if (canToggle) {
            setActive(active !== item.name ? data : null);

            return;
        }

        setActive(data);
    };

    return (
        <div className={clsx(classes.list, additionalClasses)}>
            {list.map(item => (
                <button
                    key={item.name}
                    className={clsx(classes.btn, item.name === active && classes.active)}
                    onClick={() => (disabled ? null : clickHandler(item))}
                    disabled={disabled}
                >
                    <span>{item.name}</span>
                </button>
            ))}
        </div>
    );
};

ButtonGroup.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    active: PropTypes.string,
    setActive: PropTypes.func.isRequired,
    isSetFullData: PropTypes.bool,
    additionalClasses: PropTypes.string,
    canToggle: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default memo(ButtonGroup);
