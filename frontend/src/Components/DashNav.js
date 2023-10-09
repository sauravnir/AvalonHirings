import React from 'react'
import Setting from '../images/icons/settings.png'

function DashNav() {
  return (
    <nav class="bg-gray border-gray-200 dark:bg-gray-900 sticky top-0 relative z-0">
        <div class ="fixed w-full z-30 flex bg-white dark:bg-white p-2 items-center justify-end h-14 px-10">
        <div class ="flex-none h-full text-center flex items-center justify-center">

               <a href="">
               <div class = "flex space-x-3 items-center px-3">
                    <div class = "flex-none flex justify-center">
                    <div class="w-10 h-10 flex ">
                        <img src={Setting} alt="profile" class=" rounded-lg shadow object-cover" />
                    </div>


                    </div>
                </div>
                </a>   
        </div>
    </div>
    </nav>
  )
}

export default DashNav