import React from "react";
import Logo from "../images/Abnw.png"
import Footer from "../Components/Footer";


function LoginPage() {
  return (
    <div>
      <div class="flex h-screen mx-auto max-w-l bg-sky-900 overflow-hidden">
        <div class="h-screen w-1/3 shadow-lg bg-white justify-start ">
          <div class="flex flex-col items-start mt-5 p-10 md:mb-0">
            <span class="self-center  text-3xl  font-bold whitespace-nowrap dark:text-sky-900">
              SIGN IN TO YOUR ACCOUNT
            </span>
          </div>
          <div class="grid grid-rows-2 grid-flow-row gap-4 max-w-xl">
            <form class="md:flex flex-col space-y-4 p-8  justify-center">
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-m font-bold mb-2"
                  for="email"
                >
                  Email
                </label>
                <input
                  class="shadow appearance-none border border-gray-900 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none invalid:border-red-500 focus:shadow-outline"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                />
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-m font-bold mb-2"
                  for="password"
                >
                  Password
                </label>
                <input
                  class="shadow appearance-none rounded-lg border border-gray-900 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none invalid:border-red-500  focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="***********"
                />
              </div>
              <div class="mb-6">
                <input class="h-4 w-4" type="checkbox" value="isRemembered" />
                <span class=" ml-3 align-top text-sm">Remember me</span>
              </div>
              <div class="flex flex-row items-center w-full py-4 justify-center p-5 ">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white text-lg font-medium py-2 px-20 rounded-lg focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Sign In
                </button>
              </div>

              <div class="flex flex-row p-4 space-x-10 justify-center">
                <a
                  class="inline-block align-baseline font-medium text-sm text-red-500 hover:text-red-800 hover:underline"
                  href="#"
                >
                  Forgot Password?
                </a>
                <a
                  class="inline-block align-baseline font-medium text-sm text-blue-500 hover:text-blue-800 hover:underline"
                  href="#"
                >
                  Register Here!
                </a>
              </div>
              <div class="flex flex-col justify-center items-center p-3">
                <a class="text-lg hover:underline text-sky-900 mt-5" href="#">
                  Go back to site?
                </a>
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
