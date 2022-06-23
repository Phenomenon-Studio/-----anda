import { useState, useEffect } from 'react';

export const useScroll = () => {
    const [pos, setPos] = useState({
        y: 0,
        x: 0,
    });

    useEffect(() => {
        const scrollHandler = () => {
            setPos(prevState => ({
                ...prevState,
                y: window.pageYOffset,
                x: window.pageXOffset,
            }));
        };

        window.addEventListener('scroll', scrollHandler, {
            passive: true,
        });

        return () => {
            window.removeEventListener('scroll', scrollHandler, {
                passive: true,
            });
        };
    }, []);

    return pos;
};
