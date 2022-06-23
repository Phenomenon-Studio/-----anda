import { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ANIMATION_VARIANT_FADE_IN_LEFT } from '@constants';
import { useInViewport, useHeroMoveParallax } from '@hooks';
import classes from './TitleWrap.module.css';

const TitleWrap = ({ subtitle }) => {
    const wrapRef = useRef(null);
    const innerRef = useRef(null);
    const { isInViewport } = useInViewport(wrapRef);

    useHeroMoveParallax(wrapRef, innerRef, isInViewport);

    return (
        <div className={clsx(classes.wrap, isInViewport && classes.active)} ref={wrapRef}>
            <motion.p className={classes.subtitle} custom={1} variants={ANIMATION_VARIANT_FADE_IN_LEFT}>
                {subtitle}
            </motion.p>
            <h1 className={classes.titleInner} ref={innerRef}>
                <span className={clsx(classes.title, classes.titleFirst)}>
                    <span>P</span>
                </span>
                <span className={clsx(classes.title, classes.titleSecond)}>
                    <span>P</span>
                </span>
                <span className={clsx(classes.title, classes.titleThird)}>
                    <span>F</span>
                </span>
            </h1>
        </div>
    );
};

TitleWrap.propTypes = {
    subtitle: PropTypes.string.isRequired,
};

export default TitleWrap;
