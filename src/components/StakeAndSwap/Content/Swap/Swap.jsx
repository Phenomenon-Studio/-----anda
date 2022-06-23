import { memo, useContext, useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import MainLayoutContext from '@context/MainLayoutContext';
import StakeAndSwapContext from '@context/StakeAndSwapContext';
import { useToggleModal } from '@hooks';
import { COIN } from '@constants';
import { setAmount, calculateSwap } from '@utils';
import Title from '@components/ui/Title';
import Button from '@components/ui/Button';
import ButtonOpenChart from '../ButtonOpenChart';
import ButtonGroup from '../ButtonGroup';
import Input from '../Input';
import Settings from '../Settings';
import PoweredBy from '../PoweredBy';
import ConfirmSwapModal from './ConfirmSwapModal';
import classes from './Swap.module.css';

const Swap = () => {
    const { token, connectWalletHandler } = useContext(MainLayoutContext);
    const { coins, setCoins, reverseCoinsHandler, balanceRangeList, amountP, amountB, priceP, reservesSwapData } =
        useContext(StakeAndSwapContext);
    const [hasInputPayError, setHasInputPayError] = useState(false);
    const [switched, setSwitched] = useState(false);
    const [balanceRange, setBalanceRange] = useState(null);
    const [openedConfirmSwapModal, toggleConfirmSwapModal] = useToggleModal();
    const coinPayNameRef = useRef(coins[0].name);

    useEffect(() => {
        setCoins(prevState =>
            prevState.map(item => ({
                ...item,
                price: item.price,
                amount: item.name === COIN ? setAmount(amountP) : setAmount(amountB),
            }))
        );
        setBalanceRange(null);
        setHasInputPayError(false);
    }, [amountB, amountP, setCoins]);

    const togglePayInputError = useCallback(
        isSwapError => {
            if (isSwapError) {
                setHasInputPayError(true);
            } else {
                hasInputPayError && setHasInputPayError(false);
            }
        },
        [hasInputPayError]
    );

    const swapSwitch = () => {
        reverseCoinsHandler();
        setSwitched(!switched);
    };

    useEffect(() => {
        const value = coins[0].price;

        if (coinPayNameRef.current === coins[0].name || !value) {
            return;
        }

        coinPayNameRef.current = coins[0].name;
        const { receivePrice, isSwapError } = calculateSwap(
            coinPayNameRef.current,
            reservesSwapData,
            value,
            priceP?.price
        );

        togglePayInputError(isSwapError);

        setCoins(prevState => {
            return [
                {
                    ...prevState[0],
                    price: value,
                },
                {
                    ...prevState[1],
                    price: receivePrice,
                },
            ];
        });
    }, [coins, priceP?.price, reservesSwapData, setCoins, togglePayInputError]);

    const swapHandler = () => {
        toggleConfirmSwapModal();
    };

    const changeSwapValueHandler = e => {
        let value = e.target.value;
        const { receivePrice, isSwapError } = calculateSwap(coins[0].name, reservesSwapData, value, priceP?.price);

        togglePayInputError(isSwapError);
        setBalanceRange(null);

        setCoins(prevState => {
            return [
                {
                    ...prevState[0],
                    price: value,
                },
                {
                    ...prevState[1],
                    price: receivePrice,
                },
            ];
        });
    };

    const getPartOfBalanceHandler = data => {
        setBalanceRange(data ? data.name : null);
        setCoins(prevState => {
            const payPrice = data ? prevState[0].amount * data.value : '';
            const { receivePrice, isSwapError } = calculateSwap(
                prevState[0].name,
                reservesSwapData,
                payPrice,
                priceP?.price
            );

            togglePayInputError(isSwapError);

            return [
                {
                    ...prevState[0],
                    price: payPrice,
                },
                {
                    ...prevState[1],
                    price: receivePrice,
                },
            ];
        });
    };

    return (
        <>
            <ButtonOpenChart />
            <Title tagName="h3" size="secondary" additionalClasses="t-center">
                Swap
            </Title>
            <div className={clsx(classes.inputWrap, classes.mt20)}>
                <Input
                    data={coins[0]}
                    headerText="You Pay"
                    value={coins[0].price}
                    onChange={changeSwapValueHandler}
                    hasError={hasInputPayError}
                    errorMessage={`Too much influence on the price when selling ${coins[0].name}, reduce the price`}
                    placeholder="0.0"
                    balance={switched ? amountB : amountP}
                />
            </div>
            <div className={classes.buttons}>
                <button className={classes.btn} onClick={swapSwitch}>
                    <svg>
                        <use xlinkHref="#icon-arrows" />
                    </svg>
                </button>
                <ButtonGroup
                    list={balanceRangeList}
                    active={balanceRange}
                    setActive={getPartOfBalanceHandler}
                    additionalClasses={classes.buttonsGroup}
                    isSetFullData
                    canToggle
                />
            </div>
            <div className={classes.inputWrap}>
                <Input
                    data={coins[1]}
                    headerText="You Receive"
                    value={coins[1].price}
                    onChange={changeSwapValueHandler}
                    disabled
                    placeholder="0.0"
                    balance={switched ? amountP : amountB}
                />
            </div>
            {coins[0].price && coins[1].price ? <Settings coins={coins} /> : null}
            <Button
                tagName="button"
                color="primary"
                width="full"
                additionalClasses={classes.mt20}
                onClick={token ? swapHandler : connectWalletHandler}
                disabled={(token && hasInputPayError) || (token && !coins[0].price)}
            >
                <span>{token ? 'Swap' : 'Connect Wallet'}</span>
            </Button>
            <PoweredBy />
            {token && <ConfirmSwapModal opened={openedConfirmSwapModal} close={toggleConfirmSwapModal} coins={coins} />}
        </>
    );
};

export default memo(Swap);
