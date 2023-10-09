import React from 'react'
import SideBarData from '../SideBarData'
import { NavLink } from 'react-router-dom'


function Sidebar(props){
  return (
    <div>   
                <div class="flex flex-col overflow-hidden mt-2 pl-2 relative z-100 ">
                    <a href="#">                  
                        {
                          SideBarData.map(info=>{
                            return <NavLink to={info.path} key={info.id} >
                            <div class='flex flex-row space-x-4 m-3  text-sky-900 h-fit active items-center justify-start rounded-sm'>
                            <img src={require(`../images/icons/${info.logo}`)} alt="Profile" class="h-auto w-10 p-1"></img>
                              <h1 style={props.style} class="hover:underline text-white text-base font-medium">{info.page}</h1>
                              </div>  
                            
                            </NavLink>
                          })
                        }                  
                    </a>
                </div>
        </div>
        
  )
}

export default Sidebar