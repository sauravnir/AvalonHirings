import React from 'react'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import Sidebar from '../../../Components/Dashboards/Sidebar'
import AddUserObject from '../../../Components/Dashboards/AddUserObject'

function AddUser() {
  return (
    <div class="bg-zinc-100 flex">
        <NavigationDashboard />
        <Sidebar />
        <AddUserObject />

    </div>
  )
}

export default AddUser