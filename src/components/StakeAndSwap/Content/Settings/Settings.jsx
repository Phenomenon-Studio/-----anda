import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, useCycle } from 'framer-motion';
import SettingsModal from './SettingsModal';
import classes from './Settings.module.css';

const defaultTimeList = [
    {
        value: '10',
        title: 'Instant',
        time: '< 10 sec',
        label: '204.45 - 273.92 Gwei',
    },
    {
        value: '12',
        title: 'High',
        time: '~ 12 sec',
        label: '204.45 - 273.92 Gwei',
    },
    {
        value: '30',
        title: 'Medium',
        time: '~ 10 sec',
        label: '204.45 - 273.92 Gwei',
    },
    {
        value: '60',
        title: 'Low',
        time: '≥ 1 min',
        label: '204.45 - 273.92 Gwei',
    },
];

const Settings = ({ coins }) => {
    const [slippageTolerance, setSlippageTolerance] = useState(() => ({
        value: '',
        defaultValue: '23',
    }));
    const [activeTime, setActiveTime] = useState(defaultTimeList[1]);
    const [manualTime, setManualTime] = useState(() => ({
        value: '',
        title: 'Manual time',
        label: '204.45 - 273.92 Gwei',
    }));
    const [openSettingsModal, toggleSettingsModal] = useCycle(false, true);

    return (
        <>
            <div className={classes.wrap}>
                <div className={classes.header}>
                    <div className={classes.headerText}>
                        <div>Gas Price</div>
                        <div>
                            {activeTime.title} ({activeTime.label})
                        </div>
                    </div>
                    <button className={classes.btn} onClick={toggleSettingsModal}>
                        <svg>
                            <use xlinkHref="#icon-settings" />
                        </svg>
                    </button>
                </div>
                <ul className={classes.list}>
                    <li>
                        <span className={classes.itemLabel}>Slippage Tolerance</span>
                        <span className={classes.itemValue}>
                            {slippageTolerance.value === ''
                                ? slippageTolerance.defaultValue
                                : parseFloat(slippageTolerance.value)}
                            %
                        </span>
                    </li>
                    <li>
                        <span className={classes.itemLabel}>Price</span>
                        <span className={classes.itemValue}>
                            <span>
                                {coins[1].price} {coins[1].name} =
                            </span>
                            <span>
                                {coins[0].price} {coins[0].name}
                            </span>
                        </span>
                    </li>
                </ul>
            </div>
            <AnimatePresence>
                {openSettingsModal && (
                    <SettingsModal
                        defaultTimeList={defaultTimeList}
                        activeTime={activeTime}
                        setActiveTime={setActiveTime}
                        slippageTolerance={slippageTolerance}
                        setSlippageTolerance={setSlippageTolerance}
                        manualTime={manualTime}
                        setManualTime={setManualTime}
                        close={toggleSettingsModal}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

Settings.propTypes = {
    coins: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        }).isRequired
    ).isRequired,
};

export default memo(Settings);
