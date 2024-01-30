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
  const [citizenshipFront , setCitizenshipFront] = useState("")
  const [citizenshipBack , setCitizenshipBack] = useState("")
  const [workCV , setWorkCV] = useState("")
  const [fileOpen , setFileOpen] = useState(false);
  const handleFileOpen = () => {
    if (userType === "Employee") {
      setFileOpen(false);
    } else {
      setFileOpen(true);
    }
  }

  const userCreate = async () => {
    try {
      const symbolRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
  
      if (password === confirmPassword && contact.length === 10) {
        if (password.length >= 8 && symbolRegex.test(password)) {
          const validateFileType = (file, allowedTypes) => {
            const fileType = file ? file.type : null;
            return allowedTypes.includes(fileType);
          };
  
          const formData = new FormData();
          formData.append("fullname", fullName);
          formData.append("user_type", userType);
          formData.append("date_of_birth", new Date(dateOfBirth).toISOString().split('T')[0]);
          formData.append("email", email);
          formData.append("contact", contact);
          formData.append("password", password);
          formData.append("username", userName);
          formData.append("citizenship_back", citizenshipBack);
          formData.append("citizenship_front", citizenshipFront);
  
          if (userType === "Employee" && workCV) {
            formData.append("work_cv", workCV);
          }
  
          if (userType === "Client") {
            if (
              validateFileType(citizenshipBack, ["image/jpeg", "image/png"]) &&
              validateFileType(citizenshipFront, ["image/jpeg", "image/png"])
            ) {
              setLoading(true);
              const response = await fetch("http://127.0.0.1:8000/app/register/", {
                method: "POST",
                body: formData,
              });
              setLoading(false);
  
              if (response.ok) {
                const data = await response.json();
                message.success(data.message);
                navigate('/admin-dashboard');
              } else {
                message.error("User Already Exists");
              }
            } else {
              message.error("Invalid file type. Please upload JPEG or PNG images.");
            }
          }
  
          if (userType === "Employee") {
            if (
              validateFileType(citizenshipBack, ["image/jpeg", "image/png"]) &&
              validateFileType(citizenshipFront, ["image/jpeg", "image/png"]) &&
              (!workCV || validateFileType(workCV, ["application/pdf"]))
            ) {
              setLoading(true);
              const response = await fetch("http://127.0.0.1:8000/app/register/", {
                method: "POST",
                body: formData,
              });
              setLoading(false);
  
              if (response.ok) {
                const data = await response.json();
                message.success(data.message);
                navigate('/admin-dashboard');
              } else {
                message.error("User Already Exists");
              }
            } else {
              message.error("Invalid File Type.");
            }
          }
        } else {
          message.error("Password must be at least 8 characters long and contain symbols.");
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
                    <Radio.Group defaultValue="Client" onChange={(e) => {setUserType(e.target.value) ; handleFileOpen()}}>
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

                  <Form.Item label="Upload Citizenship">
                    <Form.Item label="Front-Side" name="front" rules={rules}>
                      <Input 
                      type="file"
                      id="citizenshipFront"
                      class="text-sm"
                      onChange={(e) => setCitizenshipFront(e.target.files[0])}
                      />
                      </Form.Item>
                      <Form.Item label="Back-Side" name="back" rules={rules}>
                      <Input 
                      type="file"
                      id="citizenshipBack"
                      class="text-sm"
                      onChange={(e) => setCitizenshipBack(e.target.files[0])}
                      />
                      </Form.Item>
                    </Form.Item>

                    {fileOpen &&(
                    <Form.Item label="Upload Work CV" name="cv" >
                      <Input 
                      type="file"
                      id="workcv"
                      class="text-sm"
                      onChange={(e) => setWorkCV(e.target.files[0])}
                      />
                    </Form.Item>
                    ) }

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
