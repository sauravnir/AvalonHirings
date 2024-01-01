import React from "react";
import Sidebar from "../../../Components/Dashboards/Sidebar";
import NavigationDashboard from "../../../Components/Dashboards/NavigationDashboard";
import WorkSchedules from "../../../Components/EmployeeDashboard/WorkSchedules";

function EmployeeWorkSchedule() {
  return (
    <div class="bg-zinc-200 flex">
        <NavigationDashboard />
      <Sidebar />
      <WorkSchedules />
    </div>
  );
}

export default EmployeeWorkSchedule;
