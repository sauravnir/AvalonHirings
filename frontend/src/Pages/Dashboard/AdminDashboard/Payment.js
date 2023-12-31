import React from 'react';
import PaymentDashboard from '../../../Components/Dashboards/PaymentDashboard';
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard';
import Sidebar from '../../../Components/Dashboards/Sidebar';

function Payment(){
    return(
        <div class='bg-zinc-100 flex'>
            <NavigationDashboard />
            <Sidebar />
            
            <PaymentDashboard /> 
    </div>
    )
}


export default Payment