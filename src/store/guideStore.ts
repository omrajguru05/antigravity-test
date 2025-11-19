import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GuideStep {
    target: string; // CSS selector
    content: string;
    title: string;
    position: 'top' | 'bottom' | 'left' | 'right';
}

export interface Guide {
    id: string;
    steps: GuideStep[];
}

interface GuideState {
    activeGuide: string | null;
    currentStep: number;
    completedGuides: string[];
    startGuide: (guideId: string) => void;
    nextStep: () => void;
    prevStep: () => void;
    skipGuide: () => void;
    completeGuide: () => void;
    isGuideCompleted: (guideId: string) => boolean;
}

export const useGuideStore = create<GuideState>()(
    persist(
        (set, get) => ({
            activeGuide: null,
            currentStep: 0,
            completedGuides: [],

            startGuide: (guideId: string) => {
                set({ activeGuide: guideId, currentStep: 0 });
            },

            nextStep: () => {
                set(state => ({ currentStep: state.currentStep + 1 }));
            },

            prevStep: () => {
                set(state => ({
                    currentStep: Math.max(0, state.currentStep - 1)
                }));
            },

            skipGuide: () => {
                set({ activeGuide: null, currentStep: 0 });
            },

            completeGuide: () => {
                const { activeGuide, completedGuides } = get();

                if (activeGuide && !completedGuides.includes(activeGuide)) {
                    set({
                        completedGuides: [...completedGuides, activeGuide],
                        activeGuide: null,
                        currentStep: 0
                    });
                } else {
                    set({ activeGuide: null, currentStep: 0 });
                }
            },

            isGuideCompleted: (guideId: string) => {
                const { completedGuides } = get();
                return completedGuides.includes(guideId);
            }
        }),
        {
            name: 'helix-guide-storage',
        }
    )
);
