import React from 'react'
import Sidebar from '../../../Components/Dashboards/Sidebar'
import NavigationDashboard from '../../../Components/Dashboards/NavigationDashboard'
import ClientTransactionObject from '../../../Components/ClientDashboard/ClientTransactionObject'

function ClientTransaction() {
  return (
    <div class="bg-zinc-100 flex">
        <NavigationDashboard />
        <Sidebar />
        <ClientTransactionObject />

    </div>
  )
}

export default ClientTransaction