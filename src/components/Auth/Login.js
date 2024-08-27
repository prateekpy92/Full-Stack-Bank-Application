import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode
import { Container, Form, Button, Alert } from 'react-bootstrap'; // Import Bootstrap components

const Login = () => {
    const [usernameOrEmail, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); // No default role
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(usernameOrEmail);
        console.log(password);
        console.log(role);

        try {
            // Check if a role is selected
            if (!role) {
                setError('Please select a role.');
                return;
            }

            const response = await axios.post('http://localhost:8081/api/auth/login', {
                usernameOrEmail,
                password,
                role // Pass the role in the request
            });

            const token = response.data['accessToken'];

            if (token) {
                localStorage.setItem('token', token);

                const decodedToken = jwtDecode(token);
                const userRole = decodedToken.roles;

                // Check if the user role matches the selected role
                if (userRole === `ROLE_${role.toUpperCase()}`) {
                    if (role === 'ADMIN') {
                        navigate('/admin-dashboard');
                    } else if (role === 'USER') {
                        navigate('/customer-dashboard');
                    } else {
                        setError('Unrecognized role');
                    }
                } else {
                    setError('Role mismatch or unrecognized role');
                }
            } else {
                setError('Token is undefined. Please check the login process.');
            }
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <Container className="login-container" style={{ maxWidth: '400px', marginTop: '50px' }}>
            <h2 className="mb-4">Login</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="username">Username:</Form.Label>
                    <Form.Control
                        type="text"
                        id="username"
                        value={usernameOrEmail}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">Password:</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Role:</Form.Label>
                    <Form.Select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="">Select role</option>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </Form.Select>
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button type="submit" variant="primary">Login</Button>
            </Form>
        </Container>
    );
};

export default Login;
