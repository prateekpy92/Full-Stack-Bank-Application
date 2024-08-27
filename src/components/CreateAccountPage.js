import React, { useState } from 'react';
import axios from 'axios';

const CreateAccountPage = () => {
    const [accountDetails, setAccountDetails] = useState({
        customerId: '',
        balance: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setAccountDetails({
            ...accountDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('/api/accounts', accountDetails);
            alert('Account created successfully!');
            setAccountDetails({ customerId: '', balance: '' });
        } catch (err) {
            setError('There was an error creating the account. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="number"
                        name="customerId"
                        className="form-control"
                        placeholder="Customer ID"
                        value={accountDetails.customerId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        name="balance"
                        className="form-control"
                        placeholder="Initial Balance"
                        value={accountDetails.balance}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Account'}
                </button>
            </form>
        </div>
    );
};

export default CreateAccountPage;
