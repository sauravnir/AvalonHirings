import React from 'react';
import HomePage from './Pages/HomePage';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Registration from './Pages/Registration';  
import Dashboard from './Pages/Dashboard';
import Hero from './Pages/Hero';
import ForgotPassword from './Pages/ForgotPassword';

function App() {
  return (
    <Router>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Registration />} />
          <Route path='forgotPassword' element={<ForgotPassword />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    </Router>
  );
}

export default App;
