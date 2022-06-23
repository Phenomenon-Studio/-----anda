import { memo, useContext } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import AppContext from '@context/AppContext';
import classes from './Tabs.module.css';

const Tabs = () => {
    const { tabsList, selectedTab, setSelectedTab } = useContext(AppContext);

    return (
        <nav className={classes.wrap}>
            <ul className={classes.inner}>
                {tabsList.map(item => {
                    const selected = item.value === selectedTab.value;

                    return (
                        <li key={item.value} className={classes.item}>
                            <button
                                className={clsx(classes.button, selected && classes.selected)}
                                onClick={() => setSelectedTab(item)}
                            >
                                <span>{item.value}</span>
                            </button>
                            {selected && (
                                <motion.span
                                    transition={{ duration: 0.2 }}
                                    className={classes.underline}
                                    layoutId={classes.underline}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default memo(Tabs);
