import React from 'react'
import Logo from "../../images/Abnw.png"
import { Link } from "react-router-dom";

function OtpCode() {
  return (
    <div>
    <div class="flex h-screen mx-auto max-w-l bg-gradient-to-tl from-gray-900 to-sky-900 overflow-hidden">
        <div class="h-screen w-2/3 shadow-lg bg-white justify-start p-10">
          <div class="flex flex-col items-start mt-5 p-10 pb-2 md:mb-0">
            <span class="text-3xl font-medium whitespace-nowrap dark:text-dark-900">
              Fill in with the OPT provided in your email
            </span>
            <span class="text-sm mt-2 dark:text-dark-900">
              or Go back?{" "}
              <Link to="/login"
                
                class="font-medium text-blue-500 hover:text-blue-800 hover:underline"
              >
                {" "}
                Login Page!
              </Link>
            </span>
          </div>
          <div class="grid grid-rows-2 grid-flow-row gap-4 max-w-xl">
            <form class="md:flex flex-col space-y-4 p-8 ">
              <div class="mb-4 flex justify-center space-x-4 mt-10">
                <label
                  class="block text-gray-700 text-m font-medium mb-2"
                  for="email"
                >
                </label>
                <input
                  class="shadow appearance-none border  border-gray-200 rounded w-14 h-14 py-2 px-3 text-gray-700 text-2xl leading-tight focus:outline-none invalid:border-red-500 focus:shadow-outline"
                  id="otp1"
                  name="otp1"
                  type="text"
                />
                <input
                  class="shadow appearance-none border border-gray-200 rounded w-14 h-14 py-2 px-3 text-gray-700 text-2xl leading-tight focus:outline-none invalid:border-red-500 focus:shadow-outline"
                  id="otp2"
                  name="otp2"
                  type="text"
                />
                <input
                  class="shadow appearance-none border border-gray-200 rounded w-14 h-14 py-2 px-3 text-gray-700 text-2xl leading-tight focus:outline-none invalid:border-red-500 focus:shadow-outline"
                  id="otp3"
                  name="otp3"
                  type="text"
                />
                <input
                  class="shadow appearance-none border border-gray-200 rounded w-14 h-14 py-2 px-3 text-gray-700 text-2xl leading-tight focus:outline-none invalid:border-red-500 focus:shadow-outline"
                  id="otp4"
                  name="otp4"
                  type="text"
                />
              </div>
              
              <div class="flex flex-row items-center w-full py-4 justify-center p-5 ">
                <Link to='/dashboard'>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white text-lg font-medium py-2 px-40 rounded-lg focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Submit
                </button>
                </Link>
              </div>

              <div class="flex flex-col justify-center items-center p-3">
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
  )
}

export default OtpCode