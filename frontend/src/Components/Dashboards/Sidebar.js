import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Popconfirm, Spin } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

function Sidebar() {
  //Retrieving stored data from the local Storage
  const storedDataString = localStorage.getItem("userData");
  const userData = JSON.parse(storedDataString);

  const navigate = useNavigate();

  // Handling the Logout Of The User
  const handleLogout = async (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("isFirstPageLoad");
    localStorage.removeItem("is_subscribed");
    navigate("/login");
  };

  const [isOpen1, setIsOpen1] = useState(false);

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

  return (
    <div class="xl-sticky top-0">
      <aside class=" container flex sticky top-0 flex-col w-60  h-screen p-2 overflow-y-auto bg-sky-950 dark:bg-sky-950  ">
        <div class="flex flex-col justify-between flex-1 ">
          {/* For Admin user type */}
          {userData.user_type === "Admin" && (
            <nav class="text-sm mt-16">
              <Link to="/admin-dashboard">
                <a class="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                  >
                    <path
                      d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span class="mx-4 font-medium">Dashboard</span>
                </a>
              </Link>

              <Link to="/announcements">
                <a class="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ">
                  <svg
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 13.9999L5.57465 20.2985C5.61893 20.4756 5.64107 20.5642 5.66727 20.6415C5.92317 21.397 6.60352 21.9282 7.39852 21.9933C7.4799 21.9999 7.5712 21.9999 7.75379 21.9999C7.98244 21.9999 8.09677 21.9999 8.19308 21.9906C9.145 21.8982 9.89834 21.1449 9.99066 20.193C10 20.0967 10 19.9823 10 19.7537V5.49991M18.5 13.4999C20.433 13.4999 22 11.9329 22 9.99991C22 8.06691 20.433 6.49991 18.5 6.49991M10.25 5.49991H6.5C4.01472 5.49991 2 7.51463 2 9.99991C2 12.4852 4.01472 14.4999 6.5 14.4999H10.25C12.0164 14.4999 14.1772 15.4468 15.8443 16.3556C16.8168 16.8857 17.3031 17.1508 17.6216 17.1118C17.9169 17.0756 18.1402 16.943 18.3133 16.701C18.5 16.4401 18.5 15.9179 18.5 14.8736V5.1262C18.5 4.08191 18.5 3.55976 18.3133 3.2988C18.1402 3.05681 17.9169 2.92421 17.6216 2.88804C17.3031 2.84903 16.8168 3.11411 15.8443 3.64427C14.1772 4.55302 12.0164 5.49991 10.25 5.49991Z"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span class="mx-4 font-medium">Announcements</span>
                </a>
              </Link>

              <div className="relative inline-block text-left">
                <button
                  type="button"
                  onClick={toggleDropdown1}
                  className="flex items-center  px-4 py-2 mt-5 text-white  transition-colors duration-300 transform rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                >
                  <svg
                    class="w-5 h-5"
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
                  <span className="mx-4 font-medium">Users & Requests</span>
                </button>

                {isOpen1 && (
                  <div className="flex  items-center px-4 py-2 text-gray-600 ">
                    {/* Dropdown content goes here */}
                    <div className="py-1">
                      <Link to="/admin-contractreview">
                        <button className="flex flex-row text-white items-center block px-4 py-2 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                          {/* <img
                            class="w-5 h-5 mr-3"
                            src={require(`../../images/userrequest.png`)}
                          ></img> */}
                          Member Requests
                        </button>
                      </Link>

                      <Link to="/all-users">
                        {/* <img src={require(``)}></img> */}
                        <button className="flex flex-row items-center text-white w-full block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                          {/* <img
                            class="w-5 h-5 mr-3"
                            src={require(`../../images/users.png`)}
                          ></img> */}
                          All Users
                        </button>
                      </Link>
                      <Link to="/add-user">
                        {/* <img src={require(``)}></img> */}
                        <a className="flex flex-row block px-4 py-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                          {/* <img
                            class="w-5 h-5 mr-3"
                            src={require(`../../images/adduser.png`)}
                          ></img> */}
                          Add User
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="flex items-center  px-4 py-2 mt-5 text-white  transition-colors duration-300 transform rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                >
                  <svg
                    className="w-5 h-5"
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
                  <span className="mx-4 font-medium">Ratings and Services</span>
                </button>

                {isOpen && (
                  <div className="flex flex-row items-center px-4 py-2 text-gray-600 ">
                    {/* Dropdown content goes here */}
                    <div className="py-1">
                      <Link to="/create-service">
                        <a className="flex items-center text-white flex-row block px-4 py-2 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                          {/* <img
                            class="w-6 h-6 mr-3"
                            src={require(`../../images/add.png`)}
                          ></img> */}
                          Add / View services
                        </a>
                      </Link>

                      <Link to="/ratings">
                        {/* <img src={require(``)}></img> */}
                        <a className="flex flex-row block px-4 text-white  py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                          {/* <img
                            class="w-5 h-5 mr-4"
                            src={require(`../../images/view.png`)}
                          ></img> */}
                          View Ratings
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  onClick={toggleDropdown2}
                  className="flex items-center  px-4 py-2 mt-5 text-white  transition-colors duration-300 transform rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                >
                  <svg
                    class="w-5 h-5 "
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
                  <span className="mx-4 font-medium">Transactions</span>
                </button>
                {isOpen2 && (
                  <div className="flex flex-row items-center px-4 py-2 text-gray-600 ">
                    {/* Dropdown content goes here */}
                    <div className="py-1">
                      <Link to="/admin-payment">
                        <a className="flex items-center text-white flex-row block px-4 py-2 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                          {/* <img
                            class="w-6 h-6 mr-3"
                            src={require(`../../images/add.png`)}
                          ></img> */}
                          All Transactions
                        </a>
                      </Link>

                      <Link to="/create-transaction">
                        {/* <img src={require(``)}></img> */}
                        <a className="flex flex-row block text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                          {/* <img
                            class="w-5 h-5 mr-4"
                            src={require(`../../images/view.png`)}
                          ></img> */}
                          Create Transaction
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/admin-view-reports">
                <a
                  class="flex items-center px-4 py-2 text-white mt-5 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  href="#"
                >
                  <svg
                    class="w-5 h-5 "
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

              {/* <Link to="/admin-dashboard">
                <a
                  class="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  href="#"
                >
                  <svg
                    class="w-5 h-5 "
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
              </Link> */}
            </nav>
          )}

          {/* For Employee User Type */}
          {userData.user_type === "Employee" && (
            <nav class="text-sm mt-16">
              <Link to="/employee-dashboard">
                <a class="flex items-center text-white px-4 py-2 mt-5  transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
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

              <Link to="/employee-announcement">
                <a class="flex items-center px-4 py-2 mt-5 text-white  transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ">
                  <svg
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 13.9999L5.57465 20.2985C5.61893 20.4756 5.64107 20.5642 5.66727 20.6415C5.92317 21.397 6.60352 21.9282 7.39852 21.9933C7.4799 21.9999 7.5712 21.9999 7.75379 21.9999C7.98244 21.9999 8.09677 21.9999 8.19308 21.9906C9.145 21.8982 9.89834 21.1449 9.99066 20.193C10 20.0967 10 19.9823 10 19.7537V5.49991M18.5 13.4999C20.433 13.4999 22 11.9329 22 9.99991C22 8.06691 20.433 6.49991 18.5 6.49991M10.25 5.49991H6.5C4.01472 5.49991 2 7.51463 2 9.99991C2 12.4852 4.01472 14.4999 6.5 14.4999H10.25C12.0164 14.4999 14.1772 15.4468 15.8443 16.3556C16.8168 16.8857 17.3031 17.1508 17.6216 17.1118C17.9169 17.0756 18.1402 16.943 18.3133 16.701C18.5 16.4401 18.5 15.9179 18.5 14.8736V5.1262C18.5 4.08191 18.5 3.55976 18.3133 3.2988C18.1402 3.05681 17.9169 2.92421 17.6216 2.88804C17.3031 2.84903 16.8168 3.11411 15.8443 3.64427C14.1772 4.55302 12.0164 5.49991 10.25 5.49991Z"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span class="mx-4 font-medium">Announcements</span>
                </a>
              </Link>

              <Link to="/employee-work-schedule">
                <a
                  class="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  href="#"
                >
                  <svg
                    class="w-5 h-5"
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

                  <span class="mx-4 font-medium">Work Schedules</span>
                </a>
              </Link>

              <Link to="/employee-review-ratings">
                <a
                  class="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  href="#"
                >
                  <svg
                    class="w-5 h-5 "
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

                  <span class="mx-4 font-medium">Caliber / Tier</span>
                </a>
              </Link>

              <Link to="/employee-transaction">
                <a
                  class="flex items-center px-4 py-2 mt-5 text-white  transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  href="#"
                >
                  {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" /> */}
                  <svg
                    class="w-5 h-5 "
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
                  <span class="mx-4 font-medium">Transactions</span>
                </a>
              </Link>

              <Link to="/employee-reports">
                <a
                  class="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  href="#"
                >
                  <svg
                    class="w-5 h-5 "
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

                  <span class="mx-4 font-medium">Issue Reports</span>
                </a>
              </Link>
            </nav>
          )}

          {/* Client Type  */}
          {userData.user_type === "Client" && (
            <nav class="text-sm mt-16 ">
              <Link to="/client-dashboard">
                <a class="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-300 transform rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 active:bg-violet-700 active:text-white">
                  {" "}
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

              <Link to="/client-announcement">
                <a class="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ">
                  <svg
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 13.9999L5.57465 20.2985C5.61893 20.4756 5.64107 20.5642 5.66727 20.6415C5.92317 21.397 6.60352 21.9282 7.39852 21.9933C7.4799 21.9999 7.5712 21.9999 7.75379 21.9999C7.98244 21.9999 8.09677 21.9999 8.19308 21.9906C9.145 21.8982 9.89834 21.1449 9.99066 20.193C10 20.0967 10 19.9823 10 19.7537V5.49991M18.5 13.4999C20.433 13.4999 22 11.9329 22 9.99991C22 8.06691 20.433 6.49991 18.5 6.49991M10.25 5.49991H6.5C4.01472 5.49991 2 7.51463 2 9.99991C2 12.4852 4.01472 14.4999 6.5 14.4999H10.25C12.0164 14.4999 14.1772 15.4468 15.8443 16.3556C16.8168 16.8857 17.3031 17.1508 17.6216 17.1118C17.9169 17.0756 18.1402 16.943 18.3133 16.701C18.5 16.4401 18.5 15.9179 18.5 14.8736V5.1262C18.5 4.08191 18.5 3.55976 18.3133 3.2988C18.1402 3.05681 17.9169 2.92421 17.6216 2.88804C17.3031 2.84903 16.8168 3.11411 15.8443 3.64427C14.1772 4.55302 12.0164 5.49991 10.25 5.49991Z"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span class="mx-4 font-medium">Announcements</span>
                </a>
              </Link>

              <div className="relative inline-block text-left w-full">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="flex items-center w-full px-4 py-2 mt-5 text-white transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                >
                  <svg
                    class="w-5 h-5 "
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
                  <span className="mx-4 font-medium">Services</span>
                </button>

                {isOpen && (
                  <div className="flex  items-center px-4 py-2 text-gray-600 ">
                    {/* Dropdown content goes here */}
                    <div className="py-1">
                      <Link to="/request-service">
                        <a className="flex flex-row items-center block text-white px-4 py-2 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                          {/* <img
                            class="w-6 h-6 mr-3 "
                            src={require(`../../images/add.png`)}
                          ></img> */}
                          Request Service
                        </a>
                      </Link>

                      <Link to="/client-view-service">
                        <a className="flex flex-row items-center text-white block px-4 py-2 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                          {/* <img
                            class="w-5 h-5 mr-4"
                            src={require(`../../images/status.png`)}
                          ></img> */}
                          Progress / Status
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link to="/client-transaction">
                <a
                  class="flex items-center px-4 py-2 mt-5 text-white  transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  href="#"
                >
                  {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" /> */}
                  <svg
                    class="w-5 h-5 "
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
                  <span class="mx-4 font-medium">Transactions</span>
                </a>
              </Link>

              <Link to="/client-reports">
                <a
                  class="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  href="#"
                >
                  <svg
                    class="w-5 h-5"
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
            </nav>
          )}

          <div className="flex flex-row p-4">
            <Popconfirm
              title="Logout?"
              description="Are you sure?"
              placement="topRight"
              okText="Logout"
              okType="default"
              danger
              onConfirm={handleLogout}
            >
              <Button
                className="w-full text-white hover:bg-red-900"
                icon={<LogoutOutlined />}
              >
                Logout
              </Button>
            </Popconfirm>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
