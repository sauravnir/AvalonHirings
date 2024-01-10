import React from 'react'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import Sidebar from '../../../Components/Dashboards/Sidebar'
import ViewCreateAnnouncements from '../../../Components/Dashboards/ViewCreateAnnouncements'

function Announcements() {
  return (
    <div class="bg-zinc-200 flex"> 
    <NavigationDashboard />
    <Sidebar />
    <ViewCreateAnnouncements />
    </div>
  )
}

export default Announcements