import { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './DefaultTime.module.css';

const DefaultTime = ({ list, activeTime, setActiveTime, manualTime, setManualTime }) => {
    const setActiveTimeHandler = item => {
        setActiveTime(item);

        if (manualTime.value) {
            setManualTime(prevState => ({
                ...prevState,
                value: '',
            }));
        }
    };

    return (
        <div className={classes.wrap}>
            {list.map(item => (
                <button
                    key={item.title}
                    className={clsx(classes.btn, item.title === activeTime.title && classes.active)}
                    onClick={() => setActiveTimeHandler(item)}
                >
                    <span className={classes.box}>
                        <span className={classes.decor} />
                        <span className={classes.titleWrap}>
                            <span className={classes.title}>{item.title}</span>
                            <span className={classes.time}>{item.time}</span>
                        </span>
                    </span>
                    <span className={clsx(classes.label, 't-right')}>{item.label}</span>
                </button>
            ))}
        </div>
    );
};

DefaultTime.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    activeTime: PropTypes.shape({
        value: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    }).isRequired,
    manualTime: PropTypes.shape({
        value: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    }).isRequired,
    setManualTime: PropTypes.func.isRequired,
    setActiveTime: PropTypes.func.isRequired,
};

export default memo(DefaultTime);
