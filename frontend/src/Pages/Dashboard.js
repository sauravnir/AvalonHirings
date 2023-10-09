import React from 'react'
import {useState} from 'react'
import Sidebar from '../Components/Sidebar'
import UserProfile from '../images/icons/userprofile.png'
import ToggleMenu from '../images/icons/togglemenu.png'
import SignOut from '../images/icons/signout.png'
import DashNav from '../Components/DashNav'




function Dashboard() {

  const [isOpen, isSetOpen] = useState(true);
  console.log(isOpen)

  function sidebarToggle(){
    isSetOpen(prevIsOpen => !prevIsOpen)
  }

  const styleDiv = {
      width:isOpen ? "250px" : "80px", 
  }

  const styleElement = {
    display : isOpen ? "block" : "none"
  }

  return (
    <div >
        <DashNav />
      <div  style={styleDiv}  class="flex flex-col overflow-hidden w-1/6 h-screen bg-gradient-to-b from-violet-900 to-slate-900 shadow-xl shadow-gray-900 relative z-2000 ">
                <div class="flex flex-row w-full justify-start pl-3 space-x-3 items-center mt-5">
                    <img style={styleElement} src={UserProfile} alt="userprofile" class="h-auto w-14"></img>
                    <h1 style={styleElement} class="text-white text-base font-medium">Username</h1>
                    <button onClick={sidebarToggle}><img src={ToggleMenu} alt="toggleMenu" style={{marginLeft: isOpen?"20px":"0px"}} class="flex flex-row h-auto w-8 ml-3 shadow"></img></button>
                </div>
                <hr class="w-full  h-px my-6 bg-white border-0 shadow-sm dark:bg-white"></hr>

                <div class="flex flex-col overflow-hidden mt-2 relative">
                  {/* Sending Props to Sidebar.js page */}
                  <Sidebar style={styleElement}/>


                  <a href="">
                  <div class="flex flex-row space-x-4 m-3 text-sky-900 h-fit active items-center justify-start rounded-sm pl-2">
                    <img style={styleElement} src={SignOut} alt="Profile" class="h-auto w-9 p-1"></img>
                  <h1 style={styleElement} class="hover:underline text-white text-base font-medium">Sign-Out</h1>  
                </div>
                </a>
                 </div> 
            </div>

            
            
    </div>
  )
}

export default Dashboard