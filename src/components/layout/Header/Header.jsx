import { useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useMediaQuery, useToggle, useDocumentLockScrollY, useScroll } from '@hooks';
import { MOBILE_HEADER_MENU_MQ } from '@constants';
import Container from '../Container';
import Logo from '@components/Logo';
import ButtonConnectWallet from '@components/ui/ButtonConnectWallet';
import Menu from './Menu';
import Hamburger from './Hamburger';
import classes from './Header.module.css';

const Header = ({ data }) => {
    const hasMobileToggleMenu = useMediaQuery(MOBILE_HEADER_MENU_MQ);
    const [openedMobileMenu, setToggleMobileMenu] = useToggle();
    const { lockScrollY, unlockScrollY } = useDocumentLockScrollY();
    const scrollPos = useScroll();

    useEffect(() => {
        if (!hasMobileToggleMenu && openedMobileMenu) {
            setToggleMobileMenu(() => {
                unlockScrollY();
            });
        }
    }, [hasMobileToggleMenu, openedMobileMenu, setToggleMobileMenu, unlockScrollY]);

    const toggleMobileMenuHandler = useCallback(() => {
        if (!openedMobileMenu) {
            lockScrollY();
        }

        setToggleMobileMenu(newState => {
            if (newState) {
                return;
            }

            unlockScrollY();
        });
    }, [lockScrollY, openedMobileMenu, setToggleMobileMenu, unlockScrollY]);

    return (
        <header className={clsx(classes.header, scrollPos.y > 0 && classes.headerBg)}>
            <Container size="full">
                <div className={classes.inner}>
                    <Logo isPartLogo={hasMobileToggleMenu} />
                    {hasMobileToggleMenu && (
                        <div className={classes.buttons}>
                            <div className={classes.btnConnectWrap}>
                                <ButtonConnectWallet btnText={data.connect_wallet} />
                            </div>
                            <Hamburger toggle={toggleMobileMenuHandler} />
                        </div>
                    )}
                    <Menu isActive={openedMobileMenu} onClose={toggleMobileMenuHandler} />
                </div>
            </Container>
        </header>
    );
};

Header.propTypes = {
    data: PropTypes.shape({
        login: PropTypes.string.isRequired,
        connect_wallet: PropTypes.string.isRequired,
    }).isRequired,
};

export default memo(Header);
