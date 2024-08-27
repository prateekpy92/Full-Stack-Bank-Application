import React, { useState } from 'react';
import { createAccountForCustomer } from '../apiService';

const CreateAccount = () => {
    const [accountRequest, setAccountRequest] = useState({ /* initial values */ });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await createAccountForCustomer(accountRequest);
            setMessage(response);
        } catch (err) {
            setError('Failed to create account');
        }
    };

    return (
        <div>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
                <button type="submit">Create</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CreateAccount;
