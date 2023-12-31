import React from 'react'
import UserIssueReports from '../../../Components/EmployeeDashboard/EmployeeIssueReports'
import Sidebar from '../../../Components/Dashboards/Sidebar'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
function EmployeeReports() {
  return (
    <div class="bg-zinc-100 flex">
      <NavigationDashboard />
        <Sidebar />
        <UserIssueReports />
        
    </div>
  )
}

export default EmployeeReports