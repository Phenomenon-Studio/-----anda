import { useCallback, useContext, memo } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import HeaderContext from '@context/HeaderContext';
import { EN_LOCALE } from '@constants';

const Select = dynamic(() => import('@components/ui/Select'));

const Language = () => {
    const { langList } = useContext(HeaderContext);
    const router = useRouter();

    const changeLangHandler = useCallback(
        value => {
            const url = value === EN_LOCALE ? '/' : `/${value}`;

            router.replace(url, url, { locale: value });
        },
        [router]
    );

    return (
        <Select
            isSearchable={false}
            id="langSelect"
            instanceId="langSelect"
            options={langList}
            onChange={changeLangHandler}
            selectedOptionIndex={langList.findIndex(langItem => langItem.value === router.locale)}
        />
    );
};

export default memo(Language);
