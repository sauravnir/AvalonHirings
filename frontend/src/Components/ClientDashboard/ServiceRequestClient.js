import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardFooter from "../Dashboards/DashboardFooter";
import {
  Drawer,
  Form,
  Input,
  Button,
  Card,
  Breadcrumb,
  Badge,
  InputNumber,
  TimePicker,
  message,
} from "antd";
import { ToastContainer, toast } from "react-toastify";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";

import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { required } from "khalti-checkout-web";
import Spinner from "../../Pages/ProfileSettings/Spinner";

function ServiceRequestClient() {
  const rules = [
    {
      required: true,
      message: "required",
    },
  ];
  const [location, setLocation] = useState("");
  const [handleUserInput, setHandleUserInput] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");
  const [getServiceItems, setGetServiceItems] = useState([]);
  const onFilterChange = useRef([]);
  const [selectedItems, setSelectedItems] = useState([]);
  // storing the input value in state
  const [expiryDate, setExpiryDate] = useState(
    moment().format("YYYY-MM-DD HH:mm:ss")
  );
  const [pickValue, setPickValue] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [loading, setLoading] = useState("");
  const userdata = localStorage.getItem("userData");
  const username = JSON.parse(userdata);

  const requestData = {
    username: username.username,
    servicevalue: pickValue,
    totalprice: finalPrice,
    expiry_date: expiryDate,
    serviceid: selectedItems.id,
    servicelocation: location,
    startHour: startHour,
    endHour: endHour,
  };

  const navigate = useNavigate();
  // Opening and Closing Drawer
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
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
        setLoading(true);
        const res = await fetch("http://127.0.0.1:8000/getservices/");
        const data = await res.json();

        setGetServiceItems(data);
        onFilterChange.current = data;
        setLoading(false);
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
      setSelectedItems(data);
      showDrawer();
    } catch (error) {
      toast.error(error);
    }
  };

  // Storing the requested service details in the database

  const giveServiceDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/postrequest/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      if (res.ok) {
        const data = await res.json();
        message.success(data.message);
        navigate("../client-view-service");
      }
      setLoading(false);
    } catch (error) {
      message.error("Error In Requesting Service");
    }
  };

  const handleFilterChange = (value) => {
    setFilterQuery(value);
    setHandleUserInput(true);
  };

  const handleFilterAvailability = (value) => {
    setFilterAvailability(value);
    setHandleUserInput(true);
  };

  useEffect(() => {
    const applySearchAndFilter = async () => {
      try {
        setLoading(true);
        let newData = [...onFilterChange.current];

        if (filterQuery.trim() !== "" && filterQuery !== "All Service Areas") {
          newData = newData.filter((item) =>
            item.servicetarget.includes(filterQuery)
          );
        }

        if (filterAvailability.trim() !== "" && filterAvailability !== "All") {
          newData = newData.filter((item) =>
            item.status.includes(filterAvailability)
          );
        }
        setGetServiceItems(newData);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (handleUserInput) {
      applySearchAndFilter();
    } else {
      setGetServiceItems([...onFilterChange.current]);
      setHandleUserInput(false);
    }
  }, [filterQuery, handleUserInput, filterAvailability]);

  // Setting the hours for time picker

  const disabledHours = () => {
    return Array.from({ length: 24 }, (_, i) => i).filter(
      (hour) => hour < 10 || hour >= 18
    );
  };

  return (
    <div className="w-screen mt-8">
      {loading && <Spinner />}
      <div className="mt-2 w-10/14 py-2 px-3">
        <div className="flex flex-row items-center justify-between w-full p-3 mt-2">
          <h1 className="text-xl font-bold">Request For Service</h1>
          <Breadcrumb
            items={[
              {
                href: "/client-dashboard",
                title: <HomeOutlined />,
              },
              {
                title: "Services",
              },
              {
                href: "/request-service",
                title: "Request For Service",
              },
            ]}
          />
        </div>

        <ToastContainer position="bottom-center" autoClose={6000} />
        <div class="flex items-center justify-center"></div>
        <Card>
          <div class="flex flex-row justify-between items-center p-2 space-x-2 mb-2">
            <h1 className="text-sm hover:underline text-sky-900 hover:text-sky-700 font-bold">
              Total Services: {Object.keys(getServiceItems).length}
            </h1>
            <div class="flex flex-row items-center space-x-2">
              <select
                class=" shadow-lg p-2 text-sm"
                value={filterQuery}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                <option disabled>Filter Service Targets</option>
                <option>All Service Areas</option>
                <option>Household</option>
                <option>Business</option>
              </select>
              <select
                class=" shadow-lg p-2 text-sm"
                value={filterAvailability}
                onChange={(e) => handleFilterAvailability(e.target.value)}
              >
                <option disabled>Filter Availability</option>
                <option>All</option>
                <option>Available</option>
                <option>Not Available</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-4 space-x-4 flex-wrap">
            {getServiceItems.map((info) => (
              <div
                key={info.id}
                className="p-4 rounded shadow-lg bg-white border flex flex-col justify-between mb-3"
              >
                <div className="space-y-5">
                  {info.status === "Available" ? (
                    <Badge status="processing" text="Available" />
                  ) : (
                    <Badge status="warning" text="Unavailable" />
                  )}
                  <h1 className="mt-2 font-bold text-xl">{info.servicename}</h1>
                  {/* <p className="mt-4 text-sm font-normal">{info.servicedesc}</p> */}
                  <h1 className="mt-3 text-sm">
                    Service For:{" "}
                    {info.servicetarget === "Business" ? (
                      <span className="text-sm font-bold px-3 py-1">
                        Business
                      </span>
                    ) : (
                      <span className="text-sm font-bold px-3 py-1">
                        Household
                      </span>
                    )}
                  </h1>
                  <h1 class="text-sm">
                    Service Availability Time: {info.serviceavailable}
                  </h1>

                  <div className="flex flex-row items-center">
                    <h1 class="text-sm">Caliber Requirement :</h1>
                    {info.required_caliber === "Bronze" ? (
                      <div className="flex flex-row items-center">
                        <img
                          className="w-5 h-5"
                          src={require(`../../images/bronze.png`)}
                          alt="Bronze"
                        />
                        Bronze
                      </div>
                    ) : info.required_caliber === "Silver" ? (
                      <div className="flex flex-row items-center">
                        <img
                          className="w-5 h-5"
                          src={require(`../../images/silver.png`)}
                          alt="Silver"
                        />
                        Silver
                      </div>
                    ) : (
                      <div className="flex flex-row items-center">
                        <img
                          className="w-5 h-5"
                          src={require(`../../images/gold.png`)}
                          alt="Gold"
                        />
                        Gold
                      </div>
                    )}
                  </div>
                  <h1 className="mt-3 text-sm">
                    Unit Price :{" "}
                    <span className="text-green-700  font-bold">
                      Rs. {info.serviceprice}
                    </span>
                  </h1>
                </div>
                <div className="flex justify-end space-x-4">
                  <Button
                    size="small"
                    className="text-white bg-sky-900 hover:bg-sky-700 rounded"
                    icon={<PlusOutlined style={{ fontSize: "13px" }} />}
                    onClick={() => fetchServiceDetails(info.id)}
                    disabled={info.status === "Not Available"}
                  >
                    Add
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
                      mask={false}
                    >
                      <div class="flex flex-col">
                        <Form layout="vertical" onFinish={giveServiceDetails}>
                          <Form.Item label="Service Name">
                            <Input
                              value={selectedItems.servicename}
                              defaultValue={selectedItems.servicename}
                            />
                          </Form.Item>
                          <Form.Item label="About the service:">
                            <Input.TextArea
                              value={selectedItems.servicedesc}
                              defaultValue={selectedItems.servicedesc}
                            />
                          </Form.Item>

                          <Form.Item label="Caliber Requirement:">
                            <Input
                              prefix={
                                selectedItems.required_caliber === "Bronze" ? (
                                  <div>
                                    <img
                                      className="w-5 h-5"
                                      src={require(`../../images/bronze.png`)}
                                      alt="Bronze"
                                    />
                                  </div>
                                ) : selectedItems.required_caliber ===
                                  "Silver" ? (
                                  <div>
                                    <img
                                      className="w-5 h-5"
                                      src={require(`../../images/silver.png`)}
                                      alt="Silver"
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <img
                                      className="w-5 h-5"
                                      src={require(`../../images/gold.png`)}
                                      alt="Gold"
                                    />
                                  </div>
                                )
                              }
                              value={selectedItems.required_caliber}
                              defaultValue={selectedItems.required_caliber}
                            />
                          </Form.Item>
                          <Form.Item label="Service for:">
                            <Input
                              value={selectedItems.servicetarget}
                              defaultValue={selectedItems.servicetarget}
                            />
                          </Form.Item>

                          <Form.Item label="Service Availability:">
                            <Input
                              value={selectedItems.serviceavailable}
                              defaultValue={selectedItems.serviceavailable}
                            />
                          </Form.Item>

                          <Form.Item
                            label={`For How Many ${selectedItems.serviceavailable}:`}
                            name="value"
                            rules={rules}
                          >
                            <InputNumber
                              onChange={(value) => setPickValue(value)}
                              min={1}
                            />
                          </Form.Item>

                          <Form.Item
                            label="Provide the location of work:"
                            name="location"
                            rules={rules}
                          >
                            <Input
                              onChange={(e) => setLocation(e.target.value)}
                              placeholder="Eg: Budhanilkantha-2 , Bhangal , Nepal"
                            />
                          </Form.Item>

                          <div className="flex flex-row space-x-2">
                            <h1>Set Time Frame:</h1>
                            <Form.Item label="From" name="from" rules={rules}>
                              <TimePicker
                                use12Hours
                                placeholder="From"
                                disabledHours={disabledHours}
                                format="HH"
                                onChange={(time, timeString) => {
                                  const formattedTime =
                                    timeString.concat(":00.000000");
                                  setStartHour(formattedTime);
                                }}
                              />
                            </Form.Item>
                            <Form.Item label="To:" name="to" rules={rules}>
                              <TimePicker
                                use12Hours
                                disabledHours={disabledHours}
                                placeholder="To"
                                format="HH"
                                onChange={(time, timeString) => {
                                  const formattedTime =
                                    timeString.concat(":00.000000");
                                  setEndHour(formattedTime);
                                }}
                              />
                            </Form.Item>
                          </div>

                          <Form.Item label="Service will expire on:">
                            <Input
                              value={calculatedDate()}
                              defaultValue={calculatedDate()}
                            />
                          </Form.Item>

                          <Form.Item label="Service Price:">
                            <Input
                              value={finalPrice}
                              defaultValue={finalPrice}
                            />
                          </Form.Item>

                          <div class="flex justify-center space-x-2 ">
                            <Button
                              className="text-white bg-sky-900 hover:bg-sky-700 rounded"
                              htmlType="submit"
                            >
                              {" "}
                              Submit Details
                            </Button>
                            <Button
                              className="text-white bg-red-900 hover:bg-red-700 rounded"
                              onClick={onClose}
                            >
                              Discard
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </Drawer>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <DashboardFooter />
      </div>
    </div>
  );
}

export default ServiceRequestClient;
