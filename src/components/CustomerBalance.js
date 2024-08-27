import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerBalance = () => {
    const [customerId, setCustomerId] = useState('');
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState('');
    
    const token = localStorage.getItem('token'); // Fetch token once at the top
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const fetchBalance = async (id) => {
        if (!token) {
            setError('No authentication token found.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8081/api/customers/${id}/balance`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBalance(response.data); // Set the fetched balance
        } catch (err) {
            setError('Failed to fetch balance: ' + (err.response ? err.response.data.message : err.message));
        }
    };

    const handleBalanceFetch = () => {
        fetchBalance(customerId);
    };

    const handleBack = () => {
        navigate('/admin-dashboard'); // Navigate back to the dashboard
    };

    return (
        <div className="container">
            <h1>View Customer Balance</h1>
            <button onClick={handleBack} className="btn btn-secondary mb-3">Back to Dashboard</button>
            {error && <p className="text-danger">{error}</p>}
            
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Enter customer ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="form-control"
                />
                <button onClick={handleBalanceFetch} className="btn btn-primary mt-2">Get Balance</button>
            </div>

            {balance !== null && (
                <p><strong>Customer Balance:</strong> ${balance?.toFixed(2) || '0.00'}</p>
            )}
        </div>
    );
};

export default CustomerBalance;
