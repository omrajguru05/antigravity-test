import React, { useEffect, useState, useRef } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { type GuideStep } from '../../store/guideStore';

interface GuideTooltipProps {
    step: GuideStep;
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onPrev: () => void;
    onSkip: () => void;
}

const GuideTooltip: React.FC<GuideTooltipProps> = ({
    step,
    currentStep,
    totalSteps,
    onNext,
    onPrev,
    onSkip
}) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const targetElement = document.querySelector(step.target);
        if (targetElement && tooltipRef.current) {
            const targetRect = targetElement.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            let top = 0;
            let left = 0;

            switch (step.position) {
                case 'top':
                    top = targetRect.top - tooltipRect.height - 16;
                    left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
                    break;
                case 'bottom':
                    top = targetRect.bottom + 16;
                    left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
                    break;
                case 'left':
                    top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
                    left = targetRect.left - tooltipRect.width - 16;
                    break;
                case 'right':
                    top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
                    left = targetRect.right + 16;
                    break;
            }

            setPosition({ top, left });

            // Highlight target element
            targetElement.classList.add('guide-highlight');
            return () => {
                targetElement.classList.remove('guide-highlight');
            };
        }
    }, [step]);

    return (
        <>
            {/* Overlay */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    zIndex: 999,
                    backdropFilter: 'blur(2px)'
                }}
                onClick={onSkip}
            />

            {/* Tooltip */}
            <div
                ref={tooltipRef}
                className="glass-card-elevated animate-scale-in"
                style={{
                    position: 'fixed',
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    zIndex: 1000,
                    maxWidth: '350px',
                    padding: 'var(--space-6)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--space-3)' }}>
                    <div>
                        <h4 className="text-h4">{step.title}</h4>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-1)' }}>
                            Step {currentStep + 1} of {totalSteps}
                        </p>
                    </div>
                    <button
                        onClick={onSkip}
                        className="btn btn-ghost"
                        style={{ padding: 'var(--space-1)' }}
                    >
                        <X size={16} />
                    </button>
                </div>

                <p className="text-sm" style={{ marginBottom: 'var(--space-4)' }}>
                    {step.content}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
                    <button
                        onClick={onPrev}
                        className="btn btn-ghost"
                        disabled={currentStep === 0}
                        style={{ opacity: currentStep === 0 ? 0.5 : 1, fontSize: '14px' }}
                    >
                        <ArrowLeft size={16} style={{ marginRight: 'var(--space-1)' }} />
                        Back
                    </button>

                    <button
                        onClick={onNext}
                        className="btn btn-primary"
                        style={{ fontSize: '14px' }}
                    >
                        {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
                        <ArrowRight size={16} style={{ marginLeft: 'var(--space-1)' }} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default GuideTooltip;
