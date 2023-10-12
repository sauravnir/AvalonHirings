import React from "react";
import { Link } from "react-router-dom";
// Importing static logos/images
import logout from "../../images/icons/logout.png";
import expand from "../../images/icons/expand.png";

function NavigationDashboard() {
  return (
    <nav class="sticky top-0 relative z-0 justify-between">
      <div class="fixed w-full z-30 flex bg-sky-900 dark:bg-sky-900 p-2 items-center shadow-lg justify-end h-14 px-10">
        <div class="flex h-full text-center flex items-center justify-center">
          <div class="flex space-x-7 items-center ">
            <Link to="/login">
              <img src={logout} class=" rounded-full w-7 hover:bg-sky-100"></img>
            </Link>
            <button class="flex items-center space-x-2">
              <h1 class="text-lg font-medium text-white hover:underline">
                Saurav Niraula
              </h1>
              <img src={expand}></img>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationDashboard;
