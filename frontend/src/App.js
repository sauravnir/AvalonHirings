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

  const side = SideBarData.map(info => {
    return(
      <Sidebar  
        key={info.id}
        {...info}
      />
    )
  })

  console.log(side)
  return(
    <Router>
      {/* <Routes> */}
        {/* HomePage will be the default route */}
        {/* <Route index element={<HomePage />}/>
        <Route path='/home' element={<HomePage />}/>
        <Route path='/about' element={<About />} />
        <Route path='./contact' element={<Contact />} />
        <Route path='./loginpage' element={<LoginPage />} />
      </Routes> */}
      {/*  <HomePage /> */}
      {/* <LoginPage /> */}
      {side}
      <Dashboard />
    </Router>
  )
}

export default App;
