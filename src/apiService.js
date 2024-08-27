import axios from 'axios';

// Set base URL for axios
const API_URL = 'http://localhost:8081/api';

// Get the auth token from local storage
const getAuthToken = () => localStorage.getItem('authToken');

// Helper function to create headers with Authorization
const getHeaders = () => {
    const token = getAuthToken();
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

// Get customer by token
export const getCustomerByToken = async () => {
    const response = await axios.get(`${API_URL}/myprofile`, { headers: getHeaders() });
    return response.data;
};

// Get all customers
export const getAllCustomers = async () => {
    const response = await axios.get(`${API_URL}/customers`, { headers: getHeaders() });
    return response.data;
};

// Get total balance of a customer
export const getTotalBalance = async (customerId) => {
    const response = await axios.get(`${API_URL}/customers/${customerId}/balance`, { headers: getHeaders() });
    return response.data;
};

// Get customer by ID
export const getCustomerById = async (customerId) => {
    const response = await axios.get(`${API_URL}/customers/${customerId}`, { headers: getHeaders() });
    return response.data;
};

// Get all accounts of a customer
export const getAllAccountsByCustomer = async (customerId) => {
    const response = await axios.get(`${API_URL}/customers/${customerId}/accounts`, { headers: getHeaders() });
    return response.data;
};

// Get all accounts
export const getAllAccounts = async () => {
    const response = await axios.get(`${API_URL}/accounts`, { headers: getHeaders() });
    return response.data;
};

// Add an account
export const createAccountForCustomer = async (accountRequest) => {
    const response = await axios.post(`${API_URL}/accounts`, accountRequest, { headers: getHeaders() });
    return response.data;
};

// Get account by ID
export const getAccountById = async (accountId) => {
    const response = await axios.get(`${API_URL}/accounts/${accountId}`, { headers: getHeaders() });
    return response.data;
};

// Get balance of an account
export const getBalance = async (accountId) => {
    const response = await axios.get(`${API_URL}/accounts/${accountId}/balance`, { headers: getHeaders() });
    return response.data;
};

// Delete an account
export const deleteAccount = async (accountId) => {
    const response = await axios.delete(`${API_URL}/accounts/${accountId}`, { headers: getHeaders() });
    return response.data;
};

// Get all transactions of an account
export const getTransactionsOfAccount = async (accountId) => {
    const response = await axios.get(`${API_URL}/accounts/${accountId}/transactions`, { headers: getHeaders() });
    return response.data;
};

// Reactivate account
export const reActivateAccount = async (accountId) => {
    const response = await axios.put(`${API_URL}/accounts/${accountId}`, {}, { headers: getHeaders() });
    return response.data;
};

// Get transaction by ID
export const getTransactionById = async (transactionId) => {
    const response = await axios.get(`${API_URL}/transactions/${transactionId}`, { headers: getHeaders() });
    return response.data;
};

// Get my balance
export const getMyBalance = async () => {
    const response = await axios.get(`${API_URL}/mybalance`, { headers: getHeaders() });
    return response.data;
};

// Get my account balance
export const getMyAccountBalance = async (accountId) => {
    const response = await axios.get(`${API_URL}/myaccounts/${accountId}/balance`, { headers: getHeaders() });
    return response.data;
};

// Partial update customer
export const updateCustomer = async (customerId, customerUpdateRequest) => {
    const response = await axios.put(`${API_URL}/customers/${customerId}`, customerUpdateRequest, { headers: getHeaders() });
    return response.data;
};

// Deactivate customer
export const deactivateCustomer = async (customerId) => {
    const response = await axios.put(`${API_URL}/customers/${customerId}/deactivate`, {}, { headers: getHeaders() });
    return response.data;
};

// Reactivate customer
export const reactivateCustomer = async (customerId) => {
    const response = await axios.put(`${API_URL}/customers/${customerId}/reactivate`, {}, { headers: getHeaders() });
    return response.data;
};
