import React , {useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Descriptions , Progress, Card } from 'antd'
import DashboardFooter from '../Dashboards/DashboardFooter'

function ClientDashboard() {
  const [getServiceItems , setGetServiceItems] = useState([])
  const [dashboardItems, setDashboardItems] = useState([]); 
  const [workDetails , setWorkDetails] = useState([])

  const userData = localStorage.getItem("userData");
  const userID = JSON.parse(userData);

  // Displaying the work details
  useEffect(()=>{
    const handleWork = async () => {
      try{
        const res = await fetch( `http://127.0.0.1:8000/viewclientservice/${userID.user_id}`)
        const data = await res.json()
        setWorkDetails(data)
      }catch(error){
        return error
      }
    }

    handleWork();
  },[])

  // Displaying totol services
  useEffect(() => {
    const handleSubmit = async () => {
        const res = await fetch("http://127.0.0.1:8000/getservices/");
        const data = await res.json();
        console.log(data);
        setGetServiceItems(data);
    };
    handleSubmit();
  }, []);


  // Displaying the certain dashboard information
  useEffect(() => {

  }, []);

  
// Displaying the progress percentage
  const progressPercent =(item)=>{
  const startDate = new Date(item.approved_date);
  const endDate = new Date(item.expiry_date);
  const currentDate = new Date();

  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedDuration = currentDate.getTime() - startDate.getTime();

  const progressPercentage = (elapsedDuration / totalDuration) * 100;

  return Math.round(progressPercentage);
  }

  const totalDuration = (item) =>{
    const startDate = new Date(item.approved_date)
    const endDate  = new Date(item.expiry_date)

    const timeDifference =( endDate.getTime() - startDate.getTime()) / (1000*3600*24)
    
    return timeDifference
  }


  return (
    <div className="w-screen mt-14">
      <div className="mt-2 w-10/14 p-6">
        <div className=" flex-col py-3 ">
          <h1 className="text-2xl font-semibold ">Dashboard</h1>
        </div>
        <div class="flex flex-row items-center justify-between bg-cyan-500 rounded-lg font-medium shadow h-12 mt-5">
            <h1 class="flex px-8 items-center text-white text-base">
              <img class="mr-2 w-5 h-5" src={require(`../../images/info.png`)}></img>{Object.keys(getServiceItems).length} Services Available 
            </h1>
            <Link to="/request-service">
            <h1 class="flex px-8 text-white text-base hover:underline">View More</h1>
            </Link>
          </div>
        <div className="flex flex-col justify-between space-y-5">
        <div className="flex  justify-between">
          {dashboardItems.map((info) => (
            <div class="mt-3">
              <Link to="/admin-dashboard">
                <div
                  className={`flex flex-row w-72 h-22 shadow rounded rounded-lg bg-white shadow-gray-250`}
                >
                  <div className="flex flex-row p-3 space-x-8 items-center">
                    <div class={`relative rounded-full h-fit ${info.color}`}>
                      <img
                        className="w-8"
                        src={require(`../../images/${info.img}`)}
                      ></img>
                    </div>
                    <div class="flex flex-col space-y-2">
                      <h1 className="text-sm items-center text-gray-600">
                        {info.title}
                      </h1>
                      <span className="text-xl font-medium  text-dark  ">
                        {info.number}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div class="w-1/2 rounded border bg-white shadow-xl">
          <h1 class="font-bold p-5">Work Progress:</h1>
          <div class="p-4 justify-center">
            {workDetails.filter((item)=> item.status === "On-Going").map((item)=>(
                <Link to="/client-view-service" key = {item.key}> 
                <div class="mb-5">
              <Progress   percent={progressPercent(item)}  strokeColor={'green'} />
              </div>
                <Card title="Assigned To:">
                  {console.log(item)}
                  <div class="flex flex-row items-center justify-center space-x-5">
                    <img class="rounded-full w-10 h-10" src={item.assigned_employee.assigned_employee.profilepic} alt="Profile Pic"></img>
                    <h1 class="text-sm ">Employee's Name: {item.assigned_employee.assigned_employee.fullname}</h1>
                  <div class="flex flex-row item-center justify-between space-x-5">
                    <h1>Start Date:  {new Date(item.approved_date).toLocaleDateString()}</h1>
                    <h1>End Date: {new Date(item.expiry_date).toLocaleDateString()}</h1>
                    <h1>Total Duration: {Math.round(totalDuration(item))} days</h1>
                  </div>
                  </div>
                </Card>
               </Link>
            ))}
           
          </div>
        </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  )
}

export default ClientDashboard