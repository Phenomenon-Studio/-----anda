import { memo } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import classes from './NotConnected.module.css';
import connectWallet from '../../../../../public/images/connect-wallet.webp';

const NotConnected = () => {
    return (
        <div className={clsx(classes.wrap, 't-center')}>
            <p>Please, connect your wallet to get started</p>
            <Image src={connectWallet} alt="Wallet with coins" placeholder="blur" width={360} height={170} />
        </div>
    );
};

export default memo(NotConnected);
