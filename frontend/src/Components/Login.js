import React from "react";

function LoginPage(){
    const logoPath = process.env.PUBLIC_URL + '/images/A.png' 
    return(
        <div>
            <div class='flex items-center justify-center h-screen mx-auto bg-white overflow-hidden bg-white-900 '>
                    <div class='m-auto w-1/3 h-2/3 shadow-lg bg-blue-900 rounded-lg'>
                        <div class="grid grid-rows-2 grid-flow-row gap-4">
                        <div class="flex justify-center mt-3 md:mb-0">
              <a href="#" class="items-center w-fit">
                  {/* <img src={logoPath} class="h-12 mr-3" alt="FlowBite Logo" /> */}
                  <span class="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">LOGIN</span>
              </a>
          </div>
         
         <form class="space-y-1" action="#">
             <div class=" flex flex-col items-center ">
                <label for="email" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Your Email</label>
                <input class="shadow-l w-3/4 h-8 rounded-sm" type="email" name="email" value="" placeholder="example@gmail.com" required/>
                
             </div>

             <div class="flex flex-col items-center ">
                <label for="password" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Your Password</label>
                <input class="shadow-l w-3/4 h-8 rounded-sm" type="password" name="password" value="" placeholder="*********" required/>
                
             </div>

         </form>
         
                        </div>
                    </div>
            </div>        
        </div>
    )
}

export default LoginPage; 