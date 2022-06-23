import { useContext, useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { useScrollToElAndSelectTab, useMediaQuery } from '@hooks';
import { DESKTOP_HEADER_MENU_MQ } from '@constants';
import HeaderContext from '@context/HeaderContext';
import classes from './Nav.module.css';

const Navigation = ({ openedMenu, onClose }) => {
    const { headerNavList } = useContext(HeaderContext);
    const [navList, setNavList] = useState(headerNavList);
    const canFilterNav = useMediaQuery(DESKTOP_HEADER_MENU_MQ);
    const clickHandler = useScrollToElAndSelectTab(openedMenu, onClose);

    useEffect(() => {
        if (canFilterNav) {
            setNavList(headerNavList.filter(({ link }) => link && link.startsWith('#')));
        } else {
            setNavList(headerNavList);
        }
    }, [canFilterNav, headerNavList]);

    return (
        <nav className={classes.nav}>
            <ul className={classes.list}>
                {navList.map(({ name, link, id, children }) => {
                    let linkAttrs = null;

                    if (link && link.startsWith('#')) {
                        linkAttrs = { onClick: e => clickHandler(e, link, name) };
                    } else if (link && !link.startsWith('/')) {
                        linkAttrs = { target: '_blank', rel: 'noreferrer' };
                    }

                    return (
                        <li key={id} className={classes.item}>
                            {children ? (
                                <div className={classes.inner}>
                                    <div className={classes.innerName}>{name}</div>
                                    <div className={classes.innerListWrap}>
                                        <ul className={classes.innerList}>
                                            {children.map(child => (
                                                <li key={child.id} className={classes.innerItem}>
                                                    <a
                                                        href={child.link}
                                                        className={classes.innerLink}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        {child.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <a href={link} className={classes.link} {...linkAttrs}>
                                    {name}
                                </a>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

Navigation.propTypes = {
    openedMenu: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default memo(Navigation);
