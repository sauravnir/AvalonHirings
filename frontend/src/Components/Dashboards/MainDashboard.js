import React from 'react'
import { Link } from 'react-router-dom'

import MainDashboardObject from '../../objects/MainDashboardObject'
import DashboardFooter from './DashboardFooter'

import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip, Legend, ResponsiveContainer ,BarChart , Bar} from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page B', uv: 400, pv: 2400, amt: 2400},{name: 'Page B', uv: 400, pv: 2400, amt: 2400}];

const renderLineChart = (
  <LineChart width={500} height={250} data={data} margin={{ top: 30, right: 5, bottom: 0, left: 5 }}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
);

// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data2 = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
];

const renderBarChart=(
  <ResponsiveContainer width="100%" height="100%">
  <BarChart
    width={200}
    height={200}
    data={data2}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="pv" fill="black" />
    <Bar dataKey="uv" fill="black" />
  </BarChart>
</ResponsiveContainer>
)


function MainDashboard() {
  
  return (
    <div class="w-screen">
      <div class="flex flex-col mt-2 w-10/14 p-2">
        <div class="flex">
        <h1 class="text-xl font-base">Dashboard</h1>
        </div>
        <div class='flex h-50 justify-between'>
          {MainDashboardObject.map(info=>(
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
        <div class="grid grid-cols-2 p-5 h-[350px] mt-5 bg-white text-black text-xl shadow-xl">
          <div class="">
          <h1 class="">Progress Chart</h1>
          <div class="">
              {renderLineChart}
          </div>
          </div>
          <div class="">
            <h1>Activity Chart</h1>
            <div class="mt-60">
              {renderBarChart}
            </div>
            </div>     
        </div>
          <DashboardFooter />
      </div>
    </div>
  )
}

export default MainDashboard