import React,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Progress, Card } from 'antd'
import DashboardFooter from '../Dashboards/DashboardFooter'
import Spinner from '../../Pages/ProfileSettings/Spinner'
function EmployeeDashboardObject() {
    const [workDetails , setWorkDetails] = useState({
        fullname: "",
        profilepicture : "",
        expiry_date : "",
        approved_date : "",
    })
    const userData = localStorage.getItem("userData")
    const userID = JSON.parse(userData)
    const [loading , setLoading] = useState(false);


    useEffect(()=>{
        const handleWork = async () => {
            try{
              setLoading(true);
                const response = await fetch(`http://127.0.0.1:8000/assignedservices/${userID.user_id}`)
                const data = await response.json()
                const {client_details , assigned_service_details , service_request} = data ;
                
                const setDetails  = {
                    fullname : client_details?.fullname || '',
                    profilepicture : client_details?.profilepic|| "",
                    expiry_date : service_request?.expiry_date || "",
                    approved_date : assigned_service_details?.approved_date || "",
                }
                
                setWorkDetails(setDetails);
            }
            catch(error){
                return error; 
            }finally{
              await new Promise((resolve) => setTimeout(resolve, 2000));
              setLoading(false);
            }
        }

        handleWork();
    },[])

    // Calculating the progress percentage
    const progressPercent = (workDetails) =>{
        const startDate = new Date(workDetails.approved_date);
    const endDate = new Date(workDetails.expiry_date);
    const currentDate = new Date();

    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = currentDate.getTime() - startDate.getTime();

    const progressPercentage = (elapsedDuration / totalDuration) * 100;

    return Math.round(progressPercentage);


    // Calculate the total duration 

}
const startDate = new Date(workDetails.approved_date);
const endDate = new Date(workDetails.expiry_date);

const timeDifference = endDate.getTime() - startDate.getTime();

const daysDifference =timeDifference / (1000*3600*24)

  return (
    <div className="w-screen mt-8">
      {loading && <Spinner/>}
      <div className="mt-2 w-10/14 p-6">
        <div className=" flex-col py-3 ">
          <h1 className="text-xl font-semibold ">Dashboard</h1>
        </div>
        <div class="flex flex-row items-center justify-between bg-cyan-500 rounded-lg font-medium shadow h-12 mt-5">
          </div>
        <div className="flex flex-col justify-between space-y-5 mt-5">

        <div class="w-1/2 rounded border bg-white shadow-xl">
          <h1 class="font-bold p-5">Work Progress:</h1>
          <div class="p-4 justify-center">
            
                <Link to="/employee-work-schedule" key = {workDetails.key}> 
                <div class="mb-5">
              <Progress   percent={progressPercent(workDetails)}  strokeColor={'green'} />
              </div>

                <Card title="Assigned For:">

                  <div class="flex flex-row items-center justify-center space-x-5">
                    <img class="rounded-full object-cover w-10 h-10" src={workDetails.profilepicture} alt="Profile Pic"></img>
                    <h1 class="text-sm ">Client's Name: <span class="font-semibold">{workDetails.fullname}</span></h1>
                  <div class="flex flex-row item-center justify-between space-x-5">
                    <h1>Start Date:  {new Date(workDetails.approved_date).toLocaleDateString()}</h1>
                    <h1>End Date: {new Date(workDetails.expiry_date).toLocaleDateString()}</h1>
                    <h1>Total Duration: {Math.round(daysDifference)} days</h1>
                  </div>
                  </div>
                </Card>
               </Link>
            
            
           
          </div>
        </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  )
}

export default EmployeeDashboardObject