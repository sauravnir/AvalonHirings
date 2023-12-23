import React from "react";
import { Link , useNavigate } from "react-router-dom";

import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space, Divider, Button, theme, Popconfirm } from "antd";
// Importing static logos/images
import logout from "../../images/icons/logout.png";

// Dropdown for Profile Items
const { useToken } = theme;
const items = [
  {
    key: "1",
    label:<Link to='/dashboard'><h1>User Profile</h1></Link>,
  },

];
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

  // Logout Pop-Confirm
  return (
    <nav class="sticky top-0 relative z-0 ">
      <div class="fixed w-full z-30 flex bg-gray-50 dark:bg-gray-50 p-2  shadow-lg h-14 px-10">
        <div class="flex h-full text-center flex">
          <div class="flex flex-row space-x-5 items-center justify-items-end ">
            <h1 class='hover:underline'>Saurav</h1>
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
                  <Space
                    style={{
                      padding: 10,
                    }}
                  ><Popconfirm
                    title='Logout?'
                    description="Are you sure?"
                    placement="bottomRight"
                    okText="Logout"
                    okType="default"
                    danger
                    onConfirm={handleLogout}
                    icon={
                      <QuestionCircleOutlined
                       style={{
                        color:'red'
                       }} 
                      
                      />                    }
                  >
                      <Button danger type="primary">Logout</Button>
                  </Popconfirm>
                    
                  </Space>
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
