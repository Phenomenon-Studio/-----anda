import { useEffect } from 'react';
import { rAF } from '@utils';
import { STARS_TRANSLATE_DIVIDER_NUMBER, COINS_TRANSLATE_DIVIDER_NUMBER } from '@constants';

export const useHeroMoveParallax = (wrapRef, innerRef, isInViewport) => {
    useEffect(() => {
        const $wrap = wrapRef.current;
        const $inner = innerRef.current;

        if (!$wrap || !$inner) {
            return;
        }

        const startParallax = e => {
            const { height: starsLeftHeight, width: starsLeftWidth } = window.getComputedStyle($wrap, ':before');
            const starsLeftHeightNumber = parseFloat(starsLeftHeight);
            const starsLeftWidthNumber = parseFloat(starsLeftWidth);
            const starsLeftX = e.pageX - starsLeftWidthNumber - starsLeftWidthNumber / 2;
            const starsLeftY = e.pageY - starsLeftHeightNumber - starsLeftHeightNumber / 2;
            const starsLeftPosX = starsLeftX / STARS_TRANSLATE_DIVIDER_NUMBER;
            const starsLeftPosY = starsLeftY / STARS_TRANSLATE_DIVIDER_NUMBER;
            const { height: starsRightHeight, width: starsRightWidth } = window.getComputedStyle($wrap, ':after');
            const starsRightHeightNumber = parseFloat(starsRightHeight);
            const starsRightWidthNumber = parseFloat(starsRightWidth);
            const starsRightX = e.pageX - starsRightWidthNumber - starsRightWidthNumber / 2;
            const starsRightY = e.pageY - starsRightHeightNumber - starsRightHeightNumber / 2;
            const starsRightPosX = starsRightX / STARS_TRANSLATE_DIVIDER_NUMBER;
            const starsRightPosY = starsRightY / STARS_TRANSLATE_DIVIDER_NUMBER;
            const { height: coinsLeftHeight, width: coinsLeftWidth } = window.getComputedStyle($inner, ':before');
            const coinsLeftHeightNumber = parseFloat(coinsLeftHeight);
            const coinsLeftWidthNumber = parseFloat(coinsLeftWidth);
            const coinsLeftX = e.pageX - coinsLeftWidthNumber - coinsLeftWidthNumber / 2;
            const coinsLeftY = e.pageY - coinsLeftHeightNumber - coinsLeftHeightNumber / 2;
            const coinsLeftPosX = coinsLeftX / COINS_TRANSLATE_DIVIDER_NUMBER;
            const coinsLeftPosY = coinsLeftY / COINS_TRANSLATE_DIVIDER_NUMBER;
            const { height: coinsRightHeight, width: coinsRightWidth } = window.getComputedStyle($inner, ':after');
            const coinsRightHeightNumber = parseFloat(coinsRightHeight);
            const coinsRightWidthNumber = parseFloat(coinsRightWidth);
            const coinsRightX = e.pageX - coinsRightWidthNumber - coinsRightWidthNumber / 2;
            const coinsRightY = e.pageY - coinsRightHeightNumber - coinsRightHeightNumber / 2;
            const coinsRightPosX = coinsRightX / COINS_TRANSLATE_DIVIDER_NUMBER;
            const coinsRightPosY = coinsRightY / COINS_TRANSLATE_DIVIDER_NUMBER;

            $wrap.style.setProperty('--tx-stars-left', `${-starsLeftPosX}px`);
            $wrap.style.setProperty('--ty-stars-left', `${starsLeftPosY}px`);
            $wrap.style.setProperty('--tx-stars-right', `${-starsRightPosX}px`);
            $wrap.style.setProperty('--ty-stars-right', `${starsRightPosY}px`);
            $wrap.style.setProperty('--tx-coins-left', `${coinsLeftPosX}px`);
            $wrap.style.setProperty('--ty-coins-left', `${-coinsLeftPosY}px`);
            $wrap.style.setProperty('--tx-coins-right', `${coinsRightPosX}px`);
            $wrap.style.setProperty('--ty-coins-right', `${-coinsRightPosY}px`);
        };

        const mouseMoveHandler = e => {
            rAF(startParallax)(e);
        };

        if (isInViewport) {
            window.addEventListener('mousemove', mouseMoveHandler, { passive: true });
        }

        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler, { passive: true });
        };
    }, [innerRef, isInViewport, wrapRef]);
};
