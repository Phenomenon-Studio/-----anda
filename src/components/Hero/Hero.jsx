import { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ANIMATION_VARIANT_FADE_IN_UP, DEFAULT_ANIMATION_SETTINGS_FOR_CONTAINER, STAKE, SWAP } from '@constants';
import { useScrollToElAndSelectTab } from '@hooks';
import Container from '@components/layout/Container';
import Button from '@components/ui/Button';
import TitleWrap from './TitleWrap';
import classes from './Hero.module.css';

const Hero = ({ data }) => {
    const clickHandler = useScrollToElAndSelectTab();

    return (
        <div className={clsx(classes.hero, 'o-hidden')}>
            <Container>
                <motion.div className={classes.inner} {...DEFAULT_ANIMATION_SETTINGS_FOR_CONTAINER}>
                    <TitleWrap subtitle={data.hero_subtitle} />
                    <motion.div className={classes.buttons} custom={1.3} variants={ANIMATION_VARIANT_FADE_IN_UP}>
                        <Button
                            tagName="button"
                            color="secondary"
                            onClick={e => clickHandler(e, '#stake-and-swap', SWAP)}
                        >
                            <span>{data.buy}</span>
                        </Button>
                        <Button
                            tagName="button"
                            color="primary"
                            onClick={e => clickHandler(e, '#stake-and-swap', STAKE)}
                        >
                            <span>{data.stake}</span>
                        </Button>
                    </motion.div>
                </motion.div>
            </Container>
        </div>
    );
};

Hero.propTypes = {
    data: PropTypes.shape({
        buy: PropTypes.string.isRequired,
        stake: PropTypes.string.isRequired,
        hero_subtitle: PropTypes.string.isRequired,
    }).isRequired,
};

export default memo(Hero);
