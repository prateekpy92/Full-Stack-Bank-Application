import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.css'; // Import custom CSS
import jsPDF from 'jspdf';
import { format } from 'date-fns'; // Optional: For date formatting

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        // Clear authentication token or any user-specific data
        localStorage.removeItem('token');

        // Redirect to login page or home page
        navigate('/login');
    };

    const handleDownloadPDF = (accountId) => {
        // Create a new jsPDF instance
        const doc = new jsPDF();
        
        // Add content to the PDF
        doc.text(`Account ID: ${accountId}`, 10, 10);
        doc.text('Account Details:', 10, 20);

        // Example data, replace with actual account data
        doc.text('Account Name: John Doe', 10, 30);
        doc.text('Account Balance: $1000', 10, 40);

        // Save the PDF
        doc.save(`account_${accountId}.pdf`);
    };

    return (
        <div className="admin-dashboard container mt-5">
            <h2 className="text-center mb-4">Admin Dashboard</h2>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <button
                        className="btn btn-primary btn-block"
                        onClick={() => handleNavigation('/manage-customers')}
                    >
                        Manage Customers
                    </button>
                </div>

                <div className="col-md-6 mb-3">
                    <button
                        className="btn btn-info btn-block"
                        onClick={() => handleNavigation('/customers')}
                    >
                        View All Customers
                    </button>
                </div>

                <div className="col-md-6 mb-3">
                    <button
                        className="btn btn-info btn-block"
                        onClick={() => handleNavigation('/customers/view-by-id')}
                    >
                        View Customer by ID
                    </button>
                </div>

                <div className="col-md-6 mb-3">
                    <button
                        className="btn btn-info btn-block"
                        onClick={() => handleNavigation('/customers/view-balance')}
                    >
                        View Customer Balance by ID
                    </button>
                </div>

                <div className="col-md-6 mb-3">
                    <button
                        className="btn btn-success btn-block"
                        onClick={() => handleNavigation('/accounts/create')}
                    >
                        Create Account for Customer
                    </button>
                </div>

                <div className="col-md-6 mb-3">
                    <button
                        className="btn btn-info btn-block"
                        onClick={() => handleNavigation('/accounts/view-by-id')}
                    >
                        View Account by ID
                    </button>
                </div>

                <div className="col-md-6 mb-3">
                    <button
                        className="btn btn-primary btn-block"
                        onClick={() => handleDownloadPDF('12345')} // Replace with actual account ID
                    >
                        Download Account PDF
                    </button>
                </div>

                <div className="col-md-6 mb-3">
                    <button
                        className="btn btn-danger btn-block"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
