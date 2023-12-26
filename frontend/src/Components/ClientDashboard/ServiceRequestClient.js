import React , {useState,useEffect} from "react";
import DashboardFooter from "../Dashboards/DashboardFooter";
import {
  Button,
  InputNumber,
  Form,
  Input,
  Tabs,
  Card,
  Modal,
  Radio,
  Space,
  Table,
  Collapse
} from "antd";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function ServiceRequestClient() {

    const [getServiceItems , setGetServiceItems] = useState("");

    console.log(getServiceItems);
    useEffect(() => {

        const handleSubmit = async() =>{
            try{
                const res = await fetch('http://127.0.0.1:8000/getservices/');
                const data =  await res.json();
                setGetServiceItems(data);
            }catch(error){
                toast.error(error)
            }
        }
        handleSubmit();
    },[])
  return (
    <div className="w-screen my-8">
      <div className="mt-2 w-10/14 p-4">
        <div className="flex  ">
          <h1 className="text-2xl font-base">Request For Service</h1>
        </div>
        <ToastContainer />
        <div class="p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
          <Card title="Currently Available Services:">
            <div class="flex flex-row space-x-2">
                <div class="w-auto shadow rounded">
                
                    <div class="grid grid-rows-2 w-60 h-60 bg-green-50 p-4">
                        <div>
                            <h1>Title:Basic Service Package</h1>            
                        </div>
                        <div>
                
                        </div>
                    </div>
                
                </div>
            </div>
          </Card>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default ServiceRequestClient;
