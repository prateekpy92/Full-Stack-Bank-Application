import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';

const UpdateCustomerPage = () => {
    const { customerId } = useParams();
    const [customerDetails, setCustomerDetails] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await axios.get(`/api/customers/${customerId}`);
                setCustomerDetails(response.data);
            } catch (error) {
                setError('There was an error fetching the customer details!');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (customerId) {
            fetchCustomerDetails();
        }
    }, [customerId]);

    const handleDetailsChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/customers/${customerId}`, customerDetails);
            alert('Customer updated successfully!');
            navigate('/customers');
        } catch (error) {
            setError('There was an error updating the customer!');
            console.error(error);
        }
    };

    if (loading) {
        return <Spinner animation="border" />;
    }

    return (
        <Container className="mt-5">
            <h2>Update Customer</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFirstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={customerDetails.firstname}
                        onChange={handleDetailsChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formLastname" className="mt-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        value={customerDetails.lastname}
                        onChange={handleDetailsChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={customerDetails.email}
                        onChange={handleDetailsChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Update Customer
                </Button>
            </Form>
        </Container>
    );
};

export default UpdateCustomerPage;
