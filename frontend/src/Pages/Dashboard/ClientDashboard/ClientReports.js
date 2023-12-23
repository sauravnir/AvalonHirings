import React from 'react'
import Sidebar from '../../../Components/Dashboards/Sidebar';
import UserIssueReports from '../../../Components/EmployeeDashboard/EmployeeIssueReports';
function ClientReports() {
  return (
    <div class="bg-gray-200 flex">

        <Sidebar />
        <UserIssueReports />
    </div>
  )
}

export default ClientReports