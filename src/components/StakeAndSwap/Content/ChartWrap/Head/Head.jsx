import { memo } from 'react';
import PropTypes from 'prop-types';
import { COIN_P, COIN_B } from '@constants';
import Coins from './Coins';
import ChartFilter from './ChartFilter';
import Percent from './Percent';
import classes from './Head.module.css';

const Head = ({ currentPayload, tick, setTick, disabledButtons }) => {
    return (
        <>
            <div className={classes.wrap}>
                <Coins />
                <div className={classes.payloadWrap}>
                    <div>
                        <div className={classes.price}>${currentPayload.value}</div>
                        <div className={classes.date}>{currentPayload.date}</div>
                    </div>
                    <div>
                        <Percent
                            changedValue={parseFloat(currentPayload.change)}
                            changedPercentValue={parseFloat(currentPayload.changePercent)}
                        />
                        <div className={classes.coins}>
                            <span>{COIN_P}</span> / <span>{COIN_B}</span>
                        </div>
                    </div>
                </div>
            </div>
            <ChartFilter active={tick} setActive={setTick} disabledButtons={disabledButtons} />
        </>
    );
};

Head.propTypes = {
    tick: PropTypes.string.isRequired,
    setTick: PropTypes.func.isRequired,
    currentPayload: PropTypes.shape({
        date: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        change: PropTypes.string.isRequired,
        changePercent: PropTypes.string.isRequired,
    }).isRequired,
    disabledButtons: PropTypes.bool.isRequired,
};

export default memo(Head);
