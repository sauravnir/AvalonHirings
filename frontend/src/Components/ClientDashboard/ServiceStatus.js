import React, { useState, useEffect } from "react";

import DashboardFooter from "../Dashboards/DashboardFooter";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  Tabs,
  Table,
  Tag,
  Space,
  Radio,
  Descriptions,
} from "antd";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


import KhaltiCheckout from "khalti-checkout-web";


function ServiceStatus() {
  const [openModal, setOpenModal] = useState(false);
  const [singleService, setSingleService] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const userData = localStorage.getItem("userData");
  const userID = JSON.parse(userData);
  const navigate = useNavigate()



  console.log("Print" , singleService)
  
  const getPayment = (value) => {
    setPaymentMethod(value);
  };


  // Handling Khalti Payment
  const khaltiPayment = async(id , serviceName , totalPrice) => {
    const config = {
      publicKey: "test_public_key_fb53c47dfcf44808988bda227c018702",
      productIdentity: id,
      productName: serviceName , 
      productUrl: "http://localhost:3000/",
      eventHandler: {
        onSuccess: async (payload) => {
          
          await sendPaymentToken(payload.token , payload.amount , payload.product_identity);

          console.log(payload);
        },
        onError: (error) => {
          // Handle errors
          console.log(error);
        },
        onClose: () => {
          navigate('/client-dashboard');
        },
      },
      paymentPreference: [
        "KHALTI",
      ],
    };
    try {
      const checkout = new KhaltiCheckout(config); 
      checkout.show({amount : totalPrice / 100});
    } catch (error) {
      console.log(error);
    }
  }

  const sendPaymentToken= async(paymentToken , amount , serviceuseid) =>{
    try{
      
      const res = await fetch("http://127.0.0.1:8000/servicetransaction/",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({payment_token : paymentToken , payment_amount : amount , serviceuseid :  serviceuseid})
      });
      if(res.ok){
        navigate('/client-dashboard')
        alert("Payment Completed!")
      }
    }catch(error){
      toast.error(error)
    }
  }


  // Handling Cash Payment

  const cashPayment = () => {
    console.log("Paid")
  }


  // Fetching client requested services using user_id  
  useEffect(() => {
    const singleClientService = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/viewclientservice/${userID.user_id}`
        );
        const data = await res.json();

        setSingleService(data);
      } catch (error) {
        toast.error(error);
      }
    };
    singleClientService();
  }, []);

  const requestContent = [
    {
      title: "Service Name ",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Service Till",
      dataIndex: "service_till",
      key: "service_till",
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "Approval Status",
      dataIndex: "service_status",
      key: "service_status",
      render: (_, { service_status }) => (
        <>
          {service_status &&
            service_status.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "Payment Required") {
                color = "orange";
              } else if (tag === "On-Going") {
                color = "green";
              } else if (tag === "Pending") {
                color = "yellow";
              } else if (tag === "Completed") {
                color = "gray";
              } else {
                color = "red";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag}
                </Tag>
              );
            })}
        </>
      ),
    },
    {
      title: "Process",
      key: "process",
      render: (_, record) => (
        <Space>
          <Button
            disabled={
              record.service_status.includes("Pending") ||
              record.service_status.includes("Completed") ||
              record.service_status.includes("On-Going")
            }
            onClick={() => setOpenModal(true)}
            style={{ background: "green", color: "white" }}
          >
            Make Payment
          </Button>

          <Modal
            title="Payment Details:"
            open={openModal}
            description
            okType="default"
            onCancel={() => setOpenModal(false)}
            okText="Make Payment"
            centered
            onOk={()=>paymentMethod === "Khalti" ? khaltiPayment(record.key , record.service_name , record.total_price): cashPayment()}
            width={1100}
          >
            <Descriptions bordered layout="vertical">
              <Descriptions.Item label="Service Name:">
                <a>{record.service_name}</a>
              </Descriptions.Item>

              <Descriptions.Item label="Service Duration:">
                <a>
                {(() => {
                  const startDate = new Date(record.approved_date);
                  const endDate = new Date(record.service_till);
                  const timeDifference = endDate - startDate;
                  const daysDifference = Math.floor(
                    timeDifference / (1000 * 3600 * 24 )
                  );
                  return `${daysDifference} days`;
                })()}
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Total Amount:">
                <span class="text-green-800"> Rs.{record.total_price}</span>
              </Descriptions.Item>
            </Descriptions>
            <div class="flex flex-row items-center justify-center mt-10 space-x-4 mb-10">
              <h1>Pay with:</h1>
              <Radio.Group
                defaultValue="Khalti"
                onChange={(e) => getPayment(e.target.value)}
              >
                <Radio.Button disabled>Esewa</Radio.Button>
                <Radio.Button value="Khalti">Khalti</Radio.Button>
                <Radio.Button value="Cash">Cash</Radio.Button>
              </Radio.Group>
            </div>
          </Modal>
        </Space>
      ),
    },
  ];

  // Populating the table data
  const tableData = singleService.map((info) => ({
    key: info.id,
    service_name: info.services.servicename,
    location: info.servicelocation,
    service_till: info.expiry_date,
    total_price: info.totalprice,
    approved_date: info.approved_date,
    service_status: [info.status],
  }));

  return (
    <div className="w-screen mt-14 ">
      <div className="flex flex-col mt-2 p-6">
        <ToastContainer />
        <div className="flex w-full items-center justify-between bg-white rounded shadow border p-3">
          <h1 className="text-2xl   font-bold">View Progress / Status</h1>
          {/* <h1 class="underline">Currently Active: 3 </h1> */}
          <select class=" w-1/3 shadow-lg p-2 text-sm">
            <option>Filter Service Status</option>
            <option class="text-yellow-500">Processing</option>
            <option class="text-orange-500">Payment Required</option>
            <option class="text-green-500">Active</option>
            <option class="text-gray-500">Completed</option>
          </select>
        </div>

        <div class="space-y-12">
          <div className="p-3 mt-5 bg-white rounded shadow-xl shadow-gray-350">
            <div>
              <h1 class="underline text-red-400">
                Note: The service will only be available once the payment is
                done.
              </h1>
            </div>
            <Card>
              <Table columns={requestContent} dataSource={tableData}></Table>
            </Card>
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default ServiceStatus;
