


import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { useProfile } from '../context/ProfileContext';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/components.css';
import '../styles/profile.css';
import Navbar from '../components/Navbar.jsx';

export function Profile() {
    const { profile, loading, updateProfile, updatePreferences } = useProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    if (loading) return (
        <div className="profile-page">
            <PageHeader title="Profile" subtitle="Loading your profile..." />
            <div className="loading-container">
                <LoadingSpinner />
            </div>

        </div>
    );

    const handleEditToggle = () => {
        if (isEditing) {
            // Save changes
            updateProfile(formData);
            setIsEditing(false);
        } else {
            // Start editing - populate form with current data
            setFormData({
                name: profile.name,
                email: profile.email,
                avatar: profile.avatar || ''
            });
            setIsEditing(true);
        }
    };

    const handlePreferenceChange = (key) => {
        updatePreferences({
            [key]: !profile.preferences[key]
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    avatar: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
        <Navbar />
        <div className="profile-page" style={{ marginTop: 100 }}>
            <PageHeader title="Profile" subtitle="Manage your account and preferences"/>

            <main className="profile-content">
                <section className="profile-card">
                    <div className="avatar-container">
                        <img 
                            src={isEditing ? formData.avatar || '/placeholder-avatar.png' : profile.avatar || '/placeholder-avatar.png'} 
                            alt={profile.name} 
                            className="avatar" 
                        />
                        {isEditing && (
                            <div className="avatar-upload">
                                <label className="btn secondary">
                                    Change Photo
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleAvatarChange} 
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="profile-info">
                        {isEditing ? (
                            <div className="profile-form">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <h2>{profile.name}</h2>
                                <p className="email">{profile.email}</p>
                            </>
                        )}
                        <div className="form-actions">
                            <button className="btn primary" onClick={handleEditToggle}>
                                {isEditing ? 'Save Changes' : 'Edit Profile'}
                            </button>
                            {isEditing && (
                                <button 
                                    className="btn secondary" 
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                <section className="preferences-card">
                    <h3>Preferences</h3>
                    <div className="preferences-grid">
                        <div className="preference-item">
                            <label className="toggle-label">
                                <input
                                    type="checkbox"
                                    checked={profile.preferences.theme === 'dark'}
                                    onChange={() => updatePreferences({
                                        theme: profile.preferences.theme === 'dark' ? 'light' : 'dark'
                                    })}
                                />
                                Dark Mode
                            </label>
                        </div>
                        <div className="preference-item">
                            <label className="toggle-label">
                                <input
                                    type="checkbox"
                                    checked={profile.preferences.emailNotifications}
                                    onChange={() => handlePreferenceChange('emailNotifications')}
                                />
                                Email Notifications
                            </label>
                        </div>
                        <div className="preference-item">
                            <label className="toggle-label">
                                <input
                                    type="checkbox"
                                    checked={profile.preferences.weeklyDigest}
                                    onChange={() => handlePreferenceChange('weeklyDigest')}
                                />
                                Weekly Digest
                            </label>
                        </div>
                    </div>
                </section>
            </main>
        </div>
        </>
    );
}

export default Profile;


