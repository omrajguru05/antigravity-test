import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useHoverAnimation = (
    scale: number = 1.02,
    duration: number = 0.2,
    y: number = -2
) => {
    const elementRef = useRef<HTMLDivElement | HTMLButtonElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const onMouseEnter = () => {
            gsap.to(element, {
                scale: scale,
                y: y,
                duration: duration,
                ease: 'power2.out',
                boxShadow: '0 10px 20px -10px rgba(0,0,0,0.3)'
            });
        };

        const onMouseLeave = () => {
            gsap.to(element, {
                scale: 1,
                y: 0,
                duration: duration,
                ease: 'power2.out',
                boxShadow: 'none' // Or restore original shadow if needed, but 'none' is safe for now
            });
        };

        element.addEventListener('mouseenter', onMouseEnter);
        element.addEventListener('mouseleave', onMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', onMouseEnter);
            element.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [scale, duration, y]);

    return elementRef;
};
