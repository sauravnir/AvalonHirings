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
import EmployeeWorkSchedule from "./Pages/Dashboard/EmployeeDashboard/EmployeeWorkSchedule.js";
import EmployeePayment from "./Pages/Dashboard/EmployeeDashboard/EmployeePayment.js";
import EmployeeReports from "./Pages/Dashboard/EmployeeDashboard/EmployeeReports.js";
import EmployeeReviews from "./Pages/Dashboard/EmployeeDashboard/EmployeeReviews.js";
import ClientReports from "./Pages/Dashboard/ClientDashboard/ClientReports.js";
import CreateServiceAdmin from  "./Pages/Dashboard/AdminDashboard/CreateServiceAdmin.js";
import RequestService from "./Pages/Dashboard/ClientDashboard/RequestService.js";
import UserProfile from "./Pages/ProfileSettings/UserProfile.js";
import ViewServiceStatus from "./Pages/Dashboard/ClientDashboard/ViewServiceStatus.js";
import Ratings from "./Pages/Dashboard/AdminDashboard/Ratings.js";

function App() {
  return (
  
    <Router>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
         <Route path="/otp" element={<PrivateRoute />}>
         <Route path="/otp" element={<OtpCode />} />
         </Route>
          
          
        {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<PrivateRoute allowedRoles={['Admin']}/>}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/admin-contractreview" element={<PrivateRoute />}>
            <Route index element={<ContractReview />} />
          </Route>
          <Route path="/admin-payment" element={<PrivateRoute />}>
            <Route index element={<Payment />} />
          </Route>
         
          <Route path="/admin-view-reports" element={<PrivateRoute />}>
            <Route index element={<ReportandIssues />} />
          </Route>

          <Route path="/create-service" element={<PrivateRoute />}>
            <Route index element={<CreateServiceAdmin />}/>
          </Route>
         
          <Route path="/ratings" element={<PrivateRoute />}>
            <Route index element={<Ratings />}/>
          </Route>
          


          {/* Employee Routes */}
          <Route path="/employee-dashboard" element={<PrivateRoute allowedRoles={['Employee']}/>}>
            <Route index element={<EmployeeDashboard />} />
          </Route>
          <Route path="/employee-work-schedule" element={<PrivateRoute />}>
            <Route index element={<EmployeeWorkSchedule />}></Route>
          </Route>

          <Route path="/employee-payment" element={<PrivateRoute />}>
            <Route index element={<EmployeePayment />}></Route>
          </Route>

          <Route path="/employee-review-ratings" element={<PrivateRoute />}>
            <Route index element={<EmployeeReviews />}></Route>
          </Route>
          <Route path="/employee-reports" element={<PrivateRoute />}>
            <Route index element={<EmployeeReports />}></Route>
          </Route>

          {/* Client Routes */}

          <Route path="/client-dashboard" element={<PrivateRoute />}>
            <Route index element={<ClientDashboard />}></Route>
          </Route>

          <Route path="/client-reports" element={<PrivateRoute />}>
            <Route index element={<ClientReports />}></Route>
          </Route>

          <Route path='/request-service' element={<PrivateRoute />}>
            <Route index element={<RequestService />}/>
          </Route>

          <Route path='/client-view-service' element={<PrivateRoute />}>
            <Route  index element={<ViewServiceStatus />} />
          </Route>
          
          
          <Route path='/userprofile' element={<PrivateRoute />}>
              <Route index element={<UserProfile />}/>

          </Route>
        </Routes>
    </Router>
    
  );
}

export default App;
