import React from 'react'
import { Link } from 'react-router-dom'

import dashboardItems from '../../objects/MainDashboardObject'
import DashboardFooter from './DashboardFooter'




// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function MainDashboard() {
  
  return (
    <div class="w-screen">
      <div class="flex flex-col mt-2 w-10/14 p-2">
        <div class="flex">
        <h1 class="text-xl font-base">Dashboard</h1>
        </div>
        <div class='flex h-50 justify-between'>
          {dashboardItems.map(info=>(
            <div class='flex p-3'>
              {/* Props To Be Passed */}
              <Link to='/dashboard'>
              <div class={`flex w-72 bg-sky-700 shadow-sm shadow-gray-900`}>
                <div class="flex flex-row p-3 space-x-5 items-center">
                    <img class="h-auto w-12" src={require(`../../images/${info.img}`)}></img>
                    <span class="text-4xl text-white font-bold ">{info.number}</span>
                    <h1 class="items-center text-white">{info.title}</h1>
                </div>
              </div>
              </Link>
          </div>
          ))}
        </div>
          <DashboardFooter />
      </div>
    </div>
  )
}

export default MainDashboard