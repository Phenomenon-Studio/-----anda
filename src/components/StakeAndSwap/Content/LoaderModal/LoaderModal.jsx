import { memo } from 'react';
import PropTypes from 'prop-types';
import Loader from '@components/ui/Loader';
import ContentModal from '../ContentModal';

const LoaderModal = ({ opened, close, title, children }) => {
    return (
        <ContentModal opened={opened} close={close} title={title}>
            <Loader />
            {children}
        </ContentModal>
    );
};

LoaderModal.propTypes = {
    opened: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
};

export default memo(LoaderModal);
