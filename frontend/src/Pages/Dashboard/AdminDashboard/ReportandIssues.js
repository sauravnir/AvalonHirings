import React from 'react'

import ViewReports from '../../../Components/Dashboards/ViewReports.js';
import Sidebar from '../../../Components/Dashboards/Sidebar';
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard.js';

function ReportandIssues() {
  return (
    <div class="bg-zinc-100 flex">

<NavigationDashboard />
        <Sidebar />
        
        <ViewReports/>
        
    </div>
  )
}

export default ReportandIssues