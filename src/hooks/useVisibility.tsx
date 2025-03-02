import { useEffect, useState, RefObject } from "react";

const useVisibility = (ref: RefObject<HTMLElement>, rootMargin: string = "0px"): boolean => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, rootMargin]);

    return isVisible;
};

export default useVisibility;