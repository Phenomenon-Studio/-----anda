import { memo } from 'react';
import Image from 'next/image';
import classes from './PoweredBy.module.css';
import pancakeLogo from '../../../../../public/images/pancake.svg';

const PoweredBy = () => {
    return (
        <div className={classes.wrap}>
            <span>Powered by</span>
            <a href="https://pancakeswap.finance" target="_blank" rel="noreferrer">
                <Image src={pancakeLogo.src} alt="PancakeSwap Logo" width={140} height={22} />
            </a>
        </div>
    );
};

export default memo(PoweredBy);
