import React from 'react'

import ViewReports from '../../../Components/Dashboards/ViewReports.js';
import Sidebar from '../../../Components/Dashboards/Sidebar';

function ReportandIssues() {
  return (
    <div class="bg-gray-50 flex">
        <Sidebar />
        <ViewReports/>
        
    </div>
  )
}

export default ReportandIssues