import React from 'react'
import Sidebar from '../../../Components/Dashboards/Sidebar'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import ViewCreateAnnouncements from '../../../Components/Dashboards/ViewCreateAnnouncements'

function ClientAnnouncement() {
  return (
    <div class="bg-zinc-100 flex">
        <NavigationDashboard />
        <Sidebar />
        <ViewCreateAnnouncements />
    </div>
  )
}

export default ClientAnnouncement