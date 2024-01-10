import React from 'react'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import Sidebar from '../../../Components/Dashboards/Sidebar'
import CreateTransaction from '../../../Components/Dashboards/CreateTransaction'
function Transaction() {
  return (
    <div class="bg-zinc-200 flex">
        <NavigationDashboard />
        <Sidebar />
        <CreateTransaction />
    </div>
  )
}

export default Transaction