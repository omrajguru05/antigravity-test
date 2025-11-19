import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface PageTransitionProps {
    children: React.ReactNode;
    key?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, key }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 10, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
        );
    }, { scope: containerRef, dependencies: [key] });

    return (
        <div ref={containerRef} style={{ height: '100%', width: '100%' }}>
            {children}
        </div>
    );
};

export default PageTransition;
