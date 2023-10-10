import React from "react";
import { Link, NavLink } from "react-router-dom";

//importing images/logos
import logo from "../images/A.png";
import dashboard from "../images/icons/dashboard.png";
import payment from "../images/icons/payment.png";
import contract from "../images/icons/contract.png";
import report from "../images/icons/report.png";
import rating from "../images/icons/rating.png";

function Sidebar() {
  return (
    <div>
      <div class="flex flex-col overflow-hidden h-screen w-[230px] bg-white relative shadow-m">
        <div class="flex w-full justify-center space-x-1 items-end mt-5">
          <img src={logo} alt="userprofile" class="h-auto w-8"></img>
          <h1 class="text-gray-900 text-lg font-medium">Avalon Hirings</h1>
          {/* <button onClick={sidebarToggle}><img src={ToggleMenu} alt="toggleMenu" style={{marginLeft: isOpen?"20px":"0px"}} class="flex h-auto w-8 ml-3 shadow"></img></button> */}
        </div>
        <div class="p-3">
          <Link to="/dashboard">
            <div class="flex overflow-hidden mt-5 p-2 relative hover:bg-sky-100 rounded ">
              <div class="flex space-x-4 m-3 h-fit active items-center justify-start rounded-sm ">
                <img src={dashboard} alt="Dashboard"></img>
                <h1 class="text-dark-900 text-sm font-medium">Dashboard</h1>
              </div>
            </div>
          </Link>

          <Link to="/dashboard">
            <div class="flex overflow-hidden  p-2 relative hover:bg-sky-100 rounded ">
              <div class="flex space-x-4 m-3 h-fit active items-center justify-start rounded-sm ">
                <img src={payment} alt="Payment"></img>
                <h1 class="text-dark-900 text-sm font-medium">Payment</h1>
              </div>
            </div>
          </Link>

          <Link to="/dashboard">
            <div class="flex overflow-hidden  p-2 relative hover:bg-sky-100 rounded ">
              <div class="flex space-x-4 m-3 h-fit active items-center justify-start rounded-sm ">
                <img src={contract} alt="Contract"></img>
                <h1 class="text-dark-900 text-sm font-medium">Contract</h1>
              </div>
            </div>
          </Link>

          <Link to="/dashboard">
            <div class="flex overflow-hidden  p-2 relative hover:bg-sky-100 rounded ">
              <div class="flex space-x-4 m-3 h-fit active items-center justify-start rounded-sm ">
                <img src={rating} alt="rating"></img>
                <h1 class="text-dark-900 text-sm font-medium">Rating</h1>
              </div>
            </div>
          </Link>

          <Link to="/dashboard">
            <div class="flex overflow-hidden  p-2 relative hover:bg-sky-100 rounded ">
              <div class="flex space-x-4 m-3 h-fit active items-center justify-start rounded-sm ">
                <img src={report} alt="report"></img>
                <h1 class="text-dark-900 text-sm font-medium">Report</h1>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
