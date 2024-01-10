import React from 'react'
import Sidebar from '../../../Components/Dashboards/Sidebar'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import CreateService from '../../../Components/Dashboards/CreateService'

function CreateServiceAdmin() {
  return (
    <div class="bg-zinc-100 flex">
        <NavigationDashboard />
        <Sidebar />
        <CreateService />

    </div>

)}  


export default CreateServiceAdmin;
