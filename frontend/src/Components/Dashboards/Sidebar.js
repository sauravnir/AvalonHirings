import React from "react";
import { Link, NavLink } from "react-router-dom";

//importing images/logos
import logo from "../../images/A.png";
import dashboard from "../../images/icons/dashboard.png";
import payment from "../../images/icons/payment.png";
import contract from "../../images/icons/contract.png";
import report from "../../images/icons/report.png";
import rating from "../../images/icons/rating.png";

function Sidebar() {
  return (
    <div>
      <div class="flex flex-col overflow-hidden h-screen w-[230px] bg-white relative shadow-2xl sticky top-0">
        <div class="flex w-full justify-center space-x-1 items-end mt-5">
          <img src={logo} alt="userprofile" class="h-auto w-8"></img>
          <h1 class="text-gray-900 text-2xl font-medium">Avalon Hirings</h1>
          {/* <button onClick={sidebarToggle}><img src={ToggleMenu} alt="toggleMenu" style={{marginLeft: isOpen?"20px":"0px"}} class="flex h-auto w-8 ml-3 shadow"></img></button> */}
        </div>
        <div class="p-5 text-base">
          <Link to="/dashboard">
            <div class="flex overflow-hidden mt-5 p-2 relative hover:bg-sky-700 rounded ">
              <div class="flex space-x-4 m-3 h-fit active items-center justify-start rounded-sm ">
                <img src={dashboard} alt="Dashboard" class="w-4"></img>
                <h1 class="text-dark-900">Dashboard</h1>
              </div>
            </div>
          </Link>

          <Link to="/payment">
            <div class="flex overflow-hidden  p-2 relative hover:bg-sky-700 rounded ">
              <div class="flex space-x-4 m-3 h-fit active items-center justify-start rounded-sm ">
                <img src={payment} alt="Payment" class="w-4"></img>
                <h1 class="text-dark-900 font-medium">Payment</h1>
              </div>
            </div>
          </Link>

          <Link to="/contractreview">
            <div class="flex overflow-hidden  p-2 relative hover:bg-sky-700 rounded ">
              <div class="flex space-x-4 m-3 h-fit active items-center justify-start rounded-sm ">
                <img src={contract} alt="Contract" class="w-4"></img>
                <h1 class="text-dark-900  font-medium">Contracts</h1>
              </div>
            </div>
          </Link>

          <Link to="/dashboard">
            <div class="flex overflow-hidden  p-2 relative hover:bg-sky-700 rounded ">
              <div class="flex space-x-4 m-3 h-fit active items-center justify-start rounded-sm ">
                <img src={rating} alt="rating" class="w-4"></img>
                <h1 class="text-dark-900  font-medium">Rating</h1>
              </div>
            </div>
          </Link>

          <Link to="/dashboard">
            <div class="flex overflow-hidden  p-2 relative hover:bg-sky-700 rounded ">
              <div class="flex space-x-4 m-3 h-fit active items-center justify-start rounded-sm ">
                <img src={report} alt="report" class="w-4"></img>
                <h1 class="text-dark-900  font-medium">Report</h1>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Sidebar;
