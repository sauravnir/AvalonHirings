import React from 'react'
import Sidebar from '../../../Components/Dashboards/Sidebar'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import CreateService from '../../../Components/Dashboards/CreateService'

function CreateServiceAdmin() {
  return (
    <div class="bg-gray-50 flex">

        <Sidebar />
        <NavigationDashboard />
        <CreateService />

    </div>

)}  


export default CreateServiceAdmin;
