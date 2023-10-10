import React from 'react'
import {useState} from 'react'
import Sidebar from '../Components/Sidebar'

import NavigationDashboard from '../Components/NavigationDashboard'

// Importing Logos/Pictures 
import Logo from "../images/A.png"
import MainDashboard from '../Components/MainDashboard'

function Dashboard() {
  return (
    <div class='bg-sky-50'>
        <NavigationDashboard/>
        
        <MainDashboard />
        <Sidebar />
        
    </div>
  )
}

export default Dashboard