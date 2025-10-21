import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export function useProfile() {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
}

export function ProfileProvider({ children }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load profile from localStorage on mount
        const loadProfile = () => {
            try {
                const savedProfile = localStorage.getItem('rp_profile');
                if (savedProfile) {
                    setProfile(JSON.parse(savedProfile));
                } else {
                    // Set default profile if none exists
                    const defaultProfile = {
                        name: 'EMIO',
                        email: 'emio@example.com',
                        avatar: '', // URL for profile picture
                        preferences: {
                            theme: 'light',
                            emailNotifications: true,
                            weeklyDigest: true
                        }
                    };
                    setProfile(defaultProfile);
                    localStorage.setItem('rp_profile', JSON.stringify(defaultProfile));
                }
            } catch (error) {
                console.error('Error loading profile:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const updateProfile = (updates) => {
        setProfile(current => {
            const updated = { ...current, ...updates };
            localStorage.setItem('rp_profile', JSON.stringify(updated));
            return updated;
        });
    };

    const updatePreferences = (preferences) => {
        setProfile(current => {
            const updated = {
                ...current,
                preferences: { ...current.preferences, ...preferences }
            };
            localStorage.setItem('rp_profile', JSON.stringify(updated));
            return updated;
        });
    };

    const value = {
        profile,
        loading,
        updateProfile,
        updatePreferences
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
}