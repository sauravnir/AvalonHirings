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
// Importing static logos/images
import logout from "../../images/icons/logout.png";

// Dropdown for Profile Items
const { useToken } = theme;

// Main Function
function NavigationDashboard() {
  const navigate = useNavigate();

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
        <Link to="/dashboard">
          <h1>User Profile</h1>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Popconfirm
          title="Logout?"
          description="Are you sure?"
          placement="bottomRight"
          okText="Logout"
          okType="default"
          danger
          onConfirm={handleLogout}
          icon={
            <QuestionCircleOutlined
              style={{
                color: "red",
              }}
            />
          }
        >
          Logout?
        </Popconfirm>
      ),
    },
  ];

  // Logout Pop-Confirm
  return (
    <nav class="z-50">
      <div class="w-full fixed bg-gray-50 dark:bg-gray-50 p-2  shadow-lg">
        <div class="flex justify-between">
          <div class="flex flex-row space-x-3 items-center ">
            <div class="w-5">
              <img src={require(`../../images/notification.png`)}></img>
            </div>
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
                  <Avatar size="medium" icon={<UserOutlined />} />
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
