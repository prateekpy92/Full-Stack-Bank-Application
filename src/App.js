// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import 'bootstrap/dist/css/bootstrap.min.css';

import CustomerBalance from './components/CustomerBalance'; // New component
import Login from './components/Auth/Login';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import CustomerDashboard from './components/Dashboard/CustomerDashboard';
import ManageCustomers from './components/Dashboard/ManageCustomers';
import ManageAccounts from './components/Dashboard/ManageAccounts';
import CustomersList from './components/CustomerList'; // Ensure correct import path
import AccountDetails from './components/AccountDetails'; // New component
import AccountDetailsView from './components/AccountDetailsView'; // Updated import statement
import AccountStatus from './components/AccountStatus'; // Updated import statement
import UpdateCustomerPage from './components/UpdateCustomerPage';
import AccountOverview from './customer/AccountOverview';


function App() {
    return (
        <Router>
            <Routes>
            <Route path="/accounts/:customerId" element={<AccountDetailsView />} />

                <Route path="/login" element={<Login />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                <Route path="/manage-customers" element={<ManageCustomers />} />
                <Route path="/manage-accounts" element={<ManageAccounts />} />
                <Route path="/customers" element={<CustomersList />} /> {/* Add route for CustomersList */}
                <Route path="/customers/view-balance" element={<CustomerBalance />} />
                <Route path="/accounts/view-by-id" element={<AccountDetails />} />
                <Route path="/accounts/:accountId" element={<AccountDetailsView />} />
                
                <Route path="/accounts/status" element={<AccountStatus />} /> {/* Updated route */}
                <Route path="/customers/update/:customerId" element={<UpdateCustomerPage />} />
                <Route path="/account-overview" element={<AccountOverview />} /> {/* New route */}






                {/* Add additional routes as needed */}
            </Routes>
            <ToastContainer /> {/* Add ToastContainer here */}
        </Router>
    );
}

export default App;
