import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Title from '@components/ui/Title';
import SettingsInputWrap from './SettingsInputWrap';
import SlippageTolerance from './SlippageTolerance';
import ManualTime from './ManualTime';
import DefaultTime from './DefaultTime';
import classes from './SettingsModal.module.css';

const SettingsModal = ({
    defaultTimeList,
    activeTime,
    setActiveTime,
    slippageTolerance,
    setSlippageTolerance,
    manualTime,
    setManualTime,
    close,
}) => {
    return (
        <motion.div
            className={classes.wrap}
            initial={{ x: '100%' }}
            animate={{
                x: 0,
                transition: { type: 'easeOut', duration: 0.2 },
            }}
            exit={{
                x: '100%',
                transition: { type: 'easeOut', duration: 0.2 },
            }}
        >
            <button className={classes.btn} onClick={close}>
                <svg>
                    <use xlinkHref="#icon-arrow" />
                </svg>
            </button>
            <Title tagName="h3" size="secondary" additionalClasses="t-center">
                Settings
            </Title>
            <SettingsInputWrap title="Slippage tolerance">
                <SlippageTolerance data={slippageTolerance} setData={setSlippageTolerance} />
            </SettingsInputWrap>
            <DefaultTime
                list={defaultTimeList}
                activeTime={activeTime}
                setActiveTime={setActiveTime}
                manualTime={manualTime}
                setManualTime={setManualTime}
            />
            <SettingsInputWrap title="Manual time">
                <ManualTime
                    manualTime={manualTime}
                    setManualTime={setManualTime}
                    activeTime={activeTime}
                    setActiveTime={setActiveTime}
                    defaultData={defaultTimeList[1]}
                />
            </SettingsInputWrap>
        </motion.div>
    );
};

SettingsModal.propTypes = {
    defaultTimeList: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    slippageTolerance: PropTypes.shape({
        value: PropTypes.string.isRequired,
        defaultValue: PropTypes.string.isRequired,
    }).isRequired,
    manualTime: PropTypes.shape({
        value: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    }).isRequired,
    activeTime: PropTypes.shape({
        value: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        time: PropTypes.string,
        label: PropTypes.string.isRequired,
    }).isRequired,
    setSlippageTolerance: PropTypes.func.isRequired,
    setManualTime: PropTypes.func.isRequired,
    setActiveTime: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
};

export default memo(SettingsModal);
