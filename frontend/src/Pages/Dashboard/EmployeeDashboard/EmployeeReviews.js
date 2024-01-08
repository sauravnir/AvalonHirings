import React from 'react'
import Sidebar from '../../../Components/Dashboards/Sidebar'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import ReviewAndRatingsEmployee from '../../../Components/EmployeeDashboard/ReviewAndRatingsEmployee'

function EmployeeReviews() {
  return (
    <div class="bg-zinc-100 flex">
        <NavigationDashboard />
        <Sidebar />
        <ReviewAndRatingsEmployee />
    </div>
  )
}

export default EmployeeReviews