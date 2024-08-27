import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageAccounts = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/accounts') // Adjust this endpoint as necessary
            .then(response => setAccounts(response.data))
            .catch(error => console.error('Error fetching accounts:', error));
    }, []);

    const handleReactivate = (id) => {
        axios.put(`http://localhost:8081/api/accounts/${id}`)
            .then(() => {
                setAccounts(accounts.map(account => 
                    account.account_number === id ? { ...account, active: true } : account
                ));
            })
            .catch(error => console.error('Error reactivating account:', error));
    };

    return (
        <div>
            <h2>Manage Accounts</h2>
            <ul>
                {accounts.map(account => (
                    <li key={account.account_number}>
                        Account Number: {account.account_number} - Balance: {account.balance} - Active: {account.active ? 'Yes' : 'No'}
                        {!account.active && <button onClick={() => handleReactivate(account.account_number)}>Reactivate</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageAccounts;
