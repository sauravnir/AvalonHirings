import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Descriptions, Progress, Card, Modal, Button, Divider } from "antd"
import DashboardFooter from "../Dashboards/DashboardFooter";
import KhaltiCheckout from "khalti-checkout-web";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Spinner from "../../Pages/ProfileSettings/Spinner";

function ClientDashboard() {
  const [getServiceItems, setGetServiceItems] = useState([]);
  const [dashboardItems, setDashboardItems] = useState([]);
  const [workDetails, setWorkDetails] = useState([]);
  const [showSubscription, setShowSubscription] = useState(false);
  const [loading , setLoading] = useState(false);
  const listItem = ['Prioritize Service Requests','Premium Service Plans','Fast-track handling of your reports','Quick response to support requests']
  
  const [subscriptionDetails , setSubscriptionDetails] = useState([]);

  const navigate = useNavigate();
  const userData = localStorage.getItem("userData");
  const userID = JSON.parse(userData);
  const user_id = userID.user_id;
  
  // Displaying the work details
  useEffect(() => {
    const handleWork = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://127.0.0.1:8000/viewclientservice/${userID.user_id}`
        );
        const data = await res.json();
        setWorkDetails(data);
        setLoading(false);
      } catch (error) {
        return error;
      }
    };

    handleWork();
  }, []);

  // Displaying totol services
  useEffect(() => {
    const handleSubmit = async () => {
      const res = await fetch("http://127.0.0.1:8000/getservices/");
      const data = await res.json();
      setGetServiceItems(data);
    };
    handleSubmit();
  }, []);

  // Displaying the certain dashboard information
  useEffect(() => {}, []);

  // Displaying the progress percentage
  const progressPercent = (item) => {
    const startDate = new Date(item.approved_date);
    const endDate = new Date(item.expiry_date);
    const currentDate = new Date();

    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = currentDate.getTime() - startDate.getTime();

    const progressPercentage = (elapsedDuration / totalDuration) * 100;
    return Math.round(progressPercentage);
  };

  const totalDuration = (item) => {
    const startDate = new Date(item.approved_date);
    const endDate = new Date(item.expiry_date);

    const timeDifference =
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

    return timeDifference;
  };

  // Displaying Popup on first page load

  useEffect(() => {
    const firstPageLoad = localStorage.getItem("isFirstPageLoad") === null;

    if (firstPageLoad) {
      setShowSubscription(true);

      localStorage.setItem("isFirstPageLoad", "false");
    }
  }, []);


  // handling Subscription 

  const handleSubscription = async() =>{
    // Fetching the user ID
    setLoading(true);
    const config ={
      publicKey: "test_public_key_fb53c47dfcf44808988bda227c018702",
      productIdentity: '123',
      productName: "Premium Subscription Plan",
      productUrl: "http://localhost:3000/",
      eventHandler: {
        onSuccess: async (payload) => {
          await sendPaymentToken(payload.token , payload.amount)
         
        },
        onError: (error) => {
          // Handle errors
          console.log(error);
        },
        onClose: () => {
          navigate("/client-dashboard");
        },
      },
      paymentPreference: ["KHALTI"],
    };
    try {
      const checkout = new KhaltiCheckout(config);
      checkout.show({ amount: 20000});
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const sendPaymentToken = async (paymentToken , amount) =>{
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/subscriptionpayment/" , {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          payment_token : paymentToken, 
          payment_amount : amount,
          user_id : user_id
        })
      });

      if(response.ok){
        navigate("/client-dashboard")
      }
    } catch(error){
      console.log(error);
    }finally{
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    }
  }


  // Fetching the subscription Details

  useEffect(()=>{
    const fetchSubscriptionDetails = async () =>{
      try{
        const response = await fetch(`http://127.0.0.1:8000/subscriptiondetails/${user_id}`)
        const data = await response.json()
        setSubscriptionDetails(data);
      }catch(error){
        toast.error("Unable To Fetch The Details")
      }
    }
    fetchSubscriptionDetails();
  },[user_id])

  return (
    <div className="w-screen mt-8">
      <ToastContainer />
      <Modal
        open={showSubscription}
        onCancel={() => setShowSubscription(false)}
        footer={null}
        width={400}
      >
        {loading && <Spinner />}
        <div class="flex flex-col bg-violet-950 rounded-3xl  items-center justify-center w-full">
            <div class="flex flex-row items-center space-x-3 p-10">
              <button class="flex justify-center w-20 h-20 rounded-3xl items-center item bg-gradient-to-br from-orange-300 via-amber-400 to-yellow-500">
                <img
                  class="w-10 h-10"
                  src={require(`../../images/subscribe.png`)}
                ></img>
              </button>
              <div class="flex flex-col">
                <h1 class="text-xl font-bold text-white">Premium</h1>
                <h1 class="text-4xl font-bold text-amber-400">Rs.2000<span class='text-white text-xl'> /only</span></h1>
              </div>
              
            </div>
            
            <div class="flex flex-col items-center space-y-4 mb-5">
              <h1 class="text-sm text-white ">Premium Subscription Plan</h1>
              <hr class="w-full border-t  border-white"/>
              <ul>
                {listItem.map((item,index)=>(
                  
                  <li class="flex flex-row items-center text-amber-400 text-sm p-2" key={index}><img src={require(`../../images/list.png`)} class="w-3 h-3 mr-2"></img>{item}</li>
                ))}
              </ul>
              <hr class="w-full border-t border-white"/>
              {subscriptionDetails.is_subscribed === true ? (
                <button onClick={handleSubscription} class="bg-amber-400 rounded-2xl hover:bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-600 p-3 font-bold text-white hover:text-gray-900" disabled>ALREADY SUBSCRIBED</button>
              ):(<button onClick={handleSubscription} class="bg-amber-400 rounded-2xl hover:bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-600 p-3 font-bold text-white hover:text-gray-900">SUBSCRIBE NOW</button>)}
            </div>
          </div>
        
      </Modal>
      <div className="mt-2 w-10/14 p-6">
        <div className=" flex-col py-3 ">
          <h1 className="text-xl font-semibold ">Dashboard</h1>
        </div>
        <div class="flex flex-row items-center justify-between bg-cyan-500 rounded-lg font-medium shadow h-12 mt-5">
          <h1 class="flex px-8 items-center text-white text-base">
            <img
              class="mr-2 w-5 h-5"
              src={require(`../../images/info.png`)}
            ></img>
            {Object.keys(getServiceItems).length} Services Available
          </h1>
          <Link to="/request-service">
            <h1 class="flex px-8 text-white text-base hover:underline">
              View More
            </h1>
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
              <Card>
              {workDetails
                .filter((item) => item.status === "On-Going")
                .map((item) => (
                  <Link to="/client-view-service" key={item.key}>
                    <div class="mb-5">
                      <Progress
                        percent={progressPercent(item)}
                        strokeColor={"green"}
                      />
                    </div>
                    <Card title="Assigned To:">
                    
                      <div class="flex flex-row items-center justify-center space-x-5">
                        <img
                          class="rounded-full w-10 h-10"
                          src={
                            item.assigned_employee.assigned_employee.profilepic
                          }
                          alt="Profile Pic"
                        ></img>
                        <h1 class="text-sm ">
                          Employee's Name:{" "}
                          {item.assigned_employee.assigned_employee.fullname}
                        </h1>
                        <div class="flex flex-row item-center justify-between space-x-5">
                          <h1>
                            Start Date:{" "}
                            {new Date(item.approved_date).toLocaleDateString()}
                          </h1>
                          <h1>
                            End Date:{" "}
                            {new Date(item.expiry_date).toLocaleDateString()}
                          </h1>
                          <h1>
                            Total Duration: {Math.round(totalDuration(item))}{" "}
                            days
                          </h1>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </Card>
              

                {/* {workDetails.filter((item) => item.status !== "On-Going").map((item) => (
                  <Card>
                  <div class="flex flex-col items-center justify-center space-y-4 p-4">
                  <ExclamationCircleOutlined style={{ fontSize: "32px" }}/>
                      <h1>No Current Services</h1>
                    <Link to='/request-service'> 
                      <button class="rounded border p-3 bg-amber-600 text-white font-bold hover:shadow-xl hover:bg-amber-700">Request For Services Now!</button>
                    </Link>
                    </div>
                  </Card>
                ))
                } */}
            </div>
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default ClientDashboard;
