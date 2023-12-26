import React from 'react'

import ViewReports from '../../../Components/Dashboards/ViewReports.js';
import Sidebar from '../../../Components/Dashboards/Sidebar';
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard.js';

function ReportandIssues() {
  return (
    <div class="bg-gray-50 flex">
        <Sidebar />
        <NavigationDashboard />
        <ViewReports/>
        
    </div>
  )
}

export default ReportandIssues