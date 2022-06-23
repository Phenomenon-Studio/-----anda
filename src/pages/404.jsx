import PropTypes from 'prop-types';
import { getNotFoundPageAPIData } from '@utils';
import ErrorPage from '@components/ErrorPage';

const NotFoundPage = ({ page_404_text, page_404_button }) => {
    return <ErrorPage statusCode="404" description={page_404_text} buttonText={page_404_button} />;
};

NotFoundPage.propTypes = {
    page_404_text: PropTypes.string.isRequired,
    page_404_button: PropTypes.string.isRequired,
};

export const getStaticProps = async ctx => {
    const data = await getNotFoundPageAPIData(ctx.locale);

    return {
        revalidate: 60,
        props: {
            ...data,
        },
    };
};

export default NotFoundPage;
