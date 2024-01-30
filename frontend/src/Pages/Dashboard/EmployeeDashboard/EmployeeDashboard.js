import React from 'react'
import Sidebar from '../../../Components/Dashboards/Sidebar';
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard';
import EmployeeDashboardObject from '../../../Components/EmployeeDashboard/EmployeeDashboardObject';


function EmployeeDashboard(){
    return(
        <div class="bg-zinc-100 flex">
            
            <NavigationDashboard />
            <Sidebar />
            <EmployeeDashboardObject />
            </div>  
    )
}

export default EmployeeDashboard;