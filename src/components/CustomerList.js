import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CustomerList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchCustomers = async () => {
        if (!token) {
            setError('No authentication token found.');
            return;
        }

        try {
            const response = await axios.get('http://localhost:8081/api/customers', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (Array.isArray(response.data)) {
                setCustomers(response.data);
                setFilteredCustomers(response.data);
                setTotalItems(response.data.length);
            } else {
                setError('Unexpected data format from the API.');
            }
        } catch (err) {
            setError('Failed to fetch customers: ' + (err.response ? err.response.data.message : err.message));
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        // Filter customers based on the search term
        const filtered = customers.filter(customer =>
            customer.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.lastname.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCustomers(filtered);
        setTotalItems(filtered.length);
        setCurrentPage(1); // Reset to first page when search term changes
    }, [searchTerm, customers]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleBack = () => {
        navigate('/admin-dashboard');
    };

    const handleViewAccount = (customerId) => {
        if (!token) {
            setError('No authentication token found.');
            return;
        }

        navigate(`/accounts/${customerId}`);
    };

    const handleUpdateCustomer = (customerId) => {
        navigate(`/customers/update/${customerId}`);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleDownloadPDF = async () => {
        // Convert the table to canvas
        const input = document.getElementById('customer-table');
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');

        // Create a new PDF document
        const doc = new jsPDF();

        // Add the image to the PDF
        doc.addImage(imgData, 'PNG', 10, 10);

        // Save the PDF
        doc.save('customer_list.pdf');
    };

    return (
        <div className="dashboard-container">
            <h1>Customer List</h1>
            <button onClick={handleBack} className="btn btn-secondary mb-3">Back to Dashboard</button>
            {error && <p className="error-message">{error}</p>}
            
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control"
                />
            </div>

            <button
                onClick={handleDownloadPDF}
                className="btn btn-primary mb-3"
            >
                Download PDF
            </button>

            {filteredCustomers.length > 0 ? (
                <>
                    <table id="customer-table" className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Total Balance</th>
                                <th>Actions</th> {/* Added Actions column */}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.firstname}</td>
                                    <td>{customer.lastname}</td>
                                    <td>${customer.totalbalance?.toFixed(2) || '0.00'}</td>
                                    <td>
                                        <button
                                            onClick={() => handleViewAccount(customer.id)}
                                            className="btn btn-info btn-sm me-2"
                                        >
                                            View Accounts
                                        </button>
                                        <button
                                            onClick={() => handleUpdateCustomer(customer.id)}
                                            className="btn btn-warning btn-sm"
                                        >
                                            Update Customer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(1)}
                            className="btn btn-secondary"
                            disabled={currentPage === 1}
                        >
                            &laquo; First
                        </button>
                        <button
                            onClick={handlePrevious}
                            className="btn btn-secondary"
                            disabled={currentPage === 1}
                        >
                            &lt; Previous
                        </button>
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => handlePageChange(number)}
                                className={`btn btn-secondary ${currentPage === number ? 'active' : ''}`}
                            >
                                {number}
                            </button>
                        ))}
                        <button
                            onClick={handleNext}
                            className="btn btn-secondary"
                            disabled={currentPage === pageNumbers.length}
                        >
                            Next &gt;
                        </button>
                        <button
                            onClick={() => handlePageChange(pageNumbers.length)}
                            className="btn btn-secondary"
                            disabled={currentPage === pageNumbers.length}
                        >
                            Last &raquo;
                        </button>
                    </div>
                </>
            ) : (
                <p>Loading customers...</p>
            )}
        </div>
    );
};

export default CustomerList;
