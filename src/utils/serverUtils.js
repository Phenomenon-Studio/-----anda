import { API_URL } from '@constants';

const requestHandler = async url => {
    try {
        const res = await fetch(url);
        const data = await res.json();

        return data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.message);
        return null;
    }
};

const pickFromObject = (obj, keys) => {
    return keys.reduce((acc, cur) => {
        if (obj[cur]) {
            acc[cur] = obj[cur];
        }

        return acc;
    }, {});
};

const getLanguagesList = async () => {
    const { data } = await requestHandler(`${API_URL}/api/languages`);

    return data.map(item => ({
        label: item.slug,
        value: item.locale,
    }));
};

const getLanguageConstants = async locale => {
    const result = await requestHandler(`${API_URL}/api/${locale}/language-const`);

    return result;
};

const getHeaderNavList = async locale => {
    const data = await requestHandler(`${API_URL}/api/${locale}/menu`);

    return data;
};

const getRoadMapContentData = async locale => {
    const data = await requestHandler(`${API_URL}/api/${locale}/road-map`);
    const keys = Object.keys(data);
    const imagesList = keys.reduce((acc, cur) => {
        if (cur === '2021') {
            const arr = data[cur];

            acc.push(arr[arr.length - 1].image);
        } else {
            data[cur].forEach(q => {
                acc.push(q.image);
            });
        }

        return acc;
    }, []);
    const contentList = keys.reduce((acc, cur, i) => {
        acc[i] = {
            year: cur,
            list: data[cur],
        };

        return acc;
    }, []);

    return { imagesList, contentList };
};

const prepareNotFoundPageData = data => {
    const transformedData = pickFromObject(data, ['page_404_text', 'page_404_button']);

    return transformedData;
};

const prepareHeaderData = data => {
    const transformedData = pickFromObject(data, ['login', 'connect_wallet']);

    return transformedData;
};

const prepareHeroData = data => {
    const transformedData = pickFromObject(data, ['buy_p', 'stake_p', 'hero_subtitle']);

    return transformedData;
};

const prepareStakeAndSwapData = data => {
    const transformedData = pickFromObject(data, [
        'stake_swap_title',
        'stake_swap_menu_swap',
        'stake_swap_menu_stake',
        'stake_swap_menu_farm',
        'stake_swap_menu_dashboard',
        'connect_your_wallet',
    ]);

    return transformedData;
};

export const getAPIData = async locale => {
    const langList = await getLanguagesList();
    const langConst = await getLanguageConstants(locale);
    const headerNavList = await getHeaderNavList(locale);
    const roadMapContentData = await getRoadMapContentData(locale);
    const headerData = prepareHeaderData(langConst);
    const heroData = prepareHeroData(langConst);
    const stakeAndSwapData = prepareStakeAndSwapData(langConst);

    return {
        langList,
        langConst,
        headerNavList,
        roadMapContentData,
        headerData,
        heroData,
        stakeAndSwapData,
    };
};

export const getNotFoundPageAPIData = async locale => {
    const langConst = await getLanguageConstants(locale);
    const data = prepareNotFoundPageData(langConst);

    return {
        ...data,
    };
};
