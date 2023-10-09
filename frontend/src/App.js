import React from 'react';
import HomePage from './Pages/HomePage';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Registration from './Pages/Registration'
import Dashboard from './Pages/Dashboard';
import SideBarData  from './SideBarData';
import Sidebar from './Components/Sidebar';

function App(){
  return(
    <Router>
      {/* <Sidebar> */}
      <Routes>
        {/* HomePage will be the default route */}
        <Route index element={<HomePage/>}/>
        <Route path='/home' element={<HomePage />}/>
        {/* <Route path='/about' element={<About />} /> */}
        {/* <Route path='./contact' element={<Contact />} /> */}
        {/* <Route path='./loginpage' element={<LoginPage />} /> */}
        {/* <Route path='./dashboard' element={<Dashboard />} />  */}
      </Routes>
      {/* </Sidebar> */}
      {/* <HomePage /> */}
      {/* <Dashboard /> */}
      {/* {side} */}
    </Router>
  )
}

export default App;
