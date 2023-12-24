import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../images/Abnw.png";
import { Link } from "react-router-dom";
import { notification, Input } from "antd";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [useremail, setEmail] = useState("");
  const [userpassword, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [notificationApi, contextHolder] = notification.useNotification();
  const errorNotify = (type) => {
    notificationApi[type]({
      message: "Incorrect credentials / error occured!",
    });
  };

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const loginData = {
    email: useremail,
    password: userpassword,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/app/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        localStorage.setItem("token", data.token);
        const userData = JSON.stringify(data);
        localStorage.setItem("userData", userData);
        if (data.user_type === "Admin") {
          navigate("/admin-dashboard");
        }
        // Assuming you define userType somewhere
        if (data.is_auth === true && data.otp !== null) {
          if (data.user_type === "Client" || data.user_type === "Employee") {
            navigate("/otp");
          }
        } else {
          {data.user_type === "Client" ? navigate('/client-dashboard') : navigate("/employee-dashboard")};
        }
      }else{
        toast.error("Failed To Authenticated")
      }
    } catch (error) {
      console.log("Error occurred:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div class="flex h-screen mx-auto max-w-l bg-gradient-to-tl from-gray-900 to-sky-900 overflow-hidden">
        <div class="h-screen w-2/3 shadow-lg bg-white justify-start p-10">
          <div class="flex flex-col items-start mt-5 p-10 pb-2 md:mb-0">
            <span class="text-3xl font-medium whitespace-nowrap dark:text-dark-900">
              Sign in to your account
            </span>
            <span class="text-sm mt-2 dark:text-dark-900">
              Dont't have an account yet?{" "}
              <Link
                to="/register"
                class="font-medium text-blue-500 hover:text-blue-800 hover:underline"
              >
                {" "}
                Register Now!
              </Link>
            </span>
          </div>
          <div class="grid grid-rows-2 grid-flow-row gap-4 max-w-xl">
            <form
              class="md:flex flex-col space-y-4 p-8  justify-center"
              onSubmit={handleLogin}
            >
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-m font-medium mb-2"
                  for="email"
                >
                  Email address
                </label>
                <input
                  class="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none invalid:border-red-500 focus:shadow-outline"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-m font-medium mb-2"
                  for="password"
                >
                  Password
                </label>
                <Input.Password
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {/* `<input
                  class="shadow appearance-none rounded border border-gray-200 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none invalid:border-red-500  focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="***********"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />` */}
              </div>
              <div class="">
                <Link
                  to="/forgotPassword"
                  class="ml-60 inline-block align-baseline font-medium text-sm text-blue-500 hover:text-blue-800 hover:underline "
                >
                  Forgot Password?
                </Link>
              </div>
              <div class="flex flex-row items-center w-full py-4 justify-center p-5 ">
                {/* <Link to='/otp'> */}
                {contextHolder}
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white text-lg font-medium py-2 px-40 rounded-lg focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign In
                </button>
                {/* </Link> */}
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>

              <div class="flex flex-col justify-center items-center p-3">
                <Link
                  to="/"
                  class="text-lg text-red-500 hover:text-red-800 hover:underline mt-5"
                  href="#"
                >
                  Go back to site?
                </Link>
                <div class="sm:flex sm:items-center sm:justify-center mt-10 ">
                  <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023{" "}
                    <a href="#" class="hover:underline">
                      Avalon
                    </a>
                    . All Rights Reserved.
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer position="top-center" autoClose={3000} />

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

export default LoginPage;
