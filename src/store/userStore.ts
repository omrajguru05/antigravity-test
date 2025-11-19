import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '../utils/api';

export interface UserProfile {
    id: string;
    name: string;
    username: string;
    email: string;
    photo?: string;
}

interface UserState {
    user: UserProfile | null;
    isOnboarded: boolean;
    isLoading: boolean;
    setUser: (user: UserProfile) => void;
    completeOnboarding: () => void;
    updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
    uploadPhoto: (file: File) => Promise<void>;
    logout: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            isOnboarded: false,
            isLoading: false,

            setUser: (user: UserProfile) => {
                set({ user, isOnboarded: true });
            },

            completeOnboarding: () => {
                set({ isOnboarded: true });
            },

            updateProfile: async (updates: Partial<UserProfile>) => {
                const { user } = get();
                if (!user) return;

                const updatedUser = { ...user, ...updates };
                set({ user: updatedUser });

                try {
                    await apiClient.put(`/users/${user.id}`, updates);
                } catch (error) {
                    console.error('Failed to update profile:', error);
                    // Revert on error
                    set({ user });
                }
            },

            uploadPhoto: async (file: File) => {
                const { user } = get();
                if (!user) return;

                set({ isLoading: true });

                try {
                    const formData = new FormData();
                    formData.append('photo', file);

                    const response = await fetch(`/api/users/${user.id}/photo`, {
                        method: 'POST',
                        body: formData,
                    });

                    const data = await response.json();

                    set({
                        user: { ...user, photo: data.photoUrl },
                        isLoading: false
                    });
                } catch (error) {
                    console.error('Failed to upload photo:', error);
                    set({ isLoading: false });
                }
            },

            logout: () => {
                set({ user: null, isOnboarded: false });
            }
        }),
        {
            name: 'helix-user-storage',
        }
    )
);
