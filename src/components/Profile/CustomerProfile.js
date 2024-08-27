import React, { useEffect, useState } from 'react';
import { getCustomerByToken, getMyBalance } from '../apiService';

const CustomerProfile = () => {
    const [profile, setProfile] = useState(null);
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getCustomerByToken();
                setProfile(profileData);
                
                const balanceData = await getMyBalance();
                setBalance(balanceData);
            } catch (err) {
                setError('Failed to fetch profile or balance');
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h2>Customer Profile</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {profile && (
                <div>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                </div>
            )}
            {balance !== null && <p>Balance: {balance}</p>}
        </div>
    );
};

export default CustomerProfile;
