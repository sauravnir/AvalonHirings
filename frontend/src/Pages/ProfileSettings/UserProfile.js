import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Tabs, Card , message } from "antd";
import Sidebar from "../../Components/Dashboards/Sidebar";
import NavigationDashboard from "../../Components/Dashboards/NavigationDashboard";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function UserProfile() {
  const rules = [{
    required : true ,
    message : "required"
  }]
  const [newPass, setNewPass] = useState("");
  const [newConfirmPass, setNewConfirmPass] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [getProfile, setGetProfile] = useState([]);
  const [subscriptionDetails , setSubscriptionDetails] = useState([]);
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
          toast.error("Enter Valid Credentials!");
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
        message.error("Select a profile picture")
      }
    } catch (error) {
      message.error(error.message)
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
              <Button className ="text-white rounded bg-sky-900 hover:bg-sky-700" onClick={updatePicture}>
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
            <Form layout="vertical">
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
                <Button htmlType="submit" className = "text-white bg-sky-900 hover:bg-sky-700 rounded">
                Change Password
                </Button>
              </div>
            </form>
            </Form>
            
          </div>
        </TabPane>
      ),
    },
  ];

  // Handle Suubscription Details

  useEffect(()=>{
    const fetchSubscriptionDetails = async () =>{
      try{
        const response = await fetch(`http://127.0.0.1:8000/subscriptiondetails/${userType.user_id}`)
        const data = await response.json()
        setSubscriptionDetails(data);
        console.log(subscriptionDetails)
      }catch(error){
        toast.error("Unable To Fetch The Details")
      }
    }
    fetchSubscriptionDetails();
  },[])



  return (
    <div class="bg-zinc-100 flex">
      <NavigationDashboard />
      <Sidebar />
      <ToastContainer position="top-center" />
      <div class="flex flex-row justify-center py-5 w-screen mt-20">
  <div class="shadow border w-1/2 rounded bg-white">
    <div class="border">
      <div class="flex flex-col items-center bg-sky-800">
        
        {subscriptionDetails.is_subscribed === true ? <div class="flex bg-gradient-to-r from-amber-400 to-orange-500 w-full p-2 justify-center">
          
          <button class="flex flex-row space-x-3 items-center">
            <img class="w-7 h-7" src={require(`../../images/subscribe.png`)} alt="Subscribe"></img>
            <h1 class="text-sm font-bold">PREMIUM MEMBER</h1>
          </button>

        </div> :null}
      
          <div class="flex flex-col relative items-center justify-center p-5">
            <img
              class="w-40 h-40 mb-3 rounded-full shadow-2xl border object-cover"
              src={`http://127.0.0.1:8000${getProfile.profilepic}`}
              alt="User Profile"
            ></img>

            <label
              for="profilePictureInput"
              class="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
            >
              <Form enctype="multipart/form-data">
                <Form.Item label="Profile Picture" name="profile" rules={rules}>

                <Input
                  type="file"
                  id="profilePictureInput"
                  class="text-sm"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
                </Form.Item>
              </Form>
            </label>
            <h1 class="hover:underline text-white text-lg">{getProfile.fullname}</h1>
            <h1 class="text-sm text-zinc-200 ">{getProfile.email}</h1>
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
