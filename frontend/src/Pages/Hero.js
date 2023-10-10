import React from 'react'
import HeroImage from '../images/HeroImage.jpg'
function Hero() {
  return (
    <div>
        <div class="px-auto py-10  h-screen" id="hero">
            {/* <img class="relative bg-cover" src={HeroImage}></img> */}
        <div class="flex flex-col p-5 mt-20">
            <div class="flex flex-col p-2 mx-auto">
                <h1 class="bg-gradient-to-r from-red-200 via-sky-900 bg-clip-text text-sky-900 text-5xl font-bold">FIND YOUR PERFECT HOUSE MAID</h1>
                <p class=" text-center text-gray-900 mx-auto mt-4 max-w-xl font-medium text-lg">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
        tenetur fuga ducimus numquam ea!
      </p>
            </div>
            <div class="flex w-2/3 p-1 mx-auto justify-center">
                <a class="font-medium text-white mt-4 p-5" href="#"><button class="bg-red-600 hover:bg-red-800 py-3 px-10 rounded shadow-red-900 shadow-md">Get Started</button></a>
            </div>
        </div>
        <div>

        </div>
            </div>

    </div>
  )
}

export default Hero

// : Seamless and Reliable Hiring System for Your Home