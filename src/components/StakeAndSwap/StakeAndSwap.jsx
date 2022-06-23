import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { ANIMATION_VARIANT_FADE_IN_UP, DEFAULT_ANIMATION_SETTINGS_FOR_CONTAINER } from '@constants';
import Container from '@components/layout/Container';
import Title from '@components/ui/Title';
import Tabs from './Tabs';
import Content from './Content';
import classes from './StakeAndSwap.module.css';

const StakeAndSwap = ({ data }) => {
    return (
        <div id="stake-and-swap" className={classes.wrap}>
            <Container>
                <motion.div className={classes.inner} {...DEFAULT_ANIMATION_SETTINGS_FOR_CONTAINER}>
                    <motion.div custom={1} variants={ANIMATION_VARIANT_FADE_IN_UP}>
                        <Title additionalClasses="t-center">{data.stake_swap_title}</Title>
                    </motion.div>
                    <motion.div custom={1.8} variants={ANIMATION_VARIANT_FADE_IN_UP}>
                        <div className={classes.content}>
                            <Tabs />
                            <Content />
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </div>
    );
};

StakeAndSwap.propTypes = {
    data: PropTypes.shape({
        stake_swap_title: PropTypes.string.isRequired,
        stake_swap_menu_swap: PropTypes.string.isRequired,
        stake_swap_menu_stake: PropTypes.string.isRequired,
        stake_swap_menu_farm: PropTypes.string.isRequired,
        stake_swap_menu_dashboard: PropTypes.string.isRequired,
        connect_your_wallet: PropTypes.string.isRequired,
        coming_soon: PropTypes.string.isRequired,
    }).isRequired,
};

export default memo(StakeAndSwap);
