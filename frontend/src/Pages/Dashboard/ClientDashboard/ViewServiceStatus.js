import React from 'react'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import Sidebar from '../../../Components/Dashboards/Sidebar'
import ServiceStatus from '../../../Components/ClientDashboard/ServiceStatus'

function ViewServiceStatus() {
  return (
    <div class="bg-zinc-100 flex">
        <NavigationDashboard /> 
        <Sidebar />
        <ServiceStatus />
    </div>
  )
}

export default ViewServiceStatus