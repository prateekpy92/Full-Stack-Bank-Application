import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

import { toast } from 'react-toastify'; // Import toast for notifications
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const CustomerDashboard = () => {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState('');
    const [customer, setCustomer] = useState({});
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login if no token is found
        if (!token) {
            toast.error('No authentication token found. Redirecting to login page.');
            navigate('/login');
            return;
        }

        const fetchAccounts = async () => {
            try {
                const response = await axios.get('/api/myaccounts', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAccounts(response.data);
            } catch (err) {
                console.error('Error fetching accounts:', err.response || err.message);
                setError('Failed to fetch accounts: ' + (err.response ? err.response.data.message : err.message));
            }
        };

        const fetchCustomer = async () => {
            try {
                const response = await axios.get('/api/myprofile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCustomer(response.data);
            } catch (err) {
                console.error('Error fetching customer:', err.response || err.message);
                setError('Failed to fetch customer details: ' + (err.response ? err.response.data.message : err.message));
            }
        };

        fetchAccounts();
        fetchCustomer();
    }, [token, navigate]);

    const handleLogout = () => {
        // Clear authentication token
        localStorage.removeItem('token');
        // Show a toast message indicating successful logout
        toast.success('You have been logged out.');
        // Redirect to login page
        navigate('/login');
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Customer Dashboard</h2>
            {error && <p className="error-message">{error}</p>}

            <div className="row">

            <div className="col-md-6 mb-3">
                    <button
                        className="btn btn-warning btn-block"
                        onClick={() => navigate('/account-overview')}
                    >
                        View Account Overview
                    </button>
                </div>
                <div className="col-md-6 mb-3">
                    <button
                        className="btn btn-primary btn-block"
                        onClick={() => navigate('/myprofile')}
                    >
                        View My Profile
                    </button>
                </div>

                <div className="col-md-6 mb-3">
                    <button
                        className="btn btn-info btn-block"
                        onClick={() => navigate('/mybalance')}
                    >
                        View My Balance
                    </button>
                </div>

                <div className="col-md-6 mb-3">
                    <button
                        className="btn btn-success btn-block"
                        onClick={() => navigate('/update-profile')}
                    >
                        Update My Profile
                    </button>
                </div>

                <div className="col-md-6 mb-3">
                    <button
                        className="btn btn-danger btn-block"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

                
            </div>

            <h3 className="text-center mt-5">My Accounts</h3>
            <ul className="list-group">
                {accounts.map(account => (
                    <li key={account.id} className="list-group-item">
                        <p><strong>Account Number:</strong> {account.accountNumber}</p>
                        <p><strong>Balance:</strong> ${account.balance.toFixed(2)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerDashboard;
