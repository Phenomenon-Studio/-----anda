import { useState, useEffect, useRef } from 'react';
import { useInViewport, useMediaQuery } from '@hooks';
import { asyncEach } from '@utils';

export const useRoadMap = (srcList, imgWrapRef) => {
    const canStopEvents = useMediaQuery('(max-width: 767px)');
    const { isInViewport, destroyObserver } = useInViewport(imgWrapRef);
    const [activeIndex, setActiveIndex] = useState(0);
    const oldIdRef = useRef();

    useEffect(() => {
        const elSet = new Set();
        const foundElements = srcList.reduce((acc, cur) => {
            acc.push(document.getElementById(cur));

            return acc;
        }, []);
        const scrollHandler = () => {
            const imgWrapRect = imgWrapRef.current.getBoundingClientRect();

            asyncEach(foundElements, ($el, i, list) => {
                const elRect = $el.getBoundingClientRect();

                if (imgWrapRect.bottom < elRect.top) {
                    return;
                }

                const prevElId = i > 0 ? list[i - 1].id : null;

                if (elSet.has(prevElId)) {
                    elSet.delete(prevElId);
                }

                elSet.add($el.id);
            });

            if (elSet.size > 1) {
                [...elSet].forEach((item, i, list) => {
                    if (i === list[list.length - 1]) {
                        return;
                    }

                    elSet.delete(item);
                });
            }

            const id = [...elSet][0];

            if (id && id !== oldIdRef.current) {
                oldIdRef.current = id;

                setActiveIndex(srcList.findIndex(src => src === id));
            }
        };
        const destroyScroll = () => {
            window.removeEventListener('scroll', scrollHandler, {
                passive: true,
            });
        };

        if (canStopEvents) {
            return () => {
                destroyObserver();
                destroyScroll();
            };
        }

        if (!isInViewport) {
            return destroyScroll();
        }

        window.addEventListener('scroll', scrollHandler, {
            passive: true,
        });

        return () => {
            destroyScroll();
        };
    }, [canStopEvents, destroyObserver, imgWrapRef, isInViewport, srcList]);

    return activeIndex;
};
