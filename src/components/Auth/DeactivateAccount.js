import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DeactivateAccount = () => {
    const [accountId, setAccountId] = useState('');
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');

    const handleDeactivate = async () => {
        if (!token) {
            setError('No authentication token found.');
            return;
        }

        try {
            await axios.patch(`http://localhost:8081/api/accounts/${accountId}/status`, { active: false }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Account deactivated successfully.');
        } catch (err) {
            setError('Failed to deactivate account: ' + (err.response ? err.response.data.message : err.message));
        }
    };

    return (
        <div className="container mt-5">
            <h2>Deactivate Account</h2>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Enter Account ID"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    className="form-control"
                />
            </div>
            <button onClick={handleDeactivate} className="btn btn-danger">
                Deactivate Account
            </button>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default DeactivateAccount;
