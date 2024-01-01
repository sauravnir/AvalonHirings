import React from 'react'
import Sidebar from '../../../Components/Dashboards/Sidebar';
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard';
import ClientDashboardObject from '../../../Components/ClientDashboard/ClientDashboardObject';

function ClientDashboard(){
    return(
        <div class="bg-zinc-100 flex">
            <NavigationDashboard />
            <Sidebar />
            <ClientDashboardObject />
            </div>
    )
}

export default ClientDashboard; 