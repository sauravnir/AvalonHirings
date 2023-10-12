import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/Abnw.png";

function Registration() {
  return (
    <div>
      <div class="flex h-screen mx-auto max-w-l bg-gradient-to-tl from-gray-900 to-sky-900 overflow-hidden">
        <div class="h-screen w-2/3 shadow-lg bg-white justify-start p-10">
          <div class="flex flex-col items-start py-5 pb-2 md:mb-0">
            <span class="text-3xl font-medium whitespace-nowrap dark:text-dark-900">
              Create your account
            </span>
            <span class="text-sm mt-2 dark:text-dark-900">
              Already have an account?{" "}
              <Link to='/login'
                href="#"
                class="font-medium text-blue-500 hover:text-blue-800 hover:underline"
              >
                {" "}
                Login here
              </Link>
            </span>
          </div>

          <div class="grid grid-rows-2 grid-flow-row gap-4 max-w-xl justify-between ">
            <form
              class="md:flex flex-col space-y-3  pt-4 pb-2 justify-center"
              action="#"
              method="post"
              enctype="multipart/form-data"
            >
              {/* Full Name */}
              <div class="mb-1">
                <label  
                  class="block text-gray-700 text-m font-medium mb-2"
                  for="Fullname"
                >
                  Full Name
                </label>
                <input
                  class="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none invalid:border-red-500 focus:shadow-outline"
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder="John Smith"
                />
              </div>
              {/* Email Address */}
              <div class="mb-1">
                <label
                  class="block text-gray-700 text-m font-medium mb-2"
                  for="Email"
                >
                  Email address
                </label>
                <input
                  class="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none invalid:border-red-500 focus:shadow-outline"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                />
              </div>
              {/* User Name */}
              <div class="flex flex-row space-x-5 max-w-xl">
                <div class="mb-1">
                  <label
                    class="block text-gray-700 text-m font-medium mb-2"
                    for="Username"
                  >
                    Username
                  </label>
                  <input
                    class="shadow appearance-none border border-gray-200 rounded w-half  py-2 px-3 text-gray-700 leading-tight focus:outline-none invalid:border-red-500 focus:shadow-outline"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="JohnSmith123"
                  />
                </div>
                {/* User Type */}
                <div class="mb-1">
                  <label
                    class="block text-gray-700 text-m font-medium mb-2"
                    for="Usertype"
                  >
                    User-type
                  </label>
                  <select class="shadow appearance-none border border-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none invalid:border-red-500 focus:shadow-outline">
                  <option>******</option>
                    <option>Client</option>
                    <option>Employee</option>
                  </select>
                </div>
                {/* DOB */}
                <div class="mb-1">
                  <label
                    class="block text-gray-700 text-m font-medium mb-2"
                    for="Dateofbirth"
                  >
                    Date of Birth
                  </label>
                  <div
                    data-te-datepicker-init
                    data-te-input-wrapper-init
                    class="mb-1"
                  >
                    <input
                      class="shadow appearance-none border border-gray-200 rounded w-half  py-2 px-3 text-gray-700 leading-tight focus:outline-none invalid:border-red-500 focus:shadow-outline"
                      type="text"
                      name="dateofbirth"
                      id="dateofbirth"
                      placeholder="XXXX/XX/XX"
                    />
                  </div>
                </div>
              </div>

              <div class="flex flex-row justify-between space-x-5 max-w-xl">
                <div class="mb-1">
                  <label
                    class="block text-gray-700 text-m font-medium mb-2"
                    for="Password"
                  >
                    Password
                  </label>
                  <input
                    class="shadow appearance-none border border-gray-200 rounded w-half  py-2 px-3 text-gray-700 leading-tight focus:outline-none invalid:border-red-500 focus:shadow-outline"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="**********"
                  />
                </div>

                <div class="mb-1">
                  <label
                    class="block text-gray-700 text-m font-medium mb-2"
                    for="Confirm Password"
                  >
                    Confirm Password
                  </label>
                  <input
                    class="shadow appearance-none border border-gray-200 rounded w-half  py-2 px-3 text-gray-700 leading-tight focus:outline-none invalid:border-red-500 focus:shadow-outline"
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    placeholder="**********"
                  />
                </div>
              </div>

              <div class="flex max-w-xl">
              <div class="mb-1">
                  <label
                    class="block text-gray-700 text-m font-medium mb-2"
                    for="Upload File"
                  >
                    Upload (Citizenship)
                  </label>
                  <input
                    class="shadow border border-gray-200 rounded py-2 px-3 text-gray-700 leading-tight invalid:border-red-500 focus:shadow-outline"
                    id="confirmpassword"
                    name="confirmpassword"
                    type="file"
                    accept="applocation/pdf"
                    placeholder="**********"
                  />
                  <span class="flex text-red-900 text-sm">Only file with .pdf extension is accepted.</span>
                </div> 
              </div>

              <div class="flex flex-row items-center w-full py-2 justify-center p-5 ">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white text-lg font-medium py-2 px-40 rounded-lg focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Create Account
                </button>
              </div>
            </form>
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
