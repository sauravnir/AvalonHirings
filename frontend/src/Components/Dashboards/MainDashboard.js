import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardFooter from "./DashboardFooter";
import {Card , Space , Button, Divider} from "antd";
function MainDashboard() {
  return (
    <div className="w-screen mt-8">
      <div className="mt-2 w-10/14 p-6">
        <div className=" flex-col py-3 ">
          <h1 className="text-xl font-semibold ">Dashboard</h1>
        </div>
        <div className="grid grid-cols-2">
          <div class="p-2 space-y-3">
            <div class="flex flex-row space-x-3 justify-between">
              <Card title={<Space><div class="flex flex-row items-center justify-between">Total Users</div></Space>}>
                <Space>
                  <div class="flex flex-row items-center p-3">
                  <div class="flex flex-col space-y-1">
                  <h1 class="text-lg">150000</h1>
                  <h1 class="text-xs">Total users</h1>
                  </div>
                  </div>
                </Space>
              </Card>
             <Card>
             <Space>
                  <div class="flex flex-row items-center p-3">
                  <img class="w-10 h-10 mr-5" src={require(`../../images/dashboard-admin-client.png`)}></img>
                  <div class="flex flex-col space-y-1">
                  <h1 class="text-lg">100</h1>
                  <h1 class="text-xs">Total Services</h1>
                  </div>
                  </div>
                </Space>
             </Card>
             <Card>
             <Space>
                  <div class="flex flex-row items-center p-3">
                  <img class="w-10 h-10 mr-5" src={require(`../../images/dashboard-admin-client.png`)}></img>
                  <div class="flex flex-col space-y-1">
                  <h1 class="text-lg">100</h1>
                  <h1 class="text-xs">Total Services</h1>
                  </div>
                  </div>
                </Space>
             </Card>
            </div>
          </div>

          <div class="p-3 ">
            <div>
            <Card title="Values">
              <div class="grid grid-cols-2">
                <div class="flex flex-col  ">
                  <h1>Total Received:</h1>
                  <h1>Total Paid:</h1>
                </div>
                <div class="flex flex-col ">
                  <h1>Rs.123123</h1>
                  <h1>Rs.1231231</h1>
                </div>
              </div>
            </Card>
            </div>
            <div>
              
            </div>
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default MainDashboard;
