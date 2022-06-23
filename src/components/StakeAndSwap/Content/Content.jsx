import { memo, useContext, useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useToggleModal, useLocalStorage } from '@hooks';
import {
    STAKE,
    SWAP,
    FARM,
    DASHBOARD,
    COIN_P,
    COIN_B,
    UPDATE_TIME_CHART,
} from '@constants';
import { setAmount } from '@utils';
import AppContext from '@context/AppContext';
import MainLayoutContext from '@context/MainLayoutContext';
import StakeAndSwapContext from '@context/StakeAndSwapContext';
import Loader from '@components/ui/Loader';
import classes from './Content.module.css';

const ChartWrap = dynamic(() => import('./ChartWrap'), {
    ssr: false,
});
const Stake = dynamic(() => import('./Stake'), {
    ssr: false,
    loading: () => <Loader additionalClasses={classes.loader} />,
});
const Swap = dynamic(() => import('./Swap'), {
    ssr: false,
    loading: () => <Loader additionalClasses={classes.loader} />,
});
const Farm = dynamic(() => import('./Farm'), {
    ssr: false,
    loading: () => <Loader additionalClasses={classes.loader} />,
});
const Dashboard = dynamic(() => import('./Dashboard'), {
    ssr: false,
    loading: () => <Loader additionalClasses={classes.loader} />,
});

const NotConnected = dynamic(() => import('./NotConnected'), {
    ssr: false,
});

const jsonInterface = [];

const Content = () => {
    const { account, typeAccount, token } = useContext(MainLayoutContext);
    const { selectedTab } = useContext(AppContext);
    const accountRef = useRef(account);
    const [amountP, setAmountP, removeAmountP] = useLocalStorage('amountP');
    const [amountPB, setAmountPB, removeAmountPB] = useLocalStorage('amountPB');
    const [amountB, setAmountB, removeAmountB] = useLocalStorage('amountB');
    const [priceP, setPriceP] = useLocalStorage('priceP');
    const [reservesSwapData, setReservesSwapData] = useLocalStorage('reserves');
    const [coins, setCoins] = useState(() => [
        {
            name: COIN_P,
            icon: '#icon-P',
            amount: setAmount(amountP),
            price: '',
        },
        {
            name: COIN_B,
            icon: '#icon-B',
            amount: setAmount(amountB),
            price: '',
        },
    ]);
    const [stakeEnabled, setStakeEnabled] = useState(false);
    const [canStakeUnstakeInStake, setCanStakeUnstakeInStake] = useState(false);
    const [isApproveContractP, setIsApprovedContractP] = useState(false);
    const [isApproveContractPB, setIsApprovedContractPB] = useState(false);
    const [isStakeLP, setIsStakeLP] = useState(false);
    const [openedChartModal, toggleChartModal] = useToggleModal();
    const web3IntervalIdRef = useRef(null);
    const web3ContractIntervalIdRef = useRef(null);
    const web3Ref = useRef(null);
    const web3ContractRef = useRef(null);
    const isStake = selectedTab.value === STAKE;
    const isSwap = selectedTab.value === SWAP;
    const isFarm = selectedTab.value === FARM;
    const isDashboard = selectedTab.value === DASHBOARD;

    const reverseCoinsHandler = () => {
        setCoins([...coins.reverse()]);
    };

    useEffect(() => {
        const getReservesContract = async () => {
            if (!web3ContractRef.current) {
                const Contract = (await import('web3-eth-contract')).default;

                Contract.setProvider('https://bsc-dataseed1.binance.org/');
                web3ContractRef.current = new Contract(jsonInterface, '0x...');
            }

            web3ContractRef.current.methods.getReserves().call(function (err, Reserves) {
                if (
                    typeof reservesSwapData === 'undefined' ||
                    reservesSwapData[0] != Reserves[0] ||
                    reservesSwapData[1] != Reserves[1]
                ) {
                    setReservesSwapData(Reserves);
                }
                let reserve0 = parseFloat(Reserves[0]) / 10 ** 18;
                let reserve1 = parseFloat(Reserves[1]) / 10 ** 18;
                const newPriceP = reserve0 / reserve1;

                if (typeof priceP === 'undefined' || parseFloat(newPriceP) !== parseFloat(priceP?.price)) {
                    setPriceP({ price: newPriceP });
                }
            });
        };

        getReservesContract();

        web3ContractIntervalIdRef.current = setInterval(() => {
            getReservesContract();
        }, UPDATE_TIME_CHART);

        return () => {
            clearInterval(web3ContractIntervalIdRef.current);
        };
    }, [priceP, reservesSwapData, setPriceP, setReservesSwapData]);

    useEffect(() => {
        reloader();
    }, [reloader]);

    useEffect(() => {
        accountRef.current = account;
    }, [account]);

    return (
        <StakeAndSwapContext.Provider
            value={{
                coins,
                setCoins,
                reverseCoinsHandler,
                openedChartModal,
                toggleChartModal,
                balanceRangeList,
                stakeEnabled,
                setStakeEnabled,
                canStakeUnstakeInStake,
                setCanStakeUnstakeInStake,
                isApproveContractP,
                isApproveContractPB,
                setIsApprovedContractP,
                setIsApprovedContractPB,
                isStakeLP,
                setIsStakeLP,
                dashboardInfoStakePList,
                dashboardInfoFarmList,
                amountP,
                amountB,
                amountPB,
                priceP,
                reservesSwapData,
                PEarned,
                PBEarned,
                PStaked,
                PBStaked,
                apyP,
                apyPB,
            }}
        >
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    key={selectedTab.value}
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className={clsx(classes.wrap, isDashboard && classes.dashboardWrap)}>
                        {!isDashboard && <ChartWrap />}
                        <div className={clsx(classes.box, 'o-hidden')}>
                            {isStake && <Stake />}
                            {isSwap && <Swap />}
                            {isFarm && <Farm />}
                            {isDashboard && <Dashboard />}
                        </div>
                    </div>
                    {!account && !typeAccount && !token && !isDashboard ? <NotConnected /> : null}
                </motion.div>
            </AnimatePresence>
        </StakeAndSwapContext.Provider>
    );
};

export default memo(Content);
