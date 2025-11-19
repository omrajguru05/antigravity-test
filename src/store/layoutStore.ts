import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LayoutState {
    showInsightRibbon: boolean;
    showRightRail: boolean;
    toggleInsightRibbon: () => void;
    toggleRightRail: () => void;
}

export const useLayoutStore = create<LayoutState>()(
    persist(
        (set) => ({
            showInsightRibbon: true,
            showRightRail: false, // Default to hidden as it's a placeholder
            toggleInsightRibbon: () => set((state) => ({ showInsightRibbon: !state.showInsightRibbon })),
            toggleRightRail: () => set((state) => ({ showRightRail: !state.showRightRail })),
        }),
        {
            name: 'helix-layout-storage',
        }
    )
);
