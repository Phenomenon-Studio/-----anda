import { memo, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { DEFAULT_TRANSITION } from '@constants';
import classes from './MessageModal.module.css';

const MessageModal = ({ opened, close, closeTime = 3000, children }) => {
    const timerIdRef = useRef(null);

    useEffect(() => {
        if (!opened) {
            return;
        }

        timerIdRef.current = setTimeout(() => {
            close();
            timerIdRef.current = null;
        }, closeTime);

        return () => {
            clearTimeout(timerIdRef.current);
            timerIdRef.current = null;
        };
    }, [close, closeTime, opened]);

    const closeAndClearTimerHandler = () => {
        close();
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
    };

    return ReactDOM.createPortal(
        <AnimatePresence>
            {opened && (
                <motion.div
                    className={classes.wrap}
                    onClick={e => e.stopPropagation()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: DEFAULT_TRANSITION }}
                    exit={{ opacity: 0, transition: DEFAULT_TRANSITION }}
                >
                    <button className={classes.btnClose} onClick={closeAndClearTimerHandler}>
                        <svg>
                            <use xlinkHref="#icon-close" />
                        </svg>
                    </button>
                    {children}
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

MessageModal.propTypes = {
    opened: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    closeTime: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
};

export default memo(MessageModal);
