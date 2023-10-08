import React from 'react'
import HeadinInfo from '../Components/HeadinInfo'
import Phone from '../images/icons/phone.png'
import Email from '../images/icons/email.png'
import Location from '../images/icons/location.png'
function Contact() {
  return (
    <div>
        <div class="flex flex-rows p-20 px-auto  relative space-x-5">
            <div class="border-1 shadow-lg shadow-violet-200 rounded-md h-3/6 w-2/6 px-auto relative ">
                <div class="flex flex-col p-5 px-auto items-center mt-14">
                    <img src={Phone} alt="" class="h-auto w-14"></img>
                    <h1 class="text-slate-900 text-sm font-bold mt-5 sm:text-2xl">Phone</h1>
                    <span class="text-gray-500 text-sm font-medium mt-5 sm:text-sm">(+977) 9100000000</span>
                </div>
            </div>

            <div class="border-1 shadow-lg shadow-violet-200 rounded-md h-3/6 w-2/6 px-auto relative ">
                <div class="flex flex-col p-5 px-auto items-center mt-14">
                    <img src={Email} alt="" class="h-auto w-14"></img>
                    <h1 class="text-slate-900 text-sm font-bold mt-5 sm:text-2xl">Email</h1>
                    <span class="text-gray-500 text-sm font-medium mt-5 sm:text-sm">info@avalonhirings.com</span>
                </div>
            </div>

            <div class="border-1 shadow-lg shadow-violet-200 rounded-md h-3/6 w-2/6 px-auto relative ">
                <div class="flex flex-col p-5 px-auto items-center mt-14">
                    <img src={Location} alt="" class="h-auto w-14"></img>
                    <h1 class="text-slate-900 text-sm font-bold mt-5 sm:text-2xl">Address</h1>
                    <span class="text-gray-500 text-sm font-medium mt-5 sm:text-sm">Golfutar, Kathmandu</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contact