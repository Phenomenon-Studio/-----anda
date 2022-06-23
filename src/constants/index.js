export const API_URL = process.env.API_URL;
export const CLIENT_API_URL = process.env.NEXT_PUBLIC_API_URL;
export const EXCHANGE_API_URL = process.env.NEXT_PUBLIC_EXCHANGE_API_URL;
export const EXCHANGE_API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;
export const TABLE_ROW_STYLES = [
    {
        gradient:
            'radial-gradient(50% 50% at 50% 50%, rgba(60, 125, 84, 0.35) 12.5%, rgba(26, 47, 40, 0.35) 66.15%), radial-gradient(50% 50% at 50% 50%, #469762 16.15%, #091D16 100%)',
        size: '12em',
    },
    {
        gradient:
            'radial-gradient(50% 50% at 50% 50%, rgba(96, 128, 66, 0.25) 12.5%, rgba(29, 37, 22, 0.25) 66.15%), radial-gradient(50% 50% at 50% 50%, #6A8E47 16.15%, #323F2A 100%)',
        size: '10em',
    },
    {
        gradient:
            'radial-gradient(50% 50% at 50% 50%, rgba(110, 90, 58, 0.25) 12.5%, rgba(78, 61, 45, 0.25) 66.15%), radial-gradient(50% 50% at 50% 50%, #78623D 16.15%, #312419 100%)',
        size: '7.2em',
    },
    {
        gradient:
            'radial-gradient(50% 50% at 50% 50%, rgba(130, 59, 125, 0.25) 12.5%, rgba(62, 26, 62, 0.25) 66.15%), radial-gradient(50% 50% at 50% 50%, #702F6B 16.15%, #2A112C 100%)',
        size: '6em',
    },
];
export const DEFAULT_TRANSITION = { type: 'linear', duration: 0.2 };
export const EN_LOCALE = 'en-US';
export const MOBILE_HEADER_MENU_MQ = '(max-width: 1199px)';
export const DESKTOP_HEADER_MENU_MQ = '(min-width: 1200px) and (max-width: 1499px)';
export const DEFAULT_ANIMATION_SETTINGS_FOR_CONTAINER = {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.1 },
};
export const ANIMATION_VARIANT_FADE_IN_LEFT = {
    hidden: {
        opacity: 0,
        x: -50,
    },
    visible: i => ({
        opacity: 1,
        x: 0,
        transition: {
            ease: 'easeOut',
            duration: 0.4,
            delay: i ? i * 0.5 : 0,
        },
    }),
};
export const ANIMATION_VARIANT_FADE_IN_UP = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: i => ({
        opacity: 1,
        y: 0,
        transition: {
            ease: 'easeOut',
            duration: 0.4,
            delay: i ? i * 0.5 : 0,
        },
    }),
};
export const STARS_TRANSLATE_DIVIDER_NUMBER = 200;
export const COINS_TRANSLATE_DIVIDER_NUMBER = 80;
export const UPDATE_TIME_CHART = 6e4;
