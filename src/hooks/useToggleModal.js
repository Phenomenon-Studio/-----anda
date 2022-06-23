import { useCallback } from 'react';
import { useToggle, useDocumentLockScrollY } from '@hooks';

export const useToggleModal = (hasToggleLockingScrollY = true) => {
    const [openedModal, setToggleModal] = useToggle();
    const { lockScrollY, unlockScrollY } = useDocumentLockScrollY();

    const toggleModalHandler = useCallback(() => {
        if (hasToggleLockingScrollY && !openedModal) {
            lockScrollY();
        }

        setToggleModal(newState => {
            if (newState) {
                return;
            }

            hasToggleLockingScrollY && unlockScrollY();
        });
    }, [hasToggleLockingScrollY, lockScrollY, openedModal, setToggleModal, unlockScrollY]);

    return [openedModal, toggleModalHandler];
};
