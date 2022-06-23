import { useState, useRef, useEffect, useCallback } from 'react';

export const useInViewport = (targetRef, rootMargin = '0px') => {
    const [isInViewport, setIsInViewport] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        if (!targetRef?.current) {
            return;
        }

        const $target = targetRef.current;
        observerRef.current = new IntersectionObserver(
            ([target]) => {
                setIsInViewport(() => target.isIntersecting);
            },
            { rootMargin }
        );

        observerRef.current.observe($target);

        return () => {
            observerRef.current?.unobserve?.($target);
            observerRef.current = null;
        };
    }, [rootMargin, targetRef]);

    const destroyObserver = useCallback(() => {
        observerRef.current?.unobserve?.(targetRef.current);
        observerRef.current = null;
    }, [targetRef]);

    return { isInViewport, destroyObserver };
};
