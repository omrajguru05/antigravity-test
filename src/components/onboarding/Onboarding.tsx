import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import OnboardingStep from './OnboardingStep';
import PhotoUpload from './PhotoUpload';
import { useUserStore } from '../../store/userStore';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

const Onboarding: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        photo: null as File | null,
    });
    const { setUser } = useUserStore();

    const validateStep = () => {
        switch (currentStep) {
            case 1:
                return formData.photo !== null;
            case 2:
                return formData.name.trim().length > 0 && formData.username.trim().length > 0;
            case 3:
                return formData.email.trim().length > 0 && formData.email.includes('@');
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (validateStep() && currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = () => {
        const userId = uuidv4();
        setUser({
            id: userId,
            name: formData.name,
            username: formData.username,
            email: formData.email,
        });

        // Upload photo if present
        if (formData.photo) {
            useUserStore.getState().uploadPhoto(formData.photo);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <OnboardingStep
                        title="Welcome to HelixDesk"
                        description="Your premium workspace management platform. Let's  get you set up in just a few steps."
                    >
                        <Sparkles size={64} style={{ color: 'var(--color-primary)', marginTop: 'var(--space-6)' }} />
                    </OnboardingStep>
                );

            case 1:
                return (
                    <OnboardingStep
                        title="Add Your Profile Photo"
                        description="Upload a photo to personalize your workspace."
                    >
                        <PhotoUpload
                            onPhotoSelect={(file) => setFormData({ ...formData, photo: file })}
                            currentPhoto={formData.photo ? URL.createObjectURL(formData.photo) : undefined}
                        />
                    </OnboardingStep>
                );

            case 2:
                return (
                    <OnboardingStep
                        title="Tell Us About Yourself"
                        description="What should we call you?"
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: '100%', maxWidth: '400px' }}>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="input"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{
                                    padding: 'var(--space-4)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid var(--color-border)',
                                    background: 'var(--color-bg-surface)',
                                    fontSize: '16px'
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                className="input"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                style={{
                                    padding: 'var(--space-4)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid var(--color-border)',
                                    background: 'var(--color-bg-surface)',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                    </OnboardingStep>
                );

            case 3:
                return (
                    <OnboardingStep
                        title="Add Your Email"
                        description="We'll send you updates and notifications here."
                    >
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="input"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            style={{
                                padding: 'var(--space-4)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--color-border)',
                                background: 'var(--color-bg-surface)',
                                fontSize: '16px',
                                width: '100%',
                                maxWidth: '400px'
                            }}
                        />
                    </OnboardingStep>
                );

            case 4:
                return (
                    <OnboardingStep
                        title="All Set!"
                        description="Your workspace is ready. Let's dive in!"
                    >
                        <div className="glass-card" style={{
                            padding: 'var(--space-6)',
                            textAlign: 'center',
                            marginTop: 'var(--space-6)'
                        }}>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                Welcome, {formData.name}!
                            </p>
                        </div>
                    </OnboardingStep>
                );

            default:
                return null;
        }
    };

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background with gradient */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, #111 0%, #000 100%)',
                zIndex: -1
            }} />

            {/* Main onboarding card */}
            <div className="glass-card-elevated" style={{
                width: '90%',
                maxWidth: '600px',
                padding: 'var(--space-10)',
                minHeight: '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                {/* Progress indicator */}
                <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-8)' }}>
                    {[0, 1, 2, 3, 4].map((step) => (
                        <div
                            key={step}
                            style={{
                                flex: 1,
                                height: '4px',
                                borderRadius: 'var(--radius-full)',
                                background: step <= currentStep ? 'var(--color-primary)' : 'var(--color-border)',
                                transition: 'all var(--transition-fast)'
                            }}
                        />
                    ))}
                </div>

                {/* Step content */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {renderStep()}
                </div>

                {/* Navigation buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-8)' }}>
                    <button
                        onClick={handleBack}
                        className="btn btn-ghost"
                        disabled={currentStep === 0}
                        style={{
                            padding: 'var(--space-3) var(--space-6)',
                            opacity: currentStep === 0 ? 0.5 : 1
                        }}
                    >
                        <ArrowLeft size={20} style={{ marginRight: 'var(--space-2)' }} />
                        Back
                    </button>

                    <button
                        onClick={currentStep === 4 ? handleComplete : handleNext}
                        className="btn btn-primary"
                        disabled={!validateStep()}
                        style={{
                            padding: 'var(--space-3) var(--space-6)',
                            opacity: validateStep() ? 1 : 0.5
                        }}
                    >
                        {currentStep === 4 ? 'Get Started' : 'Continue'}
                        <ArrowRight size={20} style={{ marginLeft: 'var(--space-2)' }} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
