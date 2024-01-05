import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardFooter from "../Dashboards/DashboardFooter";
import { Drawer, Form, Input , Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import {PlusOutlined , QuestionOutlined } from "@ant-design/icons";

import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

function ServiceRequestClient() {
  const [getServiceItems, setGetServiceItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // storing the input value in state
  const [expiryDate, setExpiryDate] = useState(moment().format("YYYY-MM-DD HH:mm:ss"));
  const [pickValue, setPickValue] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [location, setLocation] = useState("");


  console.log(location)
  const userdata = localStorage.getItem("userData");
  const username = JSON.parse(userdata);
  // Preparing data to be entered into the model
  const requestData = {
    username: username.username,
    servicevalue: pickValue,
    totalprice: finalPrice,
    expiry_date: expiryDate,
    serviceid : selectedItems.id,
    servicelocation : location
  };

  const navigate = useNavigate()
  // Opening and Closing Drawer
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // Contact Us Alert
  const infoAlert = () => {
    toast.info("For further inqueries, contact us at +977 9815977947.");
  };

  // Calculating the date value
  const calculatedDate = () => {
    if (pickValue && selectedItems.serviceavailable) {
      const newDate = moment().add(
        pickValue,
        selectedItems.serviceavailable.toLowerCase()
      );
      return newDate.format("YYYY-MM-DD HH:mm:ss");
    }
    return "";
  };

  useEffect(() => {
    setExpiryDate(calculatedDate());
  }, [pickValue, selectedItems]);

  useEffect(() => {
    if (pickValue) {
      const calculatedPrice = selectedItems.serviceprice * pickValue;
      setFinalPrice(calculatedPrice);
    }
  }, [pickValue, selectedItems.serviceprice]);

  // Fetching the entire service
  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/getservices/");
        const data = await res.json();
        console.log(data);
        setGetServiceItems(data);
      } catch (error) {
        toast.error(error);
      }
    };
    handleSubmit();
  }, []);

  // Fetching the service based on service ID
  const fetchServiceDetails = async (serviceId) => {
    try {
      
      const res = await fetch(`http://127.0.0.1:8000/getservice/${serviceId}`);
      const data = await res.json();
      console.log(data);
      setSelectedItems(data);
      showDrawer();
    } catch (error) {
      toast.error(error);
    }
  };

  // Storing the requested service details in the database

  const giveServiceDetails = async () => {
    try {
      
        const res = await fetch("http://127.0.0.1:8000/postrequest/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

        if(res.ok){
          toast.success("Successfully sent a request!")
          navigate('../client-view-service')
        }
    } catch(error) {
      
      navigate('./')
    }
  };

  return (
    <div className="w-screen mt-14">
      <div className="mt-2 w-10/14 p-6">
        <div className="flex flex-col py-3">
        <div className="flex flex-row items-center justify-between w-full bg-white rounded shadow   p-3">
          <h1 className="text-2xl font-bold">Request For Service</h1>
          {/* <h1 className="text-2xl text-white font-base">Issue Reports / Requests</h1> */}
            <h1 className=" hover:underline">
              {Object.keys(getServiceItems).length} Service/s Available
            </h1>
            <select class=" shadow-lg p-2 text-sm">
              <option>Search for service types</option>
              <option>For Households</option>
              <option>For Business / Enterprises</option>
            </select>
        </div>
        </div>
        <ToastContainer position="bottom-center" autoClose={6000} />
      <div class="flex items-center justify-center">
      </div>

        <div class="grid grid-cols-4 space-x-4">
          {getServiceItems.map((info) => (
            <div
              key={info.id}
              className="p-4 rounded shadow-lg bg-white border flex flex-col justify-between"
            >
              <div className="space-y-5">
                <button className="rounded-2xl w-1/3 bg-green-400 text-white  shadow text-sm ">
                  {info.status}
                </button>
                <h1 className="mt-2 font-bold text-xl">{info.servicename}</h1>
                <p className="mt-4 text-sm font-normal">{info.servicedesc}</p>
                <h1 className="mt-3 text-sm">
                  Service For:{" "}
                  {info.servicetarget === "Business" ? (
                    <span className="bg-violet-200 text-sm px-3 py-1 rounded shadow border text-violet-700 border-violet-700">
                      Business
                    </span>
                  ) : (
                    <span className="bg-sky-200 px-3 py-1 rounded shadow border text-sky-700 border-sky-700">
                      Household
                    </span>
                  )}
                </h1>
                <h1 class="text-sm">
                  Service Availability Time: {info.serviceavailable}
                </h1>
                <h1 className="mt-3 text-sm">
                  Unit Price :{" "}
                  <span className="text-green-700  font-bold">
                    Rs. {info.serviceprice}
                  </span>
                </h1>
              </div>
              <div className="flex justify-end space-x-4">
                <Button size="small" shape="circle" icon={<PlusOutlined style={{ fontSize: '13px' }} />} onClick={() => fetchServiceDetails(info.id)}>
                </Button>
               
                {selectedItems && (
                  <Drawer
                    title="Request This Service?"
                    placement="left"
                    open={open}
                    closable={true}
                    onClose={onClose}
                    key="left"
                    size="large"
                  >
                    <div class="flex flex-col">
                      <Form layout="vertical">
                        <Form.Item label="Service Name">
                          <Input value={selectedItems.servicename} defaultValue={selectedItems.servicename}/>
                        </Form.Item>
                        <Form.Item label="About the service:">
                          <Input.TextArea
                            value={selectedItems.servicedesc}
                            defaultValue={selectedItems.servicedesc}
                            
                          />
                        </Form.Item>
                        <Form.Item label="Service for:">
                          <Input value={selectedItems.servicetarget} defaultValue={selectedItems.servicetarget}/>
                        </Form.Item>

                        <Form.Item label="Service Availability:">
                          <Input
                            value={selectedItems.serviceavailable}
                            defaultValue={selectedItems.serviceavailable}
                          />
                        </Form.Item>

                        <Form.Item
                          label={`Set the value for ${selectedItems.serviceavailable} service (required):`}
                        >
                          <input
                            class="p-2 rounded border w-full"
                            type="number"
                            placeholder={`For how many ${selectedItems.serviceavailable}`}
                            onChange={(e) => setPickValue(e.target.value)}
                            min="1"
                            required
                          ></input>
                        </Form.Item>

                        <Form.Item label="Service will expire on:">
                          <Input value={calculatedDate()} defaultValue={calculatedDate()} />
                        </Form.Item>

                        <Form.Item label="Provide the location of work:"
                         >
                          <input
                            class="p-2 rounded border w-full"
                            type="text"
                            placeholder='Eg: Budhanilkanthan-2 , Bhangal , Nepal'
                            onChange={(e) => setLocation(e.target.value)}
                            required
                          ></input>

                         </Form.Item>

                        <Form.Item label="Service Price:">
                          <Input value={finalPrice} defaultValue={finalPrice} />
                        </Form.Item>

                        <div class="flex justify-center space-x-2 ">
                          <button
                            class="w-full p-2 bg-sky-700 rounded text-white hover:bg-sky-600"
                            onClick={giveServiceDetails}
                          >
                            Request
                          </button>
                          <button
                            class="w-full p-2 bg-red-700 rounded text-white hover:bg-red-600"
                            onClick={onClose}
                          >
                            Cancel
                          </button>
                        </div>
                      </Form>
                    </div>
                  </Drawer>
                )}

                <Button onClick={infoAlert} size="small" shape="circle" icon={<QuestionOutlined style={{ fontSize: '13px' }}/>}>
                
                </Button >
              </div>
            </div>
          ))}
        </div>
        <div>
         
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default ServiceRequestClient;
