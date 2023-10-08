import React from 'react';
import HomePage from './Pages/HomePage';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import Registration from './Pages/Registration';


function App(){
  return(
    <Router>
      {/* <HomePage /> */}
      <LoginPage />
      {/* <Registration /> */}
    </Router>
  )
}

export default App;
