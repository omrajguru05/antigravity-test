import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PageType = 'today' | 'customers' | 'work' | 'systems';

interface NavigationState {
    currentPage: PageType;
    history: PageType[];
    navigate: (page: PageType) => void;
    goBack: () => void;
    canGoBack: () => boolean;
}

export const useNavigationStore = create<NavigationState>()(
    persist(
        (set, get) => ({
            currentPage: 'today',
            history: ['today'],

            navigate: (page: PageType) => {
                const { currentPage, history } = get();

                // Prevent duplicate navigation
                if (page === currentPage) return;

                // Add to history
                set({
                    currentPage: page,
                    history: [...history, page]
                });
            },

            goBack: () => {
                const { history } = get();

                if (history.length > 1) {
                    const newHistory = [...history];
                    newHistory.pop(); // Remove current
                    const previousPage = newHistory[newHistory.length - 1];

                    set({
                        currentPage: previousPage,
                        history: newHistory
                    });
                }
            },

            canGoBack: () => {
                const { history } = get();
                return history.length > 1;
            }
        }),
        {
            name: 'helix-navigation-storage',
        }
    )
);
