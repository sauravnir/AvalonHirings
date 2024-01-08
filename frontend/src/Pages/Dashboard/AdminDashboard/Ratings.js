import React from 'react'
import Sidebar from '../../../Components/Dashboards/Sidebar'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import ViewRatings from '../../../Components/Dashboards/ViewRatings'

function Ratings() {
  return (
    <div class="bg-zinc-100 flex">
        <NavigationDashboard />
        <Sidebar />
        <ViewRatings />
    </div>
  )
}

export default Ratings