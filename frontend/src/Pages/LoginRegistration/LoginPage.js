import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../images/Abnw.png";
import { Link } from "react-router-dom";
import { Input, Form, message } from "antd";
import Spinner from "../ProfileSettings/Spinner";


function LoginPage() {
  const rules = [
    {
      required: true,
      message: "required",
    },
  ];
  const [useremail, setEmail] = useState("");
  const [userpassword, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const loginData = {
    email: useremail,
    password: userpassword,
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/app/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      setLoading(false);
  
      if (response.ok) {
        const data = await response.json();
        setTokenAndUserData(data);
        
        if (data.is_auth) {
          if (data.user_type === "Admin") {
            navigate("/admin-dashboard");
          } else {
            if (data.is_otp == false) {
              navigate("/otp");
            } else {
              navigate(data.user_type === "Client" ? "/client-dashboard" : "/employee-dashboard");
            }
          }
          message.success(data.message);
        } else {
          message.error("Authentication Failed");
        }
      } else {
        message.error("Failed to Log In");
      }
    } catch (error) {
      message.error("Failed to Log In");
    }
  };
  
  
  const setTokenAndUserData = (data) => {
    setToken(data.token);
    localStorage.setItem("token", data.token);
  
    const userData = JSON.stringify(data);
    localStorage.setItem("userData", userData);
  };
  

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 h-screen mx-auto max-w-l bg-gradient-to-tl from-gray-900 to-sky-900 overflow-hidden">
   <div class="h-screen w-full md:w-full lg:w-2/3 shadow-lg bg-white justify-start p-10">
    <div class="flex flex-col items-start mt-5 p-10 pb-2 md:mb-0">
        {loading && <Spinner />}
        <span class="text-3xl font-medium whitespace-nowrap dark:text-dark-900">
            Sign in to your account
        </span>
        <span class="text-sm mt-2 dark:text-dark-900">
            Don't have an account yet?{" "}
            <Link
                to="/register"
                class="font-medium text-blue-500 hover:text-blue-800 hover:underline"
            >
                Register Now!
            </Link>
        </span>
    </div>
    <div class="grid grid-rows-2 grid-flow-row gap-4 max-w-xl">
        <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item label="Email ID" name="email" rules={rules}>
                <Input onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={rules}>
                <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <div class="flex flex-row justify-end">
                <Link
                    to="/forgotPassword"
                    class="ml-60 inline-block align-baseline font-medium text-sm text-blue-500 hover:text-blue-800 hover:underline"
                >
                    Forgot Password?
                </Link>
            </div>
            <div class="flex flex-row items-center w-full py-4 justify-center p-5">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white text-lg font-medium py-2 px-40 rounded-lg focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Sign In
                </button>
            </div>
        </Form>
        <div class="flex flex-col justify-center items-center p-3">
            <Link
                to="/"
                class="text-lg text-red-500 hover:text-red-800 hover:underline mt-5"
                href="#"
            >
                Go back to site?
            </Link>
            <div class="sm:flex sm:items-center sm:justify-center mt-10">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023{" "}
                    <a href="#" class="hover:underline">
                        Avalon
                    </a>
                    . All Rights Reserved.
                </span>
            </div>
        </div>
    </div>
</div>

    <div class="flex justify-center items-center">
        <div class="mb-6 md:mb-0 items-center">
            <a href="#" class="flex flex-row items-center">
                <img src={Logo} class="h-20 mr-2" alt="FlowBite Logo" />
                <span class="self-center text-6xl font-semibold whitespace-nowrap dark:text-white align-center">
                    Avalon Hirings
                </span>
            </a>
        </div>
    </div>
</div>

  );
}

export default LoginPage;
