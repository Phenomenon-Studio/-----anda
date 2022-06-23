import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { DEFAULT_TRANSITION } from '@constants';
import classes from './Modal.module.css';

const Modal = ({ opened, close, children, additionalClasses = '' }) => {
    return ReactDOM.createPortal(
        <AnimatePresence>
            {opened && (
                <motion.div
                    className={classes.backdrop}
                    onClick={close}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: DEFAULT_TRANSITION }}
                    exit={{ opacity: 0, transition: DEFAULT_TRANSITION }}
                >
                    <div className={classes.body}>
                        <motion.div
                            className={clsx(classes.wrap, additionalClasses)}
                            onClick={e => e.stopPropagation()}
                            initial={{ translateY: 20 }}
                            animate={{ translateY: 0, transition: DEFAULT_TRANSITION }}
                            exit={{ translateY: -20, transition: DEFAULT_TRANSITION }}
                        >
                            {children}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

Modal.propTypes = {
    opened: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
    additionalClasses: PropTypes.string,
};

export default Modal;
