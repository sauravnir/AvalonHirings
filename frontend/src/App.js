import React from 'react';
import Navbar from './Components/Navbar';
import LoginPage from './Components/Login';
import Footer from './Components/Footer';
import * as Body from './Components/Body'
import * as Login from './Components/Login'
import './App.css'

function App(){
  return(
    <div>
      {/* <Navbar /> */}
      {/* <Body.Head /> */}
      {/* <Body.About /> */}
      {/* <Body.Contact /> */}
      {/* <Login.Registration /> */}
      <Login.LoginPage />
      {/* <Footer />   */}
    </div>
  )
}

export default App;
