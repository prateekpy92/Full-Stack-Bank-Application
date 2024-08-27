import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify';

const AccountDetailsView = () => {
    const { customerId } = useParams(); // Use 'customerId' from URL parameters
    const [accounts, setAccounts] = useState([]); // State for multiple accounts
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccountDetails = async () => {
            if (!token) {
                setError('No authentication token found.');
                return;
            }
        
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:8081/api/customers/${customerId}/accounts`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAccounts(response.data);
                setError('');
            } catch (err) {
                setError('Failed to fetch account details: ' + (err.response ? err.response.data.message : err.message));
                setAccounts([]);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchAccountDetails();
    }, [customerId, token]);

    const handleStatusChange = async (accountId, status) => {
        if (!token) {
            setError('No authentication token found.');
            return;
        }

        try {
            await axios.patch(`http://localhost:8081/api/accounts/${accountId}`, { active: status }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAccounts(prevAccounts =>
                prevAccounts.map(account =>
                    account.account_id === accountId ? { ...account, active: status } : account
                )
            );
            toast.success(`Account ${status ? 'activated' : 'deactivated'} successfully.`);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            setError('');
        } catch (err) {
            setError(`Failed to ${status ? 'activate' : 'deactivate'} account: ` + (err.response ? err.response.data.message : err.message));
        }
    };

    const handleDelete = async (accountId) => {
        if (!token) {
            setError('No authentication token found.');
            return;
        }

        if (window.confirm('Are you sure you want to delete this account?')) {
            try {
                await axios.delete(`http://localhost:8081/api/accounts/${accountId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAccounts(prevAccounts =>
                    prevAccounts.filter(account => account.account_id !== accountId)
                );
                toast.success('Account deleted successfully.');
                setError('');
            } catch (err) {
                setError('Failed to delete account: ' + (err.response ? err.response.data.message : err.message));
            }
        }
    };

    const handleBack = () => {
        navigate('/customers'); // Navigate back to the customer list
    };

    const handleDownloadPDF = async () => {
        const input = document.getElementById('account-table');
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');

        const doc = new jsPDF();
        doc.addImage(imgData, 'PNG', 10, 10);
        doc.save('account_details.pdf');
    };

    return (
        <div className="container mt-4 d-flex flex-column min-vh-100">
            <h1 className="mb-4">Account Details</h1>
            <button onClick={handleBack} className="btn btn-secondary mb-3">Back to Customer List</button>
            {error && <p className="text-danger">{error}</p>}

            <div className="flex-grow-1">
                {isLoading ? (
                    <p>Loading account details...</p>
                ) : accounts.length > 0 ? (
                    <div className="table-responsive">
                        <table id="account-table" className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Account Number</th>
                                    <th>Balance</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map(account => (
                                    <tr key={account.account_id}>
                                        <td>{account.account_number}</td>
                                        <td>${account.balance?.toFixed(2) || '0.00'}</td>
                                        <td>{account.active ? 'Active' : 'Inactive'}</td>
                                        <td>
                                            {account.active ? (
                                                <button onClick={() => handleStatusChange(account.account_number, false)} className="btn btn-danger">
                                                    Deactivate Account
                                                </button>
                                            ) : (
                                                <button onClick={() => handleStatusChange(account.account_number, true)} className="btn btn-success">
                                                    Activate Account
                                                </button>
                                            )}
                                            <button onClick={() => handleDelete(account.account_number)} className="btn btn-danger ms-2">
                                                Delete Account
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No account details available.</p>
                )}
            </div>
            <button
                onClick={handleDownloadPDF}
                className="btn btn-primary mt-3 mb-3"
            >
                Download PDF
            </button>
        </div>
    );
};

export default AccountDetailsView;
