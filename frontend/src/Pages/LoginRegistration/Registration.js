import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  message,
  Modal,
  Form,
  Input,
  Space,
  Divider,
  Popconfirm,
  Radio,
  Card,
  DatePicker,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Logo from "../../images/Abnw.png";
import Spinner from "../ProfileSettings/Spinner";
import { maxLength } from "khalti-checkout-web";
function Registration() {
  const rules = [
    {
      required: true,
      message: "required",
    },
  ];

  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [userType, setUserType] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [contact , setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");

  const userCreate = async () => {
    try {
      const registeredData = {
        fullname: fullName,
        user_type: userType,
        date_of_birth:new Date(dateOfBirth).toISOString().split('T')[0],
        email: email,
        contact: contact,
        password: password,
        username: userName, 
      };
      if (password === confirmPassword && contact.length === 10) {

        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/app/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registeredData),
        });
        setLoading(false);
        if(response.ok){
            const data = await response.json();
            message.success(data.message);
            navigate('/admin-dashboard')
        }
      } else {
        message.error("Wrong credentials. Try checking the passwords or the contact number!");
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  // File Download

  const downloadFile = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/app/downloadfile/");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "TermsAndConditions.txt");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <div class="flex h-screen mx-auto max-w-l bg-gradient-to-tl from-gray-900 to-sky-900 overflow-hidden">
        {loading && <Spinner />}
        <div class="h-screen w-2/3 shadow-lg bg-white justify-start p-10">
          <div class="flex flex-col items-start pb-2 md:mb-0">
          
            <span class="text-3xl font-medium whitespace-nowrap dark:text-dark-900">
              Want to become a member ? 
            </span>
            <span class="text-sm mt-2 dark:text-dark-900">
              Already have an account?{" "}
              <Link
                to="/login"
                href="#"
                class="font-medium text-blue-500 hover:text-blue-800 hover:underline"
              >
                Login here
              </Link>
            </span>
            <span class="mt-2 text-red-600">
                  Before you register , go through all the terms and conditions properly:{" "}
                  <span>
                    <Button onClick={downloadFile} icon={<DownloadOutlined />}>
                      Click Here
                    </Button>
                  </span>
                </span>
          </div>
          <div class="flex flex-col w-full overflow-auto text-sm">
            <Card  style={{ height: '500px' }}>
            <Form layout="vertical" onFinish={userCreate}>
                  <Form.Item label="Fullname" name="fullname" rules={rules}>
                    <Input onChange={(e) => setFullName(e.target.value)}/>
                  </Form.Item>

                  <Form.Item label="User Name" name="username" rules={rules}>
                    <Input onChange={(e) => setUserName(e.target.value)}/>
                  </Form.Item>

                  <Form.Item label="Email ID" name="emailid" rules={rules}>
                    <Input onChange={(e) => setEmail(e.target.value)}/>
                  </Form.Item>

                  <Form.Item
                    label="Contact Number"
                    name="contact"
                    rules={rules}
                  >
                    <Input onChange={(e)=>setContact(e.target.value)}/>
                  </Form.Item>

                  <Form.Item label="User-Type" name="usertype" rules={rules}>
                    <Radio.Group onChange={(e) => setUserType(e.target.value)}>
                      <Radio.Button value="Select" disabled>
                        Select:
                      </Radio.Button>
                      <Radio.Button value="Client">Client</Radio.Button>
                      <Radio.Button value="Employee">Employee</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    label="Date Of Birth"
                    name="dateofbirth"
                    rules={rules}
                  >
                    <DatePicker onChange={(date) => setDateOfBirth(date)} format="YYYY-MM-DD"/>
                  </Form.Item>

                  <Form.Item label="Password" name="password" rules={rules}>
                    <Input.Password onChange={(e) => setPassword(e.target.value)}/>
                  </Form.Item>

                  <Form.Item
                    label="Confirm Password"
                    name="confirmpassword"
                    rules={rules}
                  >
                    <Input.Password onChange={(e) => setConfirmPassword(e.target.value)}/>
                  </Form.Item>

                  <div class="flex flex-row justify-center w-full space-x-2">
                    <Button htmlType="submit" class="bg-sky-700 text-white p-2 hover:bg-sky-600 rounded w-full " >REGISTER</Button>
                  </div>
                </Form>
            </Card>
            

          </div>
        </div>

        <div class="flex flex-row  w-screen justify-center items-center ">
          <div class="mb-6 md:mb-0 items-center ">
            <a href="#" class="flex flex-row items-center">
              <img src={Logo} class="h-20 mr-2" alt="FlowBite Logo" />
              <span class="self-center text-6xl font-semibold whitespace-nowrap dark:text-white align-center">
                Avalon Hirings
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
