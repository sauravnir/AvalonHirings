import React from 'react';
import HomePage from './Pages/LandingPage/HomePage';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './Pages/LoginRegistration/LoginPage';
import Registration from './Pages/LoginRegistration/Registration';  
import Dashboard from './Pages/Dashboard/AdminDashboard/Dashboard';
import ForgotPassword from './Pages/LoginRegistration/ForgotPassword';
import OtpCode from './Pages/LoginRegistration/OtpCode';
import ContractReview from './Pages/Dashboard/AdminDashboard/ContractReview';
import ContractAction from './Pages/Dashboard/AdminDashboard/ContractAction.js';
function App() {
  return (
    <Router>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/forgotpassword' element={<ForgotPassword />}/>
          <Route path='/otp' element={<OtpCode />} />
          <Route path='/contractreview' element={<ContractReview />} />
          <Route path='/contractaction' element={<ContractAction />} />
        </Routes>
    </Router>
  );
}

export default App;
