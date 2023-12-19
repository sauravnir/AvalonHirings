import React from 'react'
import Logo from "../../images/Abnw.png"
import {Link , useNavigate} from 'react-router-dom'


import {useState} from 'react'


function ForgotPassword() {
  const navigate = useNavigate()
  const [isEmail , setIsEmail] = useState("");
  const [isPassword , setIsPassword] = useState("");
  const [isConfirmPassword , setIsConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const userData = {
    email : isEmail , 
    password : isPassword ,
  }
  
  const handleForgotPassword = async (e) =>{
    e.preventDefault();
    if(isPassword === isConfirmPassword){ 
      console.log(userData);
      try{
        const response = await fetch('http://127.0.0.1:8000/app/forgotpassword/',{
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(userData)
      }
      )
      if(response.ok){
        navigate('/login');
      }
    }
      catch(e){
        setError("Error: Invalid Credentials" + e.message);
      }
    }
    else{
      setError("Invalid Credentials");
      console.log("Invalid Credentials");
    }
    
  }
  

  return (
    <div>
      <div class="flex h-screen mx-auto max-w-l bg-gradient-to-tl from-gray-900 to-sky-900 overflow-hidden">
        <div class="h-screen w-2/3 shadow-lg bg-white justify-start p-10">
          <div class="flex flex-col items-start mt-5 p-10 pb-2 md:mb-0">
            <span class="text-3xl font-medium whitespace-nowrap dark:text-dark-900">
              Forgot Password?
            </span>
           
            <span class="text-sm mt-2 dark:text-dark-900">
            <span class='text-red-500'>
                Your new password must be different than you previously registered with.<br></br>
            </span>
              Wanna return back?{" "}
              <Link to="/login"
                
                class="font-medium text-blue-500 hover:text-blue-800 hover:underline"
              >
                {" "}
                Go to login page
              </Link>
            </span>
          </div>
          <div class="grid grid-rows-2 grid-flow-row gap-4 max-w-xl">
            <form class="md:flex flex-col space-y-4 p-8  justify-center" onSubmit={handleForgotPassword}>
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
                  onChange = {(e)=>setIsEmail(e.target.value)}
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
                <input
                  class="shadow appearance-none rounded border border-gray-200 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none invalid:border-red-500  focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="***********"
                  onChange = {(e)=>setIsPassword(e.target.value)}
                  required
                />
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-m font-medium mb-2"
                  for="confirmpassword"
                >
                  Confirm Password
                </label>
                <input
                  class="shadow appearance-none rounded border border-gray-200 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none invalid:border-red-500  focus:shadow-outline"
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  placeholder="***********"
                  onChange = {(e)=>setIsConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div class="flex  items-center w-full py-4 justify-center p-5 ">
                <button
                  class="flex flex-col bg-blue-500 hover:bg-blue-700 text-white text-lg font-medium py-2 px-40 rounded-lg focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Reset Password
                </button>
                {error && <p style={{color : 'red'}} >{error}</p>}
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

export default ForgotPassword