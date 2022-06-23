import { useState, useContext, memo } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import HeaderContext from '@context/HeaderContext';
import Language from '../Language';
import classes from './DesktopMenu.module.css';

const variants = {
    hidden: {
        opacity: 0,
        y: -20,
        transition: {
            delayChildren: 0.2,
        },
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delayChildren: 0.2,
        },
    },
};

const DesktopMenu = () => {
    const { headerNavList } = useContext(HeaderContext);
    const [navList] = useState(() => headerNavList.filter(({ link, children }) => !link?.startsWith('#') || children));

    return (
        <motion.div className={classes.wrap} variants={variants} initial="hidden" animate="visible">
            <ul className={clsx(classes.list, 'o-hidden')}>
                {navList.map(({ name, link, id, children }) => {
                    let linkAttrs = null;

                    if (link && !link.startsWith('/')) {
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
            <div className={classes.lang}>
                <Language />
            </div>
        </motion.div>
    );
};

export default memo(DesktopMenu);
