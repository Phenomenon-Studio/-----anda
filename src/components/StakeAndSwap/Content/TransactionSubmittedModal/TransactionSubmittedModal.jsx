import { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@components/ui/Button';
import ContentModal from '../ContentModal';
import classes from './TransactionSubmittedModal.module.css';

const TransactionSubmittedModal = ({ opened, close, title, link }) => {
    return (
        <ContentModal opened={opened} close={close} title={title}>
            <div className={classes.wrap}>
                <svg className={classes.icon}>
                    <use xlinkHref="#icon-transaction-submitted" />
                </svg>
                <a className={clsx(classes.link, classes.mt20)} href={link} target="_blank" rel="noreferrer">
                    <span>View on BscScan</span>
                    <svg>
                        <use xlinkHref="#icon-link" />
                    </svg>
                </a>
                <Button
                    size="mini"
                    variant="bordered"
                    onClick={close}
                    additionalClasses={clsx(classes.mt20, classes.btn)}
                >
                    <span>Close</span>
                </Button>
            </div>
        </ContentModal>
    );
};

TransactionSubmittedModal.propTypes = {
    opened: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

export default memo(TransactionSubmittedModal);
