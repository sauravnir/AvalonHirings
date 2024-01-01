import React from 'react'
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import DashboardFooter from '../Dashboards/DashboardFooter';
function WorkSchedules() {
  return (
    <div className="w-screen mt-14">
    <div className="mt-2 w-10/14 p-6">
      <div className="flex flex-col py-3">
      <div className="flex flex-row items-center justify-between w-full bg-white rounded shadow   p-3">
        <h1 className="text-2xl font-bold">Work Schedules</h1>
      </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={6000} />
      <div class="grid grid-cols-4 space-x-4">
        
      </div>
      <DashboardFooter />
    </div>
  </div>
  )
}

export default WorkSchedules