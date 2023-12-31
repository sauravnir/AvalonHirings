import React from 'react'
import Sidebar from '../../../Components/Dashboards/Sidebar'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import ServiceRequestClient from '../../../Components/ClientDashboard/ServiceRequestClient'

function RequestService() {
  return (
    <div class="bg-zinc-100 flex">
      <NavigationDashboard />
        <Sidebar />
        
        <ServiceRequestClient />

    </div>
  )
}

export default RequestService