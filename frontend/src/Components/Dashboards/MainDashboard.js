import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dashboardItemsData from "../../objects/MainDashboardObject";
import DashboardFooter from "./DashboardFooter";

function MainDashboard() {
  const [dashboardItems, setDashboardItems] = useState([]);

  useEffect(() => {
    // Use the imported array directly, don't call it as a function
    setDashboardItems(dashboardItemsData);
  }, []);

  return (
    <div className="w-screen my-8">
      <div className="mt-2 w-10/14 p-4">
        <div className="flex  ">
          <h1 className="text-2xl font-base">Dashboard</h1>
        </div>
        <div className="flex  justify-between">
          {dashboardItems.map((info) => (
            <div class="mt-3">
              <Link to="/admin-dashboard">
                <div className={`flex flex-row w-72 h-22 shadow rounded rounded-lg bg-white shadow-gray-250`}>
                  <div className="flex flex-row p-3 space-x-8 items-center">
                    <div class={`relative rounded-full h-fit ${info.color}`}>
                    <img
                      className="w-8"
                      src={require(`../../images/${info.img}`)}
                    ></img>
                    </div>
                   <div class="flex flex-col space-y-2">
                   <h1 className="text-sm items-center text-gray-600">{info.title}</h1>
                    <span className="text-xl font-medium  text-dark  ">
                      {info.number}
                    </span>
                   </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default MainDashboard;
