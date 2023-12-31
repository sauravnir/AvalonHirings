import React from "react";
import Sidebar from "../../Components/Dashboards/Sidebar";
import NavigationDashboard from "../../Components/Dashboards/NavigationDashboard";

function UserProfile() {
  return (
    <div class="bg-zinc-100 flex">
      <NavigationDashboard />
      <Sidebar />
      <div class="flex flex-rows py-14 justify-center space-x-4 w-screen mt-14">
        
        <div class="shadow border">
          <div class="bg-white rounded border p-2">
            <div class="p-5 mw-100">
              <img class="w-10 h-10" src="" alt="User Profile"></img>
            </div>
          </div>
        </div>

        <div class="shadow border">
          <h1>Hello World</h1>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
