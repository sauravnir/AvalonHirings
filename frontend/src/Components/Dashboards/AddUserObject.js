import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Breadcrumb
} from "antd";
import {  
  CheckOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
  HomeOutlined
} from "@ant-design/icons";
import Spinner from "../../Pages/ProfileSettings/Spinner";
import DashboardFooter from "./DashboardFooter";

function AddUserObject() {
  const rules = [
    {
      required: true,
      message: "required",
    },
  ];

  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [userType, setUserType] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
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

  return (
    <div class="w-screen mt-8">
      {loading && <Spinner />}
      <div class="flex flex-col mt-2 p-6">
        <div class="flex flex-row justify-between items-center py-3">
          <h1 class="text-xl font-bold">Add User</h1>
          <Breadcrumb items={[
              {
                href:"/admin-dashboard",
                title:<HomeOutlined />
              },
              {
                title:"Users & Requests"
              },
              {
                href:"/add-user",
                title:"Add User"
              }
              ]}/>
        </div>
        <div class="grid p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
          <div class="m-1">
            <Card title="Create New User">
              <div class="p-3 ">
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

                  <div class="flex flex-row justify-end space-x-2">
                    <Button className="text-white bg-sky-900 hover:bg-sky-700 rounded" htmlType="submit">Create User</Button>
                    <Button className="text-white bg-red-900 hover:bg-red-700 rounded" onClick={()=>navigate('/admin-dashboard')}>Discard</Button>
                  </div>
                </Form>
              </div>
            </Card>
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default AddUserObject;
