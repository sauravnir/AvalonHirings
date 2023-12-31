import React from 'react'
import Sidebar from '../../../Components/Dashboards/Sidebar';
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard';


function EmployeeDashboard(){
    return(
        <div class="bg-gray-200 flex">
            
            <NavigationDashboard />
            <Sidebar />
            </div>  
    )
}

export default EmployeeDashboard;