import { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SettingsInput from '../SettingsInput/SettingsInput';
import classes from './ManualTime.module.css';

const ManualTime = ({ manualTime, setManualTime, activeTime, setActiveTime, defaultData }) => {
    const changeHandler = e => {
        const value = e.target.value;

        setManualTime(prevState => ({
            ...prevState,
            value,
        }));

        if (value) {
            setActiveTime(() => ({
                ...manualTime,
                value,
            }));
        } else if (!value && activeTime.title === 'Manual time') {
            setActiveTime(defaultData);
        }
    };

    return (
        <div className={classes.wrap}>
            <SettingsInput
                value={manualTime.value}
                onChange={changeHandler}
                decimalScale={0}
                additionalClasses={classes.input}
                inputMode="numeric"
            />
            <div className={clsx(classes.label, 't-right')}>{manualTime.label}</div>
        </div>
    );
};

ManualTime.propTypes = {
    manualTime: PropTypes.shape({
        value: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        time: PropTypes.string,
    }).isRequired,
    setManualTime: PropTypes.func.isRequired,
    activeTime: PropTypes.shape({
        value: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        time: PropTypes.string,
    }).isRequired,
    setActiveTime: PropTypes.func.isRequired,
    defaultData: PropTypes.shape({
        value: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
    }).isRequired,
};

export default memo(ManualTime);
