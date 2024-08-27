import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountDetails = () => {
    const [accountId, setAccountId] = useState('');
    const [account, setAccount] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchAccountDetails = async (id) => {
        if (!token) {
            setError('No authentication token found.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8081/api/accounts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAccount(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch account details: ' + (err.response ? err.response.data.message : err.message));
            setAccount(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAccountFetch = () => {
        fetchAccountDetails(accountId);
    };

    const handleBack = () => {
        navigate('/admin-dashboard');
    };

    const handleActivate = async () => {
        if (!token || !accountId) {
            setError('No authentication token or account ID found.');
            return;
        }

        try {
            await axios.put(`http://localhost:8081/api/accounts/${accountId}`, { active: true }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Refresh the account details
            fetchAccountDetails(accountId);
        } catch (err) {
            setError('Failed to activate account: ' + (err.response ? err.response.data.message : err.message));
        }
    };

    const handleDeactivate = async () => {
        if (!token || !accountId) {
            setError('No authentication token or account ID found.');
            return;
        }

        try {
            await axios.put(`http://localhost:8081/api/accounts/${accountId}`, { active: false }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Refresh the account details
            fetchAccountDetails(accountId);
        } catch (err) {
            setError('Failed to deactivate account: ' + (err.response ? err.response.data.message : err.message));
        }
    };

    return (
        <div className="container">
            <h1>View Account Details</h1>
            <button onClick={handleBack} className="btn btn-secondary mb-3">Back to Dashboard</button>
            {error && <p className="text-danger">{error}</p>}

            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Enter account ID"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    className="form-control"
                />
                <button onClick={handleAccountFetch} className="btn btn-primary mt-2" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Get Account Details'}
                </button>
            </div>

            {account && (
                <div className="table-responsive">
                    <h3>Account Details</h3>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Account Number</td>
                                <td>{account.account_number}</td>
                            </tr>
                            <tr>
                                <td>Balance</td>
                                <td>${account.balance?.toFixed(2) || '0.00'}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{account.active ? 'Active' : 'Inactive'}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div className="mt-3">
                        {account.active ? (
                            <button onClick={handleDeactivate} className="btn btn-warning">
                                Deactivate Account
                            </button>
                        ) : (
                            <button onClick={handleActivate} className="btn btn-success">
                                Activate Account
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountDetails;
