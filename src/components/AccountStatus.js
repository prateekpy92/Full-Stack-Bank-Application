import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AccountStatus = () => {
    const [accountId, setAccountId] = useState('');
    const [accountStatus, setAccountStatus] = useState(null); // `null` means status is not fetched yet
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('token');

    const fetchAccountStatus = async () => {
        if (!token) {
            setError('No authentication token found.');
            return;
        }

        if (!accountId) {
            setError('Please enter an Account ID.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8081/api/accounts/${accountId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAccountStatus(response.data.active); // Update the status
            setError('');
        } catch (err) {
            setError('Failed to fetch account status: ' + (err.response ? err.response.data.message : err.message));
            setAccountStatus(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (status) => {
        if (!token) {
            setError('No authentication token found.');
            return;
        }

        try {
            await axios.patch(`http://localhost:8081/api/accounts/${accountId}`, { active: status }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAccountStatus(status);
            toast.success(`Account ${status ? 'activated' : 'deactivated'} successfully.`);
        } catch (err) {
            setError(`Failed to ${status ? 'activate' : 'deactivate'} account: ` + (err.response ? err.response.data.message : err.message));
        }
    };

    return (
        <div className="container mt-5">
            <h2>Manage Account Status</h2>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Enter Account ID"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    className="form-control"
                />
                <button
                    className="btn btn-primary mt-3"
                    onClick={fetchAccountStatus}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Check Status'}
                </button>
            </div>
            {accountStatus === null ? (
                <p>Enter an Account ID and click "Check Status" to see the account's current status.</p>
            ) : (
                <div className="mt-3">
                    {accountStatus ? (
                        <button onClick={() => handleStatusChange(false)} className="btn btn-danger">
                            Deactivate Account
                        </button>
                    ) : (
                        <button onClick={() => handleStatusChange(true)} className="btn btn-success">
                            Activate Account
                        </button>
                    )}
                </div>
            )}
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default AccountStatus;
