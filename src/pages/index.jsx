import { useState } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import AppContext from '@context/AppContext';
import HeaderContext from '@context/HeaderContext';
import { getAPIData } from '@utils';
import MainLayout from '@components/layout/MainLayout';
import Header from '@components/layout/Header';

const Hero = dynamic(() => import('@components/Hero'));
const StakeAndSwap = dynamic(() => import('@components/StakeAndSwap'));

const tabsList = [
    {
        value: 't',
    },
    {
        value: 's',
    },
    {
        value: 'f',
    },
    {
        value: 'd',
    },
];

const Home = ({
    langList,
    headerNavList,
    headerData,
    heroData,
}) => {
    const [headerValue] = useState(() => ({ langList, headerData, headerNavList }));
    const [selectedTab, setSelectedTab] = useState(() => tabsList[0]);
    const [currentCoinData, setCurrentCoinData] = useState(null);

    return (
        <AppContext.Provider
            value={{
                selectedTab,
                setSelectedTab,
                tabsList,
                currentCoinData,
                setCurrentCoinData,
            }}
        >
            <MainLayout>
                <HeaderContext.Provider value={headerValue}>
                    <Header data={headerData} />
                </HeaderContext.Provider>
                <Hero data={heroData} />
                <StakeAndSwap data={stakeAndSwapData} />
            </MainLayout>
        </AppContext.Provider>
    );
};

Home.propTypes = {
    langList: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    headerNavList: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            link: PropTypes.string,
            id: PropTypes.number.isRequired,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    link: PropTypes.string,
                    id: PropTypes.number.isRequired,
                })
            ),
        }).isRequired
    ).isRequired,
    headerData: PropTypes.shape({
        login: PropTypes.string.isRequired,
        connect_wallet: PropTypes.string.isRequired,
    }).isRequired,
    heroData: PropTypes.shape({
        buy_P: PropTypes.string.isRequired,
        stake_P: PropTypes.string.isRequired,
        hero_subtitle: PropTypes.string.isRequired,
    }).isRequired,
};

export const getStaticProps = async ctx => {
    const data = await getAPIData(ctx.locale);

    return {
        revalidate: 120,
        props: {
            ...data,
        },
    };
};

export default Home;
