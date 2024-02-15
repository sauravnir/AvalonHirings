import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Tabs, Card, message } from "antd";
import Sidebar from "../../Components/Dashboards/Sidebar";
import NavigationDashboard from "../../Components/Dashboards/NavigationDashboard";
function UserProfile() {
  const rules = [
    {
      required: true,
      message: "required",
    },
  ];
  const [newPass, setNewPass] = useState("");
  const [newConfirmPass, setNewConfirmPass] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [getProfile, setGetProfile] = useState([]);
  const [subscriptionDetails, setSubscriptionDetails] = useState([]);
  const navigate = useNavigate();
  const { TabPane } = Tabs;
  const data = localStorage.getItem("userData");

  const userType = JSON.parse(data);

  const [getEmployeeCaliber, setEmployeeCaliber] = useState("");

  const updatePassword = {
    password: newPass,
    username: userType.username,
  };

  // Handle Password Update
  const handleProfileUpdate = async () => {
    try {
      const symbolRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
      if (newPass === newConfirmPass) {
        if (newPass.length >= 8) {
          if (symbolRegex.test(newPass)) {
            const res = await fetch("http://127.0.0.1:8000/app/updateprofile/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatePassword),
            });
  
            if (res.ok) {
              message.success("Password Changed Successfully!");
              if (userType.user_type === "Employee") {
                navigate("/employee-dashboard");
              } else if (userType.user_type === "Client") {
                navigate("/client-dashboard");
              } else {
                navigate("/admin-dashboard");
              }
            }
          } else {
            message.error("The Passwords Should Contain Special Characters!");
          }
        } else {
          message.error("Password should be greater than 8 characters!");
        }
      } else {
        message.error("The Passwords Should Match!");
      }
    } catch (error) {
      message.error("An error occurred while updating the password!");
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
      const employee_caliber = data.employee_caliber?.caliber_level;
      if (employee_caliber && employee_caliber !== null) {
        setEmployeeCaliber(employee_caliber);
      } else {
        setEmployeeCaliber(null);
      }
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
        message.success("Profile Picture Updated Successfully");
        if (userType.user_type == "Employee") {
          navigate("/employee-dashboard");
        } else if (userType.user_type == "Client") {
          navigate("/client-dashboard");
        } else {
          navigate("/admin-dashboard");
        }
      } else {
        message.error("Select a profile picture");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const TabList = [
    {
      key: "1",
      label: "Profile Details",
      children: (
        <TabPane tab="Profile Details" key="1">
          <div class="p-5 items-center">
            <Form layout="vertical">
              <Form.Item label="Full Name:">
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
              <Button
                className="text-white rounded bg-sky-900 hover:bg-sky-700"
                onClick={updatePicture}
              >
                Update Profile Picture
              </Button>
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
            <Form layout="vertical" onFinish={handleProfileUpdate}>
                <Form.Item label="New Password">
                  <Input.Password
                    onChange={(e) => setNewPass(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Confirm Password">
                  <Input.Password
                    onChange={(e) => setNewConfirmPass(e.target.value)}
                  />
                </Form.Item>
                <div class="flex justify-center">
                  <Button
                    htmlType="submit"
                    className="text-white bg-sky-900 hover:bg-sky-700 rounded"
                  >
                    Change Password
                  </Button>
                </div>
            </Form>
          </div>
        </TabPane>
      ),
    },
  ];

  // Handle Subscription Details
  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/subscriptiondetails/${userType.user_id}`
        );
        const data = await response.json();
        setSubscriptionDetails(data);
        console.log(subscriptionDetails);
      } catch (error) {
        message.error("Unable To Fetch Details")
      }
    };
    fetchSubscriptionDetails();
  }, []);

  return (
    <div class="bg-zinc-100 flex">
      <NavigationDashboard />
      <Sidebar />
      <div class="flex flex-row justify-center py-5 w-screen mt-20">
        <div class="shadow border w-1/2 rounded bg-white">
          <div class="border">
            <div class="flex flex-col items-center bg-sky-800">
              {subscriptionDetails.is_subscribed === true ? (
                <div class="flex bg-gradient-to-r from-amber-400 to-orange-500 w-full p-2 justify-center">
                  <button class="flex flex-row space-x-3 items-center">
                    <img
                      class="w-7 h-7"
                      src={require(`../../images/subscribe.png`)}
                      alt="Subscribe"
                    ></img>
                    <h1 class="text-sm font-bold">PREMIUM MEMBER</h1>
                  </button>
                </div>
              ) : null}

              <div class="flex flex-col relative items-center justify-center p-5">
                <div class="relative">
                  <img
                    class="w-40 h-40 mb-3 rounded-full shadow-2xl border object-cover"
                    src={`http://127.0.0.1:8000${getProfile.profilepic}`}
                    alt="User Profile"
                  />
                  {/* Camera icon */}
                  <label
                    for="profilePictureInput"
                    class="absolute bottom-0 right-0 p-2 cursor-pointer"
                  >
                    <svg
                      class="w-10 h-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21ZM12 9.27273C9.69881 9.27273 7.83333 11.1043 7.83333 13.3636C7.83333 15.623 9.69881 17.4545 12 17.4545C14.3012 17.4545 16.1667 15.623 16.1667 13.3636C16.1667 11.1043 14.3012 9.27273 12 9.27273ZM12 10.9091C10.6193 10.9091 9.5 12.008 9.5 13.3636C9.5 14.7192 10.6193 15.8182 12 15.8182C13.3807 15.8182 14.5 14.7192 14.5 13.3636C14.5 12.008 13.3807 10.9091 12 10.9091ZM16.7222 10.0909C16.7222 9.63904 17.0953 9.27273 17.5556 9.27273H18.6667C19.1269 9.27273 19.5 9.63904 19.5 10.0909C19.5 10.5428 19.1269 10.9091 18.6667 10.9091H17.5556C17.0953 10.9091 16.7222 10.5428 16.7222 10.0909Z"
                        fill="#ffffff"
                      />
                    </svg>
                   
                    <input
                      type="file"
                      id="profilePictureInput"
                      class="hidden"
                      onChange={(e) => setProfilePic(e.target.files[0])}
                    />
                  </label>
                </div>
                <h1 class="hover:underline text-white text-lg">
                  {getProfile.fullname}
                </h1>
                <h1 class="text-sm text-zinc-200">{getProfile.email}</h1>
              </div>

              {/* </div> */}
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
