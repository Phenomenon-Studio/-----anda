import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Logo from '@components/Logo';
import Container from '@components/layout/Container';
import Button from '@components/ui/Button';
import DecorGradient from '@components/ui/DecorGradient';
import classes from './ErrorPage.module.css';

const ErrorPage = ({ statusCode, description, buttonText }) => {
    return (
        <div className={clsx(classes.wrap, 'o-hidden')}>
            <DecorGradient />
            <Container size="mini">
                <div className={classes.inner}>
                    <header className={classes.header}>
                        <Logo />
                    </header>
                    <div className={classes.body}>
                        <div className={classes.status}>
                            <span className={clsx(classes.number, classes.numberFirst)}>{statusCode[0]}</span>
                            <span className={clsx(classes.number, classes.numberSecond)}>{statusCode[1]}</span>
                            <span className={clsx(classes.number, classes.numberThird)}>{statusCode[2]}</span>
                        </div>
                        <div className={classes.bodyInner}>
                            <div className={classes.textWrap}>
                                <div className={classes.imageWrap}>
                                    <Image
                                        src="/images/info.webp"
                                        alt="Information image"
                                        width={45}
                                        height={45}
                                        objectFit="contain"
                                    />
                                </div>
                                <p className={classes.description}>{description}</p>
                            </div>
                            <Link href="/" passHref>
                                <Button color="primary">
                                    <span>{buttonText}</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
            <DecorGradient variant="secondary" />
        </div>
    );
};

ErrorPage.propTypes = {
    description: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    statusCode: PropTypes.string.isRequired,
};

export default ErrorPage;
