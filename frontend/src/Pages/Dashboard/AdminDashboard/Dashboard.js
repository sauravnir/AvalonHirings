import React from 'react'

import Sidebar from '../../../Components/Dashboards/Sidebar'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import MainDashboard from '../../../Components/Dashboards/MainDashboard'

function Dashboard() {

  return (
    <div class='bg-gray-50 flex'>
        <Sidebar />
        <NavigationDashboard />
        <MainDashboard />
    </div>  
  )
}

export default Dashboard