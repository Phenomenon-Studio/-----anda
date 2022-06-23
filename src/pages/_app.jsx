import { useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import smoothscroll from 'smoothscroll-polyfill';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => {
    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
                <title>p</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
};

App.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export default App;
