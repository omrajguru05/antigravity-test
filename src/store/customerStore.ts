import { create } from 'zustand';
import { apiClient } from '../utils/api';

export interface TimelineEvent {
    id: string;
    type: 'meeting' | 'email' | 'call';
    title: string;
    date: string;
    notes: string;
}

export interface Customer {
    id: string;
    name: string;
    contact: string;
    email: string;
    status: string;
    ltv: string;
    segment: string;
    avatar: string;
    timeline: TimelineEvent[];
}

interface CustomerState {
    customers: Customer[];
    activeCustomerId: string;
    isLoading: boolean;
    loadCustomers: () => Promise<void>;
    setActiveCustomer: (id: string) => void;
    nextCustomer: () => void;
    prevCustomer: () => void;
    updateCustomer: (id: string, updates: Partial<Customer>) => Promise<void>;
}

export const useCustomerStore = create<CustomerState>()((set, get) => ({
    customers: [],
    activeCustomerId: '',
    isLoading: false,

    loadCustomers: async () => {
        try {
            set({ isLoading: true });
            const customers = await apiClient.get<Customer[]>('/customers');
            set({
                customers,
                activeCustomerId: customers[0]?.id || '',
                isLoading: false
            });
        } catch (error) {
            console.error('Failed to load customers:', error);
            set({ isLoading: false });
        }
    },

    setActiveCustomer: (id) => set({ activeCustomerId: id }),

    nextCustomer: () => set((state) => {
        const currentIndex = state.customers.findIndex(c => c.id === state.activeCustomerId);
        const nextIndex = (currentIndex + 1) % state.customers.length;
        return { activeCustomerId: state.customers[nextIndex].id };
    }),

    prevCustomer: () => set((state) => {
        const currentIndex = state.customers.findIndex(c => c.id === state.activeCustomerId);
        const prevIndex = (currentIndex - 1 + state.customers.length) % state.customers.length;
        return { activeCustomerId: state.customers[prevIndex].id };
    }),

    updateCustomer: async (id, updates) => {
        const state = get();
        const updatedCustomers = state.customers.map(c =>
            c.id === id ? { ...c, ...updates } : c
        );

        set({ customers: updatedCustomers });

        // Persist to backend
        try {
            await apiClient.put(`/customers/${id}`, updates);
        } catch (error) {
            console.error('Failed to update customer:', error);
            await get().loadCustomers();
        }
    },
}));
