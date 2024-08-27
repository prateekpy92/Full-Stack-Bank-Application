import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

import { toast } from 'react-toastify'; // Import toast for notifications

const AccountOverview = () => {
    const [account, setAccount] = useState({});
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login if no token is found
        if (!token) {
            toast.error('No authentication token found. Redirecting to login page.');
            navigate('/login');
            return;
        }

        const fetchAccountDetails = async () => {
            try {
                const response = await axios.get('/api/account-details', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAccount(response.data);
            } catch (err) {
                console.error('Error fetching account details:', err.response || err.message);
                setError('Failed to fetch account details: ' + (err.response ? err.response.data.message : err.message));
            }
        };

        fetchAccountDetails();
    }, [token, navigate]);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Account Overview</h2>
            {error && <p className="error-message">{error}</p>}
            
            <div className="row">
                <div className="col-md-12 mb-3">
                    <button
                        className="btn btn-secondary btn-block"
                        onClick={() => navigate('/dashboard')}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>

            <h3 className="text-center mt-5">Account Details</h3>
            <div className="account-details">
                <p><strong>Account Number:</strong> {account.accountNumber}</p>
                <p><strong>Account Holder:</strong> {account.accountHolder}</p>
                <p><strong>Balance:</strong> ${account.balance?.toFixed(2)}</p>
            </div>

            <h3 className="text-center mt-5">Recent Transactions</h3>
            <ul className="list-group">
                {account.transactions?.map((transaction, index) => (
                    <li key={index} className="list-group-item">
                        <p><strong>Description:</strong> {transaction.description}</p>
                        <p><strong>Amount:</strong> ${transaction.amount.toFixed(2)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AccountOverview;
