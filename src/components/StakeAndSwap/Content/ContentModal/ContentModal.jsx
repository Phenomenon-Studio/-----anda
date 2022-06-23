import { memo } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './ContentModal.module.css';

const Modal = dynamic(() => import('@components/ui/Modal'), { ssr: false });

const ContentModal = ({ opened, close, title, children }) => {
    return (
        <Modal opened={opened} close={close} additionalClasses={classes.wrap}>
            <header className={classes.header}>
                <h4 className={clsx(classes.title, 't-center')}>{title}</h4>
                <button className={classes.btn} onClick={close}>
                    <svg>
                        <use xlinkHref="#icon-close" />
                    </svg>
                </button>
            </header>
            {children}
        </Modal>
    );
};

ContentModal.propTypes = {
    opened: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
};

export default memo(ContentModal);
