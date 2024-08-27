import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageCustomers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    const handleDeactivate = (id) => {
        axios.put(`http://localhost:8081/api/customers/${id}/deactivate`)
            .then(() => {
                setCustomers(customers.map(customer => 
                    customer.id === id ? { ...customer, active: 'false' } : customer
                ));
            })
            .catch(error => console.error('Error deactivating customer:', error));
    };

    const handleReactivate = (id) => {
        axios.put(`http://localhost:8081/api/customers/${id}/reactivate`)
            .then(() => {
                setCustomers(customers.map(customer => 
                    customer.id === id ? { ...customer, active: 'true' } : customer
                ));
            })
            .catch(error => console.error('Error reactivating customer:', error));
    };

    return (
        <div>
            <h2>Manage Customers</h2>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>
                        {customer.firstname} {customer.lastname} - {customer.email} - {customer.active}
                        <button onClick={() => handleDeactivate(customer.id)}>Deactivate</button>
                        <button onClick={() => handleReactivate(customer.id)}>Reactivate</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageCustomers;
