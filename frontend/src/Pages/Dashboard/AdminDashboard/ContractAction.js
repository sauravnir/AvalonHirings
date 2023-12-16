import React from 'react';

import Sidebar from '../../../Components/Dashboards/Sidebar';
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard';
import ContractReviewAction from '../../../Components/Dashboards/ContractReviewAction'
function ContractAction(){
    return (
        <div class="bg-sky-900 flex">
            <NavigationDashboard />
            <Sidebar />
            <ContractReviewAction />
        </div>
    )
}

export default ContractAction;