import Document, { Html, Head, Main, NextScript } from 'next/document';
import SvgSprite from '@components/ui/SvgSprite';

class AppDocument extends Document {
    render() {
        return (
            <Html lang={this.props.locale}>
                <Head>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="color-scheme" content="light dark" />
                    <meta name="theme-color" content="#0a0112" />
                    <link rel="icon" href="favicon.ico" sizes="any" />
                    <link rel="icon" href="icon.svg" type="image/svg+xml" />
                    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <SvgSprite />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default AppDocument;
