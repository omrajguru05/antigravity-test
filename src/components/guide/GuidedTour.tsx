import React, { useEffect } from 'react';
import GuideTooltip from './GuideTooltip';
import { useGuideStore } from '../../store/guideStore';
import { todayGuide, customersGuide, workGuide, systemsGuide } from '../../config/guides';

const guides = {
    today: todayGuide,
    customers: customersGuide,
    work: workGuide,
    systems: systemsGuide
};

const GuidedTour: React.FC = () => {
    const { activeGuide, currentStep, nextStep, prevStep, completeGuide } = useGuideStore();

    const guide = activeGuide ? guides[activeGuide as keyof typeof guides] : null;

    useEffect(() => {
        if (guide && currentStep >= guide.steps.length) {
            completeGuide();
        }
    }, [currentStep, guide, completeGuide]);

    if (!guide || currentStep >= guide.steps.length) {
        return null;
    }

    const handleNext = () => {
        if (currentStep < guide.steps.length - 1) {
            nextStep();
        } else {
            completeGuide();
        }
    };

    return (
        <GuideTooltip
            step={guide.steps[currentStep]}
            currentStep={currentStep}
            totalSteps={guide.steps.length}
            onNext={handleNext}
            onPrev={prevStep}
            onSkip={completeGuide}
        />
    );
};

export default GuidedTour;
