import React from 'react';
import Navbar from './Components/Navbar';
import LoginPage from './Components/Login';
import Footer from './Components/Footer';
import * as Body from './Components/Body'
import './App.css'

function App(){
  return(
    <div>
      {/* <Navbar /> */}
      {/* <Body.Head /> */}
      {/* <Body.About /> */}
      {/* <Body.Contact /> */}
      <LoginPage />
      {/* <Footer />   */}
    </div>
  )
}

export default App;
