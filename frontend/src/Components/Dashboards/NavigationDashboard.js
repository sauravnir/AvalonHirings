import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, Dropdown, Space, Divider, theme, Modal, Tooltip } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Logo from "../../images/Abnw.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Dropdown for Profile Items
const { useToken } = theme;

// Main Function
function NavigationDashboard() {
  const [getProfile, setGetProfile] = useState([]);
  const [getEmployeeCaliber, setEmployeeCaliber] = useState(null);

  const [subscriptionDetails, setSubscriptionDetails] = useState([]);
  const [showSubscription, setShowSubscription] = useState(false);
  const listItem = [
    "Prioritize Service Requests",
    "Premium Service Plans",
    "Fast-track handling of your reports",
    "Quick response to support requests",
  ];
  const data = localStorage.getItem("userData");

  const userType = JSON.parse(data);

  //Token For Drop-down not API
  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusSM,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "0",
  };

  const items = [
    {
      key: "1",
      label: (
        <Link to="/userprofile">
          <div class="flex space-x-3 items-center">
            <img
              class="w-4 h-4 "
              src={require(`../../images/userprofile.png`)}
            ></img>
            <h1>User Profile</h1>
          </div>
        </Link>
      ),
    },
  ];

  // Getting the user profile
  useEffect(() => {
    const viewprofile = async () => {
      const respone = await fetch(
        `http://127.0.0.1:8000/app/viewprofile/${userType.user_id}`
      );
      const data = await respone.json();
      setGetProfile(data);
      const employee_caliber = data.employee_caliber?.caliber_level;
      if (
        employee_caliber &&
        employee_caliber !== null
      ) {
        setEmployeeCaliber(employee_caliber);
      } else {
        setEmployeeCaliber(null);
      }
    };

    viewprofile();
  }, []);

  // Getting the subscription details
  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/subscriptiondetails/${userType.user_id}`
        );
        const data = await response.json();
        setSubscriptionDetails(data);
      } catch (error) {
        toast.error("Unable To Fetch The Details");
      }
    };
    fetchSubscriptionDetails();
  }, []);

  return (
    <nav class="z-50">
      <div class="container fixed bg-gray-800 dark:bg-gray-800 p-7 py-3 shadow-lg ">
        <div class="flex flex-row items-center justify-between h-8">
          <div class="flex items-center justify-start space-x-1 ">
            <img src={Logo} class="h-5" alt="FlowBite Logo" />
            <h4 class=" text-lg font-medium text-gray-800 dark:text-gray-200">
              Avalon Hirings
            </h4>
            <div class="justify-self">
              {userType.user_type === "Client" ? (
                <Link to="/request-service">
                  <button class="bordered shadow h-full py-1 bg-white w-40 text-xs hover:text-white font-bold ml-5 rounded hover:bg-sky-900 ">
                    REQUEST A SERVICE?
                  </button>
                </Link>
              ) : null}
            </div>
          </div>

          <ToastContainer />

          <div class="flex space-x-4 items-center">
            <h1 class="text-white text-sm ">{userType.username}</h1>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              size={["large"]}
              dropdownRender={(menu) => (
                <div style={contentStyle}>
                  {React.cloneElement(menu, {
                    style: menuStyle,
                  })}
                  <Divider
                    style={{
                      margin: 0,
                    }}
                  />
                </div>
              )}
            >
              <button onClick={(e) => e.preventDefault()}>
                <Space>
                  <div class="border rounded-full">
                    <Avatar
                      size="medium"
                      icon={
                        <img
                          src={`http://127.0.0.1:8000${getProfile.profilepic}`}
                        ></img>
                      }
                    />
                  </div>
                </Space>
              </button>
            </Dropdown>

            {getEmployeeCaliber !== null && (
              <>
                {getEmployeeCaliber === "bronze" ? (
                  <div className="flex flex-row items-center rounded">
                    <Tooltip
                      title="Basic Level (Bronze)"
                      placement="leftBottom"
                    >
                      <button>
                        <img
                          className="w-7 h-7"
                          src={require(`../../images/bronze.png`)}
                          alt="Bronze"
                        />
                      </button>
                    </Tooltip>
                  </div>
                ) : getEmployeeCaliber === "silver" ? (
                  <div className="flex flex-row items-center rounded">
                    <Tooltip
                      title="Intermediate Level (Silver)"
                      placement="leftBottom"
                    >
                      <button>
                        <img
                          className="w-7 h-7"
                          src={require(`../../images/silver.png`)}
                          alt="Silver"
                        />
                      </button>
                    </Tooltip>
                  </div>
                ) : getEmployeeCaliber === "gold" ? (
                  <div className="flex flex-row items-center rounded">
                    <Tooltip title="Top Level (Gold)" placement="leftBottom">
                      <button>
                        <img
                          className="w-7 h-7"
                          src={require(`../../images/gold.png`)}
                          alt="Gold"
                        />
                      </button>
                    </Tooltip>
                  </div>
                ) : null}
              </>
            )}

            {subscriptionDetails.is_subscribed === true ? (
              <div class="flex flex-row justify-end">
                <div class="flex flex-row items-center rounded w-fit p-2 justify-end">
                  <button
                    onClick={() => setShowSubscription(true)}
                    class="flex flex-row items-center"
                  >
                    <img
                      class="w-6 h-6"
                      src={require(`../../images/subscribe.png`)}
                      alt="Subscribe"
                    ></img>
                  </button>
                  <Modal
                    open={showSubscription}
                    onCancel={() => setShowSubscription(false)}
                    footer={null}
                    width={400}
                  >
                    <div class="flex flex-col bg-violet-950 rounded-3xl  items-center justify-center w-full">
                      <div class="flex flex-row items-center space-x-3 p-10">
                        <button class="flex justify-center w-20 h-20 rounded-3xl items-center item bg-gradient-to-br from-orange-300 via-amber-400 to-yellow-500">
                          <img
                            class="w-10 h-10"
                            src={require(`../../images/subscribe.png`)}
                          ></img>
                        </button>
                        <div class="flex flex-col">
                          <h1 class="text-xl font-bold text-white">Premium</h1>
                          <h1 class="text-4xl font-bold text-amber-400">
                            Rs.2000
                            <span class="text-white text-xl"> /only</span>
                          </h1>
                        </div>
                      </div>

                      <div class="flex flex-col items-center space-y-4 mb-5">
                        <h1 class="text-sm text-white ">
                          Premium Subscription Plan
                        </h1>
                        <hr class="w-full border-t  border-white" />
                        <ul>
                          {listItem.map((item, index) => (
                            <li
                              class="flex flex-row items-center text-amber-400 text-sm p-2"
                              key={index}
                            >
                              <img
                                src={require(`../../images/list.png`)}
                                class="w-3 h-3 mr-2"
                              ></img>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <hr class="w-full border-t border-white" />
                        <button
                          class="bg-amber-400 rounded-2xl hover:bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-600 p-3 font-bold text-white hover:text-gray-900"
                          disabled
                        >
                          ALREADY SUBSCRIBED
                        </button>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationDashboard;
