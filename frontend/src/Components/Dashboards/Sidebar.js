import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space, Divider, Button, theme, Popconfirm } from "antd";
//importing images/logos
import logo from "../../images/A.png";


const { useToken } = theme;
const items = [
  {
    key: "1",
    label:<Link to='/dashboard'><h1>User Profile</h1></Link>,
  },

];
function Sidebar() {

  const navigate = useNavigate();

  // Handling the Logout Of The User
  const handleLogout = async (e) => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusSM,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "0",

  };
  return (
    <div>
      <aside class="flex flex-col w-64 h-screen px-4 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <a href="#" class="mx-auto">
          <img class="w-auto h-6 sm:h-7" src="" alt=""></img>
        </a>

        <div class="flex flex-col items-center  -mx-2">
          <img
            class="object-cover w-12 h-12 mx-2 rounded-full"
            src={logo}
            alt="avatar"
          ></img>
          <h4 class="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">
            Saurav Niraula
          </h4>
          <p class="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline">
            Admin
          </p>
        </div>

        <div class="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <Link to="/dashboard">
              <a class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span class="mx-4 font-medium">Dashboard</span>
              </a>
            </Link>

            <Link to="/contractreview">
              <a
                class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <svg
                  class="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
                  />
                </svg>

                <span class="mx-4 font-medium">User Contracts</span>
              </a>
            </Link>

            <Link to="/payment">
              <a
                class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" /> */}
                <svg
                  class="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                  />
                </svg>
                <span class="mx-4 font-medium">Payments</span>
              </a>
            </Link>

            <Link to="/dashboard">
              <a
                class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <svg
                  class="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 21 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z"
                  />
                </svg>

                <span class="mx-4 font-medium">Ratings and Services</span>
              </a>
            </Link>

            <Link to="/admin-view-reports">
              <a
                class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <svg
                  class="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 1v4a1 1 0 0 1-1 1H1m14-4v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                  />
                </svg>

                <span class="mx-4 font-medium">Reports and Issues</span>
              </a>
            </Link>

            <Link to="/dashboard">
              <a
                class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <svg
                  class="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 8C5.80777 8 5.13108 7.79473 4.55551 7.41015C3.97993 7.02556 3.53133 6.47893 3.26642 5.83939C3.00152 5.19985 2.9322 4.49612 3.06725 3.81719C3.2023 3.13825 3.53564 2.51461 4.02513 2.02513C4.51461 1.53564 5.13825 1.2023 5.81719 1.06725C6.49612 0.932205 7.19985 1.00152 7.83939 1.26642C8.47893 1.53133 9.02556 1.97993 9.41015 2.55551C9.79473 3.13108 10 3.80777 10 4.5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.5 17H1V15C1 13.9391 1.42143 12.9217 2.17157 12.1716C2.92172 11.4214 3.93913 11 5 11"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19.5 11H18.38C18.2672 10.5081 18.0714 10.0391 17.801 9.613L18.601 8.818C18.6947 8.72424 18.7474 8.59708 18.7474 8.4645C18.7474 8.33192 18.6947 8.20476 18.601 8.111L17.894 7.404C17.8002 7.31026 17.6731 7.25761 17.5405 7.25761C17.4079 7.25761 17.2808 7.31026 17.187 7.404L16.392 8.204C15.9647 7.93136 15.4939 7.73384 15 7.62V6.5C15 6.36739 14.9473 6.24021 14.8536 6.14645C14.7598 6.05268 14.6326 6 14.5 6H13.5C13.3674 6 13.2402 6.05268 13.1464 6.14645C13.0527 6.24021 13 6.36739 13 6.5V7.62C12.5081 7.73283 12.0391 7.92863 11.613 8.199L10.818 7.404C10.7242 7.31026 10.5971 7.25761 10.4645 7.25761C10.3319 7.25761 10.2048 7.31026 10.111 7.404L9.404 8.111C9.31026 8.20476 9.25761 8.33192 9.25761 8.4645C9.25761 8.59708 9.31026 8.72424 9.404 8.818L10.204 9.618C9.9324 10.0422 9.73492 10.5096 9.62 11H8.5C8.36739 11 8.24021 11.0527 8.14645 11.1464C8.05268 11.2402 8 11.3674 8 11.5V12.5C8 12.6326 8.05268 12.7598 8.14645 12.8536C8.24021 12.9473 8.36739 13 8.5 13H9.62C9.73283 13.4919 9.92863 13.9609 10.199 14.387L9.404 15.182C9.31026 15.2758 9.25761 15.4029 9.25761 15.5355C9.25761 15.6681 9.31026 15.7952 9.404 15.889L10.111 16.596C10.2048 16.6897 10.3319 16.7424 10.4645 16.7424C10.5971 16.7424 10.7242 16.6897 10.818 16.596L11.618 15.796C12.0422 16.0676 12.5096 16.2651 13 16.38V17.5C13 17.6326 13.0527 17.7598 13.1464 17.8536C13.2402 17.9473 13.3674 18 13.5 18H14.5C14.6326 18 14.7598 17.9473 14.8536 17.8536C14.9473 17.7598 15 17.6326 15 17.5V16.38C15.4919 16.2672 15.9609 16.0714 16.387 15.801L17.182 16.601C17.2758 16.6947 17.4029 16.7474 17.5355 16.7474C17.6681 16.7474 17.7952 16.6947 17.889 16.601L18.596 15.894C18.6897 15.8002 18.7424 15.6731 18.7424 15.5405C18.7424 15.4079 18.6897 15.2808 18.596 15.187L17.796 14.392C18.0686 13.9647 18.2662 13.4939 18.38 13H19.5C19.6326 13 19.7598 12.9473 19.8536 12.8536C19.9473 12.7598 20 12.6326 20 12.5V11.5C20 11.3674 19.9473 11.2402 19.8536 11.1464C19.7598 11.0527 19.6326 11 19.5 11ZM14 14.5C13.5055 14.5 13.0222 14.3534 12.6111 14.0787C12.2 13.804 11.8795 13.4135 11.6903 12.9567C11.5011 12.4999 11.4516 11.9972 11.548 11.5123C11.6445 11.0273 11.8826 10.5819 12.2322 10.2322C12.5819 9.8826 13.0273 9.6445 13.5123 9.54804C13.9972 9.45157 14.4999 9.50108 14.9567 9.6903C15.4135 9.87952 15.804 10.2 16.0787 10.6111C16.3534 11.0222 16.5 11.5055 16.5 12C16.5 12.663 16.2366 13.2989 15.7678 13.7678C15.2989 14.2366 14.663 14.5 14 14.5Z"
                    fill="currentColor"
                  />
                </svg>

                <span class="mx-4 font-medium">Settings</span>
              </a>
            </Link>

              <a class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
              <Popconfirm
                    title='Logout?'
                    description="Are you sure?"
                    placement="topRight"
                    okText="Logout"
                    okType="default"
                    danger
                    onConfirm={handleLogout}>
                      <button>Logout</button>
                  </Popconfirm>
              </a>
          </nav>
        </div>
      </aside>
      {/* <div class="flex flex-col overflow-hidden h-screen w-[230px] bg-white relative shadow-2xl sticky top-0">
        <div class="flex w-full justify-center space-x-1 items-end mt-5">
          <img src={logo} alt="userprofile" class="h-auto w-8"></img>
          <h1 class="text-gray-900 text-2xl font-medium">Avalon Hirings</h1>
          
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
      </div> */}
    </div>
  );
}

export default Sidebar;
