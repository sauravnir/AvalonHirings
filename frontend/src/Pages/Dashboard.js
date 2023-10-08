import React from 'react'
import Sidebar from '../Components/Sidebar'
import UserProfile from '../images/icons/userprofile.png'
function Dashboard() {
  return (
    <div>
      <div class="flex flex-col overflow-hidden w-1/6 h-screen bg-gradient-to-b from-gray-900 to-sky-900 shadow-xl shadow-gray-900 z-200">
                <div class="flex flex-row w-full justify-center space-x-3 items-center mt-5">
                    <img src={UserProfile} alt="userprofile" class="h-auto w-14 shadow"></img>
                    <h1 class="text-white text-base font-medium">Username</h1>
                </div>
                <hr class="w-full h-px my-6 bg-gray-200 border-0 shadow-sm dark:bg-gray-700"></hr>

                {/* <div class="flex flex-col overflow-hidden mt-2 pl-3 pr-3 ">
                  <Sidebar />
                 </div>   */}

                
                {/* <div class="flex flex-col overflow-hidden mt-2 pl-3 pr-3 ">
                    <a href="#">
                        <div class="flex flex-row space-x-2 hover:bg-gradient-to-r from-gray-800 to-gray-500 text-sky-900 h-fit items-center justify-start rounded-sm">
                        <img src={`..images/icons/${props.logo}`} alt="userprofile" class="h-auto w-10"></img>
                        <h1 class="text-white text-lg font-medium">{props.page}</h1>
                        </div>
                    </a>
                </div> */}

            </div>
    </div>
  )
}

export default Dashboard