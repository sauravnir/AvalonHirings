import React from "react";
import { useState } from "react";

export function LoginPage(){

    return(
        <div>
            <div class='flex items-center justify-center h-screen mx-auto bg-white overflow-hidden bg-gray-900 '>
                    <div class='m-auto w-1/3 h-2/3 shadow-lg bg-white rounded-lg'>
                        
                        <div class="flex flex-col items-center mt-3 md:mb-0">
                            <a href="#" class="items-center ">
              
                  <span class="self-center text-4xl font-mono font-semibold whitespace-nowrap dark:text-blue-900">Login</span>
              </a>
          </div>
          <div class="grid grid-rows-2 grid-flow-row gap-4">
                    <form class='md:flex flex-col space-y-1 p-4 mt-5 '>
                    <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email/Username
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none invalid:border-red-500 focus:shadow-outline" id="email" name="email" type="email" placeholder="example@gmail.com"/>
                    </div>
                    <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none invalid:border-red-500  focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                    {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
                    </div>
                    <div class="flex items-center justify-between p-5 ">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Sign In
                    </button>
                    <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a>
                    <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">Register Here!</a>
                    </div>

                    <div class="flex justify-center items-center p-3">
                        <a class="font-bold text-white mt-4" href="#"><button class="bg-orange-500 hover:bg-orange-600 py-3 px-5 rounded">Go Back To  Site?</button></a>
                    </div>

                    </form>
</div>
         
                        </div>
                     </div>
             </div> 
    )
}


export function Registration(){
    return(
        <div>

        </div>
    )
}

 