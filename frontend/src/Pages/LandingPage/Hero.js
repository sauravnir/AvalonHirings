import React from 'react'
import { Link } from 'react-router-dom'
import HeroImage from '../../images/HeroImage.jpg'

function Hero() {
  return (
    <div className="relative">
      <img
        className="w-full h-auto"
        src={HeroImage}
        alt="Hero"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-gray-200 bg-opacity-40">
        <div className="max-w-2xl mx-auto p-5">
          <h1 className="text-gradient bg-gradient-to-r from-red-200 via-sky-900 bg-clip-text text-sky-900 text-5xl font-bold">
            FIND YOUR PERFECT HOUSE MAID
          </h1>
          <p className="text-lg mt-4 max-w-xl font-medium">
          Discover Reliable and Experienced Housemaids Tailored to Your Needs
          </p>
          <div className="mt-8">
            <Link to="/login">
              <button className="bg-red-600 hover:bg-red-800 text-white py-3 px-10 rounded shadow-md">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero


