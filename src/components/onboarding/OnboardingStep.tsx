import React from 'react';

interface OnboardingStepProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({ title, description, children }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.5s ease-in-out'
        }}>
            <h2 className="text-h2" style={{ marginBottom: 'var(--space-3)', textAlign: 'center' }}>
                {title}
            </h2>
            {description && (
                <p className="text-sm" style={{
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--space-6)',
                    textAlign: 'center',
                    maxWidth: '400px'
                }}>
                    {description}
                </p>
            )}
            {children}
        </div>
    );
};

export default OnboardingStep;
