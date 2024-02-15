import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Avatar,
  Dropdown,
  Space,
  Divider,
  theme,
  Modal,
  Tooltip,
  Badge,
  message,
  Menu,
  Button,
} from "antd";
import { BellOutlined , ExclamationOutlined } from "@ant-design/icons";
import Logo from "../../images/A.png";
import Spinner from "../../Pages/ProfileSettings/Spinner";

// Dropdown for Profile Items
const { useToken } = theme;

// Main Function
function NavigationDashboard() {
  const [getProfile, setGetProfile] = useState([]);
  const [getEmployeeCaliber, setEmployeeCaliber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState([]);
  const [showSubscription, setShowSubscription] = useState(false);

  const [notify, setNotify] = useState("");
  const [notificationCount, setNotificationCount] = useState("");
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
      try {
        const respone = await fetch(
          `http://127.0.0.1:8000/app/viewprofile/${userType.user_id}`
        );
        const data = await respone.json();
        setGetProfile(data);
        console.log(data);
        const employee_caliber = data.employee_caliber?.caliber_level;
        if (employee_caliber && employee_caliber !== null) {
          setEmployeeCaliber(employee_caliber);
        } else {
          setEmployeeCaliber(null);
        }
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      }
    };

    // Getting the subscription details
    const fetchSubscriptionDetails = async () => {
      try {
        if (userType.user_type === "Client") {
          const response = await fetch(
            `http://127.0.0.1:8000/subscriptiondetails/${userType.user_id}`
          );
          const data = await response.json();
          setSubscriptionDetails(data);
        }
      } catch (error) {
        message.error(error.messsage);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      }
    };

    // Viewing Notifications

    // Update Notification

    viewprofile();
    fetchSubscriptionDetails();
    notification();
  }, [userType.user_id]);

  const notification = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/notification/${userType.user_id}`
      );
      const data = await response.json();
      setNotify(data);
      setNotificationCount(data.length);
    } catch (error) {
      message.error("Failed to load notifications");
    }
  };
  // Changing the notification count
  const updateNotification = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/updatenotification/${userType.user_id}`,
        {
          method: "POST",
          header: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }
      );
      await notification();
    } catch (error) {
      message.error("Failed To Update");
    }
  };

  // Rendering the notification items
  const renderNotificationMenuItem = (notification) => (
    <Menu.Item key={notification.id}>
      <div>
         
        <span className="text-xs">
        Date:{new Date(notification.timestamp).toLocaleDateString()}
        </span>
        : <span>{notification.message}</span>
      </div>
    </Menu.Item>
  );

  const renderNotificationDropdown = () => (
    <Menu style={{ maxHeight: 150, overflowY: "auto" }}>
      {notify.length===0  ? (<div className="flex items-center justify-center h-20 w-60">No New Notifications</div>) : (notify.map((notification) => renderNotificationMenuItem(notification)))}
    </Menu>
  );

  return (
    <nav class="z-50">
      {loading && <Spinner />}
      <div class="container fixed bg-white p-7 py-3 shadow-lg ">
        <div class="flex flex-row items-center justify-between h-8">
          <div class="flex flex-row items-center justify-start space-x-1 ">
            <img src={Logo} class="h-5" alt="FlowBite Logo" />
            <h4 class="text-lg font-bold text-sky-900 dark:text-sky-900">
              Avalon Hirings
            </h4>

            <div class="justify-self ">
              <Link to="/">
                <h1 class="h-full py-1 text-gray-500 text-xs ml-5  ">
                  VIEW WEBSITE
                </h1>
              </Link>
            </div>
            <div class="justify-self">
              {userType.user_type === "Client" ? (
                <Link to="/request-service">
                  <h1 class=" h-full py-1 text-xs ml-5 text-gray-500 rounded ">
                    REQUEST SERVICE
                  </h1>
                </Link>
              ) : null}
            </div>

            <div class="justify-self">
              {userType.user_type === "Admin" ? (
                <Link to="/create-service">
                  <h1 class=" h-full py-1 text-xs ml-5 text-gray-500 rounded  ">
                    CREATE SERVICE
                  </h1>
                </Link>
              ) : null}
            </div>

            <div class="justify-self">
              {userType.user_type === "Admin" ? (
                <Link to="/add-user">
                  <h1 class=" h-full py-1 text-xs ml-5 text-gray-500 rounded ">
                    ADD USERS
                  </h1>
                </Link>
              ) : null}
            </div>
          </div>

          <div class="flex space-x-6 items-center">
            {/* Notification */}
            <Dropdown
              overlay={renderNotificationDropdown}
              trigger={["click"]}
              // Preventing the dropdown from closing when clicking on the badge
              onClick={(e) => e.stopPropagation()}
              onVisibleChange={(visible) => {
                if (!visible) {
                  updateNotification();
                }
              }}
            >
              <Badge count={notificationCount} >
                <BellOutlined style={{ fontSize: "18px" }} />
              </Badge>
            </Dropdown>

            {/* Displaying User Name */}
            <h1 class="text-sm text-gray-900 font-bold">{userType.username}</h1>

            {/* User Profile DropDown */}
            <Dropdown
              menu={{
                items,
              }}
              trigger={["hover"]}
              size={["small"]}
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

            {/* Employee Caliber badge */}
            {getEmployeeCaliber !== null && (
              <>
                <Link to="/employee-review-ratings">
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
                </Link>
              </>
            )}

            {/* Client Subscription Badge */}
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
