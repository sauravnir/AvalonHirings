import React from 'react'
import Sidebar from '../../../Components/Dashboards/Sidebar';
import UserIssueReports from '../../../Components/EmployeeDashboard/EmployeeIssueReports';
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard';
function ClientReports() {
  return (
    <div class="bg-zinc-100 flex">
        <NavigationDashboard />
        <Sidebar />
        <UserIssueReports />
    </div>
  )
}

export default ClientReports