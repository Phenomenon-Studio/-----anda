import { useContext, useCallback } from 'react';
import AppContext from '@context/AppContext';
import { scrollToEl } from '@utils';

export const useScrollToElAndSelectTab = (openedMenu, onClose) => {
    const { setSelectedTab, tabsList } = useContext(AppContext);

    const clickHandler = useCallback(
        (e, href, name) => {
            e.preventDefault();

            const foundTab = tabsList.find(tab => tab.value === name);

            foundTab && setSelectedTab(foundTab);

            if (openedMenu) {
                onClose?.();

                setTimeout(() => {
                    scrollToEl(href);
                }, 100);

                return;
            }

            scrollToEl(href);
        },
        [onClose, openedMenu, setSelectedTab, tabsList]
    );

    return clickHandler;
};
