import React from 'react'
import Sidebar from '../../../Components/Dashboards/Sidebar'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import ServiceRequestClient from '../../../Components/ClientDashboard/ServiceRequestClient'

function RequestService() {
  return (
    <div class="bg-gray-50 flex">
        <Sidebar />
        <NavigationDashboard />
        <ServiceRequestClient />

    </div>
  )
}

export default RequestService