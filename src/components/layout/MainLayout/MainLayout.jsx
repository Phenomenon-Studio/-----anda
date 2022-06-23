import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { useToggleModal, useLocalStorage } from '@hooks';
import MainLayoutContext from '@context/MainLayoutContext';
import MessageContent from '@components/ui/MessageContent';
import classes from './MainLayout.module.css';

const MessageModal = dynamic(() => import('@components/ui/MessageModal'), { ssr: false });

const MainLayout = ({ children }) => {
    const [account, setAccount, removeAccount] = useLocalStorage('account');
    const [typeAccount, setTypeAccount, removeTypeAccount] = useLocalStorage('typeAccount');
    const [token, setToken] = useState(false);
    const [messageModalData, setMessageModalData] = useState({
        title: '',
        description: '',
        isError: false,
    });
    const [openedMessageModal, toggleMessageModal] = useToggleModal(false);

    useEffect(() => {
        if (account) {
            setToken(true);
        }
    }, [account]);

    const metaMaskConnect = async () => {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        if (window.ethereum.chainId !== '0x38' || window.ethereum.networkVersion !== '56') {
            setMessageModalData({
                title: 'Provider Error',
                description: 'Switch to the Binance Smart Chain network',
                isError: true,
            });
            if (openedMessageModal) {
                toggleMessageModal();
            }
            toggleMessageModal();
            return;
        }

        setAccount({ account: account });
        setTypeAccount({ type: 'metamask' });
    };

    const metaMaskDisconnect = async () => {
        setToken(false);
        removeAccount();
        removeTypeAccount();
    };

    const connectWalletHandler = () => {
        if (typeof window.ethereum !== 'undefined') {
            metaMaskConnect();
        }
    };

    const disconnectWalletHandler = () => {
        if (typeAccount.type === 'metamask') {
            metaMaskDisconnect();
        }
    };

    return (
        <MainLayoutContext.Provider
            value={{
                typeAccount,
                account,
                connectWalletHandler,
                disconnectWalletHandler,
                token,
                openedMessageModal,
                toggleMessageModal,
                setMessageModalData,
            }}
        >
            <div className={classes.wrap}>{children}</div>
            <MessageModal opened={openedMessageModal} close={toggleMessageModal}>
                <MessageContent
                    title={messageModalData.title}
                    description={messageModalData.description}
                    isError={messageModalData.isError}
                    additionalClasses="pr-40"
                />
            </MessageModal>
        </MainLayoutContext.Provider>
    );
};

MainLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
};

export default MainLayout;
