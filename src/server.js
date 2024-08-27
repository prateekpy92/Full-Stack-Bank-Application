const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 8081;

// Middleware to handle JSON requests and enable CORS
app.use(express.json());
app.use(cors());

const SPRING_BOOT_AUTH_URL = 'http://localhost:8081/api/auth/login'; // Update with your Spring Boot URL

app.post('/api/auth/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        // Forward the login request to the Spring Boot application
        const response = await axios.post(SPRING_BOOT_AUTH_URL, { usernameOrEmail, password });
        
        // Extract the token and other information from the response
        const { data } = response;
        const { token, role } = data;

        // Forward the token and other details to the client
        res.status(200).send({ token, role });
    } catch (error) {
        if (error.response) {
            // Forward specific error from Spring Boot to client
            res.status(error.response.status).send({ error: error.response.data.error || 'Server error' });
        } else {
            // Handle other errors
            res.status(500).send({ error: 'Server error' });
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
