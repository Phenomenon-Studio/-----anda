import { memo, useState, useContext, useEffect } from 'react';
import clsx from 'clsx';
import AppContext from '@context/AppContext';
import StakeAndSwapContext from '@context/StakeAndSwapContext';
import { useMediaQuery, useChartData } from '@hooks';
import { CHART_X_AXIS_24H } from '@constants';
import Loader from '@components/ui/Loader';
import Head from './Head';
import Chart from './Chart';
import ChartModal from './ChartModal';
import classes from './ChartWrap.module.css';

const ChartWrap = () => {
    const { setCurrentCoinData } = useContext(AppContext);
    const { toggleChartModal, openedChartModal } = useContext(StakeAndSwapContext);
    const canMobileChart = useMediaQuery('(max-width: 991px)');
    const [tick, setTick] = useState(CHART_X_AXIS_24H);
    const [currentPayload, setCurrentPayload] = useState(null);
    const { loading, error, data, disabled, lastDataItem } = useChartData(tick, setCurrentPayload);

    useEffect(() => {
        if (!canMobileChart && openedChartModal) {
            toggleChartModal();
        }
    }, [canMobileChart, toggleChartModal, openedChartModal]);

    useEffect(() => {
        if (lastDataItem) {
            setCurrentCoinData(lastDataItem);
        }
    }, [lastDataItem, setCurrentCoinData]);

    const renderChartWrapJSX = () => {
        if (loading) {
            return (
                <div className={clsx(classes.wrap, classes.loaderWrap)}>
                    <Loader />
                </div>
            );
        }

        if (error) {
            return <div className={clsx(classes.wrap, classes.textWrap, 't-center')}>Something went wrong!</div>;
        }

        if (!data || !currentPayload) {
            return <div className={clsx(classes.wrap, classes.textWrap, 't-center')}>Not found</div>;
        }

        return (
            <div className={classes.wrap}>
                <Head currentPayload={currentPayload} tick={tick} setTick={setTick} disabledButtons={disabled} />
                <Chart data={data} tick={tick} setCurrentPayload={setCurrentPayload} currentPayload={currentPayload} />
            </div>
        );
    };

    return canMobileChart ? (
        <ChartModal opened={openedChartModal} close={toggleChartModal} canMobileChart={canMobileChart}>
            {renderChartWrapJSX()}
        </ChartModal>
    ) : (
        renderChartWrapJSX()
    );
};

export default memo(ChartWrap);
