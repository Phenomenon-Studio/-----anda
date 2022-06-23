import { useState, useCallback } from 'react';

export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = useCallback(
        value => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;

                setStoredValue(valueToStore);

                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
            }
        },
        [key, storedValue]
    );

    const removeKey = useCallback(() => {
        try {
            setStoredValue(undefined);

            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key);
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    }, [key]);

    return [storedValue, setValue, removeKey];
};
