import { create } from 'zustand';

interface CommandStore {
    isOpen: boolean;
    query: string;
    toggle: () => void;
    open: () => void;
    close: () => void;
    setQuery: (query: string) => void;
}

export const useCommandStore = create<CommandStore>((set) => ({
    isOpen: false,
    query: '',
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false, query: '' }),
    setQuery: (query) => set({ query }),
}));
