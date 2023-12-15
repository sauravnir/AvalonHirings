import React from "react";
import axios from 'axios';
import {useNavigate} from  'react-router-dom';
// import {useState} from "react"; 

import Logo from "../../images/Abnw.png"
import { Link } from "react-router-dom";


function LoginPage() {

  const [email , setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/app/login/', {
            email: email,
            password: password,
        }, {
            withCredentials: true,
        });
        console.log(response.data);
        if (response.data.access) {
            navigate('/otp');
        } else {
            setError('Invalid Credentials');
        }
    } catch (error) {
        console.error('Login Failed', error);
        setError('Error!');
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
              <Link to="/register"
                
                class="font-medium text-blue-500 hover:text-blue-800 hover:underline"
              >
                {" "}
                Register Now!
              </Link>
            </span>
          </div>
          <div class="grid grid-rows-2 grid-flow-row gap-4 max-w-xl">
            <form class="md:flex flex-col space-y-4 p-8  justify-center" onSubmit={handleLogin}>
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
                />
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-m font-medium mb-2"
                  for="password"
                >
                  Password
                </label>
                <input
                  class="shadow appearance-none rounded border border-gray-200 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none invalid:border-red-500  focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="***********"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class="flex flex-row mb-6">
                <input class="h-4 w-4 mt-1" type="checkbox" value="isRemembered" />
                <span class=" ml-3 align-top text-sm">Remember me</span>
                <Link 
                to='/forgotPassword'
                  class="ml-60 inline-block align-baseline font-medium text-sm text-blue-500 hover:text-blue-800 hover:underline "
                                  >
                  Forgot Password?
                </Link>
              </div>
              <div class="flex flex-row items-center w-full py-4 justify-center p-5 ">
                {/* <Link to='/otp'> */}
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white text-lg font-medium py-2 px-40 rounded-lg focus:outline-none focus:shadow-outline"
                  type="submit"
                  // onClick={handleLogin}
                >
                  Sign In
                </button>
                {/* </Link> */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>

              <div class="flex flex-col justify-center items-center p-3">
                <Link to='/' class="text-lg text-red-500 hover:text-red-800 hover:underline mt-5" href="#">
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

        <div class="flex flex-row  w-screen justify-center items-center ">
        <div class="mb-6 md:mb-0 items-center ">
              <a href="#" class="flex flex-row items-center">
                  <img src={Logo} class="h-20 mr-2" alt="FlowBite Logo" />
                  <span class="self-center text-6xl font-semibold whitespace-nowrap dark:text-white align-center">Avalon Hirings</span>
              </a>
          </div>
        </div>

      </div>    
    </div>
    
  );
}

export default LoginPage;
