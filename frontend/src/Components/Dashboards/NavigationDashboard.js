import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  Avatar,
  Dropdown,
  Space,
  Divider,
  Button,
  theme,
  Popconfirm,
} from "antd";
import Logo from "../../images/Abnw.png";
// Dropdown for Profile Items
const { useToken } = theme;

// Main Function
function NavigationDashboard() {
  const navigate = useNavigate();

  const data = localStorage.getItem("userData");
  console.log(data);
  const userType = JSON.parse(data);
  console.log(userType);
  // Handling the Logout Of The User
  const handleLogout = async (e) => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
          <h1>User Profile</h1>
        </Link>
      ),
    },
  ];

  // Logout Pop-Confirm
  return (
    <nav class="z-50">
      <div class="container fixed bg-sky-900 dark:bg-sky-900 p-7 py-1 shadow-lg ">
        <div class="flex flex-row items-center justify-between h-8">
          <div class="flex items-center justify-start space-x-1 ">
            <img src={Logo} class="h-5" alt="FlowBite Logo" />
            <h4 class=" text-sm font-medium text-gray-800 dark:text-gray-200">
              Avalon Hirings
            </h4>
          </div>

          <div class="justify-self">
            {userType.user_type === "Client" ? (
              <Link to="/request-service">
                <button class="bordered shadow  py-1 bg-white w-60 text-xs hover:text-white font-bold ml-5 rounded hover:bg-sky-900 ">
                  REQUEST A SERVICE?
                </button>
              </Link>
            ) : null}
          </div>

          <div class="flex space-x-5 items-center">
            {/* <img
              class="w-5"
              src={require(`../../images/notification.png`)}
            ></img> */}
            <h1 class="text-white text-sm ">{userType.username}</h1>
            <Dropdown
              menu={{
                items,
              }}
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
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar size="small" icon={<UserOutlined />} />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationDashboard;
