import { memo } from 'react';
import { COIN_P, COIN_B } from '@constants';
import classes from './Coins.module.css';

const Coins = () => {
    return (
        <div className={classes.wrap}>
            <div className={classes.box}>
                <svg>
                    <use xlinkHref="#icon-P" />
                </svg>
                <span>{COIN_P}</span>
            </div>
            <span className={classes.separator}>/</span>
            <div className={classes.box}>
                <svg>
                    <use xlinkHref="#icon-B" />
                </svg>
                <span>{COIN_B}</span>
            </div>
        </div>
    );
};

export default memo(Coins);
