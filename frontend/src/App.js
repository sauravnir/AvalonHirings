import React from "react";
import HomePage from "./Pages/LandingPage/HomePage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginRegistration/LoginPage";
import Registration from "./Pages/LoginRegistration/Registration";
import Dashboard from "./Pages/Dashboard/AdminDashboard/Dashboard";
import ForgotPassword from "./Pages/LoginRegistration/ForgotPassword";
import OtpCode from "./Pages/LoginRegistration/OtpCode";
import ContractReview from "./Pages/Dashboard/AdminDashboard/ContractReview";
import PrivateRoute from "../src/Routes/PrivateRoute.js";
import Payment from "./Pages/Dashboard/AdminDashboard/Payment.js";
import ClientDashboard from "./Pages/Dashboard/ClientDashboard/ClientDashboard.js";
import EmployeeDashboard from "./Pages/Dashboard/EmployeeDashboard/EmployeeDashboard.js";
import ReportandIssues from "./Pages/Dashboard/AdminDashboard/ReportandIssues.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/otp" element={<OtpCode />} />
        <Route path="/contractreview" element={<PrivateRoute />}>
          <Route path="/contractreview" element={<ContractReview />} />
        </Route>
        <Route path="/payment" element={<PrivateRoute />}>
          <Route path="/payment" element={<Payment />} />
        </Route>
        <Route path="/client-dashboard" element={<PrivateRoute />}>
          <Route path="/client-dashboard" element={<ClientDashboard />} />
        </Route>

        <Route path="/employee-dashboard" element={<PrivateRoute />}>
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        </Route>

        <Route path="/admin-view-reports" element={<PrivateRoute />}>
          <Route path="/admin-view-reports" element={<ReportandIssues />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
