import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  message,
  Form,
  Input,
  Radio,
  Card,
  DatePicker,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Logo from "../../images/Abnw.png";
import Spinner from "../ProfileSettings/Spinner";
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
  
  // File Download

  const downloadFile = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/app/downloadfile/");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "TermsAndConditions.pdf");
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
            <span class="mt-2 text-gray-600 text-sm ">
                  Before you register , go through all the <span className="font-bold">terms and conditions:</span>
                  <span>
                    <Button size="small" onClick={downloadFile} icon={<DownloadOutlined />}>
                      Download
                    </Button>
                  </span>
                </span>
          </div>
          <div class="flex flex-col w-full overflow-auto text-sm">
            <Card  style={{ height: '500px' }}>
            <Form layout="vertical" onFinish={userCreate} enctype="multipart/form-data">
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
                      <Radio.Button value="Client" defaultChecked>Client</Radio.Button>
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
                    <Form.Item label="Upload Work CV (only pdf accepted)" name="cv">
                      <Input 
                      type="file"
                      id="workcv"
                      class="text-sm"
                      onChange={(e) => setWorkCV(e.target.files[0])}
                      />
                    </Form.Item>
                    ) }

                  <div class="flex flex-row justify-center items-center w-full space-x-2">
                    <Button htmlType="submit" className="bg-sky-700 text-white hover:bg-sky-600 rounded w-full">REGISTER</Button>
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
