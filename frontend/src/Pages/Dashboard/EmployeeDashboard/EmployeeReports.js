import React from 'react'
import UserIssueReports from '../../../Components/EmployeeDashboard/EmployeeIssueReports'
import Sidebar from '../../../Components/Dashboards/Sidebar'
function EmployeeReports() {
  return (
    <div class="bg-gray-50 flex">
        <Sidebar />
        <UserIssueReports />
        
    </div>
  )
}

export default EmployeeReports