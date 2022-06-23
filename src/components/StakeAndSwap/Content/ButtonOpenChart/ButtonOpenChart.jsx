import { memo, useContext } from 'react';
import StakeAndSwapContext from '@context/StakeAndSwapContext';
import { useMediaQuery } from '@hooks';
import classes from './ButtonOpenChart.module.css';

const ButtonOpenChart = () => {
    const { toggleChartModal } = useContext(StakeAndSwapContext);
    const canMobileChart = useMediaQuery('(max-width: 991px)');

    return (
        canMobileChart && (
            <button className={classes.btn} onClick={toggleChartModal}>
                <svg>
                    <use xlinkHref="#icon-area" />
                </svg>
            </button>
        )
    );
};

export default memo(ButtonOpenChart);
