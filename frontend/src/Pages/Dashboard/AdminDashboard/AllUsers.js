import React from 'react'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import Sidebar from '../../../Components/Dashboards/Sidebar'
import AllUsersObject from '../../../Components/Dashboards/AllUsersObject'

function AllUsers() {
  return (
    <div class="bg-zinc-100 flex">
        <NavigationDashboard />
        <Sidebar />
        <AllUsersObject />
    </div>
  )
}

export default AllUsers