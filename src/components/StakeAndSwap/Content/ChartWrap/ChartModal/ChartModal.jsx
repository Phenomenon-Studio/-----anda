import { memo } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import classes from './ChartModal.module.css';

const Modal = dynamic(() => import('@components/ui/Modal'), { ssr: false });

const ChartModal = ({ opened, close, children }) => {
    return (
        <Modal opened={opened} close={close} additionalClasses={classes.modal}>
            <div className={classes.wrap}>
                <button className={classes.btnClose} onClick={close}>
                    <svg>
                        <use xlinkHref="#icon-close" />
                    </svg>
                </button>
                {children}
            </div>
        </Modal>
    );
};

ChartModal.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
    opened: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
};

export default memo(ChartModal);
