import React from 'react'
import Sidebar from '../../../Components/Dashboards/Sidebar'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import ContractReviewDashboard from '../../../Components/Dashboards/ContractReviewDashboard'


function ContractReview() {
  return (
    <div class='bg-gray-50 flex'>
      <NavigationDashboard/>
        <Sidebar />
      <ContractReviewDashboard />
    </div>
  )
}

export default ContractReview