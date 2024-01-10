import React from 'react'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import Sidebar from '../../../Components/Dashboards/Sidebar'
import EmployeeTransactionObject from '../../../Components/EmployeeDashboard/EmployeeTransactionObject'

function EmployeeTransaction() {
  return (
    <div class="bg-zinc-100 flex">
    <NavigationDashboard />
    <Sidebar />
    <EmployeeTransactionObject />
    </div>
  )
}

export default EmployeeTransaction