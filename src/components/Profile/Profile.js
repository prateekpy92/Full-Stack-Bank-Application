import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) {
                setError('No authentication token found.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8081/api/myprofile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Profile Response:', response.data); // Debugging output
                setProfile(response.data);
            } catch (err) {
                console.error('Error fetching profile:', err.response ? err.response.data : err.message);
                setError('Failed to fetch profile.');
            }
        };

        fetchProfile();
    }, [token]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!profile) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Profile Page</h2>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            {/* Add more profile details as needed */}
        </div>
    );
};

export default ProfilePage;
