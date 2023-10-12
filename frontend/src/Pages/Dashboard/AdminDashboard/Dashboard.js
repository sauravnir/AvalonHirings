import React from 'react'

import Sidebar from '../../../Components/Dashboards/Sidebar'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import MainDashboard from '../../../Components/Dashboards/MainDashboard'

function Dashboard() {
  return (
    <div class='bg-sky-900 flex'>
        <NavigationDashboard/>
        <Sidebar />
        <MainDashboard />
    </div>
  )
}

export default Dashboard