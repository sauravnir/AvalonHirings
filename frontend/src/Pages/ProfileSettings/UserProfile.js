import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Tabs, Card } from "antd";
import Sidebar from "../../Components/Dashboards/Sidebar";
import NavigationDashboard from "../../Components/Dashboards/NavigationDashboard";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function UserProfile() {
  const [newPass, setNewPass] = useState("");
  const [newConfirmPass, setNewConfirmPass] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [getProfile, setGetProfile] = useState([]);
  const navigate = useNavigate();
  const { TabPane } = Tabs;
  const data = localStorage.getItem("userData");

  const userType = JSON.parse(data);

  const updatePassword = {
    password: newPass,
    username: userType.username,
  };

  // Handle Password Update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      if (newPass === newConfirmPass) {
        const res = await fetch("http://127.0.0.1:8000/app/updateprofile/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatePassword),
        });

        if (res.ok) {
          if (userType.user_type == "Employee") {
            navigate("/employee-dashboard");
          } else if (userType.user_type == "Client") {
            navigate("/client-dashboard");
          } else {
            navigate("/admin-dashboard");
          }
        } else {
          toast.error("Please use a different password!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Load User Profile

  useEffect(() => {
    const viewprofile = async () => {
      const respone = await fetch(
        `http://127.0.0.1:8000/app/viewprofile/${userType.user_id}`
      );
      const data = await respone.json();
      setGetProfile(data);
    };

    viewprofile();
  }, []);

  // Update Profile Picture

  const updatePicture = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", userType.username);
      formData.append("profilepicture", profilePic);
      const response = await fetch(
        `http://127.0.0.1:8000/app/updateprofilepicture/`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        if (userType.user_type == "Employee") {
          navigate("/employee-dashboard");
        } else if (userType.user_type == "Client") {
          navigate("/client-dashboard");
        } else {
          navigate("/admin-dashboard");
        }
      } else {
        toast.error("Please Select a Picture");
      }
    } catch (error) {}
  };

  const TabList = [
    {
      key: "1",
      label: "Profile Details",
      children: (
        <TabPane tab="Profile Details" key="1">
          <div class="p-5 items-center">
            <Form>
              <Form.Item label="Fullname:">
                <Input
                  value={getProfile.fullname}
                  default={getProfile.fullname}
                />
              </Form.Item>
              <Form.Item label="Username">
                <Input
                  value={getProfile.username}
                  default={getProfile.username}
                />
              </Form.Item>
              <Form.Item label="Email-Id">
                <Input value={getProfile.email} default={getProfile.email} />
              </Form.Item>
              <Form.Item label="Contact No.">
                <Input
                  value={getProfile.contact}
                  default={getProfile.contact}
                />
              </Form.Item>
              <Form.Item label="Date of Birth">
                <Input
                  value={getProfile.date_of_birth}
                  default={getProfile.date_of_birth}
                />
              </Form.Item>
            </Form>
            <div class="flex justify-center">
              <button
                class="text-white px-4 py-2 rounded bordered bg-green-600"
                onClick={updatePicture}
              >
                Update Profile Picture
              </button>
            </div>
          </div>
        </TabPane>
      ),
    },
    {
      key: "2",
      label: "Change Password",
      children: (
        <TabPane tab="Change Password" key="2">
          <div class="p-5 items-center">
          <form onSubmit={handleProfileUpdate}>
            <Form.Item label="New Password">
              <Input.Password onChange={(e) => setNewPass(e.target.value)} />
            </Form.Item>
            <Form.Item label="Confirm Password">
              <Input.Password
                onChange={(e) => setNewConfirmPass(e.target.value)}
              />
            </Form.Item>
            <div class="flex justify-center">
              <button
                class="text-white px-4 py-2 rounded bordered bg-green-600"
                type="submit"
              >
                Save Changes
              </button>
            </div>
          </form>
          </div>
          
        </TabPane>
      ),
    },
  ];

  return (
    <div class="bg-zinc-100 flex">
      <NavigationDashboard />
      <Sidebar />
      <ToastContainer position="top-center" />
      <div class="flex flex-row justify-center py-5 w-screen mt-20 ">
        <div class="shadow border w-1/2 rounded bg-white">
          <div class="border">
            <div class="flex flex-col items-center">
              <div
                class="flex items-center justify-center "
                style={{
                  backgroundImage: `url(${require("../../images/profilebackground.jpg")})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "300px",
                }}
              >
                {/* <img src={require(`../../images/profilebackground.jpg`)}></img> */}
                <div class="flex flex-col relative items-center justify-center">
                  <a href={`http://127.0.0.1:8000${getProfile.profilepic}`}>
                    <img
                      class="w-40 h-40 mb-3 rounded-full shadow-2xl border object-cover"
                      src={`http://127.0.0.1:8000${getProfile.profilepic}`}
                      alt="User Profile"
                    ></img>
                  </a>
                  <label
                    for="profilePictureInput"
                    class="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                  >
                    <form enctype="multipart/form-data">
                      <input
                        type="file"
                        id="profilePictureInput"
                        class="text-sm"
                        onChange={(e) => setProfilePic(e.target.files[0])}
                      ></input>
                    </form>
                  </label>
                  <h1 class="hover:underline text-lg">{getProfile.fullname}</h1>
                  <h1 class="text-sm text-gray-600 ">{getProfile.email}</h1>
                </div>
              </div>
            </div>
          </div>
          <Card>
            <Tabs>{TabList.map((tab) => tab.children)}</Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
