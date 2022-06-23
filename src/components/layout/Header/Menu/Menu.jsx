import { useEffect, useState, useContext, memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MainLayoutContext from '@context/MainLayoutContext';
import HeaderContext from '@context/HeaderContext';
import { useMediaQuery, useToggle } from '@hooks';
import { LOGIN_LINK, MOBILE_HEADER_MENU_MQ, DESKTOP_HEADER_MENU_MQ } from '@constants';
import Button from '@components/ui/Button';
import Logo from '@components/Logo';
import ButtonConnectWallet from '@components/ui/ButtonConnectWallet';
import Nav from '../Nav';
import Language from './Language';
import Hamburger from '../Hamburger';
import DesktopMenu from './DesktopMenu';
import classes from './Menu.module.css';

const Menu = ({ isActive = false, onClose }) => {
    const { typeAccount, account, token, addPToMetamaskHandler } = useContext(MainLayoutContext);
    const { headerData } = useContext(HeaderContext);
    const hasToggleMobileMenu = useMediaQuery(MOBILE_HEADER_MENU_MQ);
    const hasDesktopMenu = useMediaQuery(DESKTOP_HEADER_MENU_MQ);
    const [openedDesktopMenu, toggleDesktopMenu] = useToggle();
    const [mobileMenuTransitionClass, setMobileMenuTransitionClass] = useState('');
    const isNotConnectedWallet = !typeAccount || !account || !token;

    const toggleDesktopMenuHandler = () => {
        toggleDesktopMenu();
    };

    useEffect(() => {
        if (hasToggleMobileMenu) {
            setTimeout(() => {
                setMobileMenuTransitionClass(classes.menuTransition);
            }, 100);
        } else {
            setMobileMenuTransitionClass('');
        }
    }, [hasToggleMobileMenu]);

    useEffect(() => {
        if (!hasDesktopMenu && openedDesktopMenu) {
            toggleDesktopMenu();
        }
    }, [hasDesktopMenu, openedDesktopMenu, toggleDesktopMenu]);

    const renderMenuJSX = (additionalClasses = '') => (
        <div className={classes.menu}>
            {!hasDesktopMenu && (
                <div className={classes.lang}>
                    <Language />
                </div>
            )}
            <Nav openedMenu={isActive} onClose={onClose} />
            <div className={classes.buttons}>
                <Button
                    href={LOGIN_LINK}
                    target="_blank"
                    size="mini"
                    variant="bordered"
                    additionalClasses={additionalClasses}
                >
                    <span>{headerData.login}</span>
                </Button>
                <Button
                    tagName="button"
                    size="mini"
                    variant="bordered"
                    additionalClasses={clsx(additionalClasses, classes.bottomBtn)}
                    disabled={isNotConnectedWallet}
                    onClick={isNotConnectedWallet ? null : addPToMetamaskHandler}
                >
                    <span>Add P to MetaMask</span>
                </Button>
                <ButtonConnectWallet additionalClasses={additionalClasses} btnText={headerData.connect_wallet} />
            </div>
            {hasDesktopMenu && (
                <>
                    <Hamburger
                        toggle={toggleDesktopMenuHandler}
                        opened={openedDesktopMenu}
                        hasClose
                        additionalClasses={classes.hamburger}
                    />
                    <AnimatePresence>{openedDesktopMenu && <DesktopMenu />}</AnimatePresence>
                </>
            )}
        </div>
    );

    return hasToggleMobileMenu ? (
        <div className={clsx(classes.wrap, mobileMenuTransitionClass, isActive && classes.active)}>
            <div className={classes.inner}>
                <div className={classes.head}>
                    <Logo onClick={onClose} />
                    <button className={classes.btnClose} onClick={onClose}>
                        <svg>
                            <use xlinkHref="#icon-close" />
                        </svg>
                    </button>
                </div>
                <div className={classes.menuWrap}>{renderMenuJSX(classes.buttonsBg)}</div>
            </div>
        </div>
    ) : (
        renderMenuJSX(classes.buttonsBg)
    );
};

Menu.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default memo(Menu);
