import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Tag,
  Descriptions,
  Divider,
  message,
  Breadcrumb,
  Tooltip,
  Select,
} from "antd";

import { EyeOutlined, HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import DashboardFooter from "./DashboardFooter";
import Spinner from "../../Pages/ProfileSettings/Spinner";

function CreateService() {
  const rules = [
    {
      required: true,
      message: "required",
    },
  ];
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceTarget, setServiceTarget] = useState("");
  const [servicePricing, setServicePricing] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [status, setStatus] = useState("Available");
  const [serviceAvailable, setServiceAvailable] = useState("");
  const [serviceCaliber, setServiceCaliber] = useState("");
  const navigate = useNavigate();
  const { TabPane } = Tabs;
  const [loading, setLoading] = useState(false);
  const [viewServicesModal, setViewServicesModal] = useState(false);
  const [viewRequestedServices, setViewRequestedServices] = useState([]);
  const [singleRequestedService, setSingleRequestedService] = useState({
    fullname: "",
    servicename: "",
    requested_date: "",
    expiry_date: "",
    servicelocation: "",
    totalprice: "",
    servicevalue: "",
    servicetarget: "",
    contact: "",
    payment_method: "",
    payment_approval: "",
    status: "",
    required_caliber: "",
  });

  const [selectedRecordKey, setSelectedRecordKey] = useState(null);

  // storing the free employee information

  const [freeEmployees, setFreeEmployees] = useState([]);
  const [assignedEmployees, setAssignedEmployee] = useState("");
  const [paymentApproval, setPaymentApproval] = useState("");

  const handleInfoClick = (id) => {
    fetchRequestedService(id);
    setOpenModal(true);
  };

  // Creating variables for single created service

  const [singleCreatedService, setSingleCreatedService] = useState([]);
  // Store the fetched data for later use
  console.log(singleCreatedService.id);

  const [createdService, setCreatedService] = useState([]);

  // Setting the service data while creating
  const serviceData = {
    servicename: serviceName,
    servicedesc: serviceDescription,
    servicetarget: serviceTarget,
    serviceprice: servicePricing,
    status: status,
    serviceavailable: serviceAvailable,
    required_caliber: serviceCaliber,
  };

  //   GET Method to insert the data
  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/createservice/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        const data = await response.json();
        message.success(data.message);
        navigate("/admin-dashboard");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    }
  };

  // Fetching the created service data from the server
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://127.0.0.1:8000/getservices/");
        const data = await res.json();
        setCreatedService(data);
      } catch (error) {
        toast.error(error);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      }
    };
    fetchServiceData();
  }, []);

  const [updateDesc, setUpdatedDesc] = useState("");
  const [updatedServiceTarget, setUpdatedServiceTarget] = useState("");
  const [updatedServiceAvailable, setUpdatedServiceAvailable] = useState("");
  const [updatedServicePricing, setUpdatedServicePricing] = useState("");
  const [updatedAvailability, setUpdatedAvailability] = useState("");

  // Getting the details for the single created service to update
  const fetchSingleServiceData = async (Id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/getservice/${Id}`);
      const data = await res.json();
      setSingleCreatedService(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSingleServiceData = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://127.0.0.1:8000/updatecreatedservice/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_list_id: id,
            servicedesc: updateDesc,
            servicetarget: updatedServiceTarget,
            serviceavailable: updatedServiceAvailable,
            servicepricing: updatedServicePricing,
            serviceavailability: updatedAvailability,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        message.success(data.message);
        navigate("/admin-dashboard");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    }
  };

  // Loading all requested services
  useEffect(() => {
    const serviceRequest = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://127.0.0.1:8000/getrequestedservice/");
        const data = await res.json();
        setViewRequestedServices(data);
      } catch (error) {
        message.error("Failed To Fetch Data"); 
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      }
    };
    serviceRequest();
  }, []);

  // Loading singular requested service
  const fetchRequestedService = async (id) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/singlerequestedservice/${id}`
      );
      const data = await res.json();
      const {
        user,
        services,
        approved_date,
        expiry_date,
        servicelocation,
        totalprice,
        servicevalue,
        payments,
        startHour,
        status,
      } = data;

      const updateSingleRequestedService = {
        fullname: user?.fullname || "",
        servicename: services?.servicename || "",
        requested_date: approved_date || "",
        expiry_date: expiry_date || "",
        servicelocation: servicelocation || "",
        totalprice: totalprice || "",
        servicevalue: servicevalue || "",
        servicetarget: services?.servicetarget || "",
        contact: user?.contact || "",
        payment_method: payments[0]?.payment_method || "",
        payment_approval: payments[0]?.payment_approval || "",
        startHour: startHour.split(":")[0] || "",
        status: status || "",
        required_caliber: services?.required_caliber || "",
      };

      setSingleRequestedService(updateSingleRequestedService);
    } catch (error) {
      toast.error(error);
    }
  };

  // Update Service Request / Status

  const updateServiceRequest = async (approvalType, serviceID) => {
    try {
      setLoading(true);
      const url = `http://127.0.0.1:8000/updateservicerequest/${serviceID}`;

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };

      // Include assigned employee details only when approvalType is "Payment Required"
      if (approvalType === "On-Going") {
        requestOptions.body = JSON.stringify({
          action: approvalType,
          assignedEmployee: assignedEmployees,
          paymentApproval: paymentApproval,
        });
      } else {
        requestOptions.body = JSON.stringify({ action: approvalType });
      }

      const response = await fetch(url, requestOptions);

      if (response.ok) {
        const data = await response.json();
        message.success(data.message);
        navigate("/admin-dashboard");
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      message.error("Failed To Assign Maid!");
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    }
  };

  // Loading the free-employees from AssignedEmployees model

  useEffect(() => {
    setLoading(true);
    const getAssignedEmployees = async () => {
      const res = await fetch("http://127.0.0.1:8000/freeemployees/");
      const data = await res.json();
      setFreeEmployees(data);
      console.log(data);
    };
    setLoading(false);
    getAssignedEmployees();
  }, []);

  //View Services

  const serviceTableContents = [
    {
      title: "S.N",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Service Name",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Service For",
      dataIndex: "service_for",
      key: "service_for",
    },
    {
      title: "Service Price",
      dataIndex: "service_price",
      key: "service_price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="medium">
          <Button
            size="small"
            icon={<EyeOutlined style={{ fontSize: "13px" }} />}
            onClick={() => {
              setViewServicesModal(true);
              fetchSingleServiceData(record.key);
              setSelectedRecordKey(record.key);
            }}
          ></Button>
          <Modal
            title="Service Details"
            open={viewServicesModal}
            onCancel={() => setViewServicesModal(false)}
            width={400}
            footer={null}
            // onOk={() =>updateSingleServiceData(record.key)}
            centered
          >
            <Form
              layout="vertical"
              onFinish={() => updateSingleServiceData(selectedRecordKey)}
            >
              <Form.Item label="Service Name">
                <Input
                  value={singleCreatedService.servicename}
                  defaultValue={singleCreatedService}
                  disabled
                />
              </Form.Item>
              <Form.Item
                label="Service Description"
                name="description"
                rules={rules}
              >
                <Input.TextArea
                  placeholder={singleCreatedService.servicedesc}
                  onChange={(e) => setUpdatedDesc(e.target.value)}
                  rows={5}
                />
              </Form.Item>
              <Form.Item label="Service For" name="For" rules={rules}>
                <Radio.Group
                  onChange={(e) => setUpdatedServiceTarget(e.target.value)}
                >
                  <Radio.Button value="Select:" disabled>
                    Select:
                  </Radio.Button>
                  <Radio.Button value="Household">Household</Radio.Button>
                  <Radio.Button value="Business">Business</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Select Service Available Days"
                name="Available"
                rules={rules}
              >
                <select
                  class="p-2 border rounded w-60"
                  onChange={(e) => setUpdatedServiceAvailable(e.target.value)}
                >
                  <option>Select From Below</option>
                  <option disabled>Hours (currently disabled)</option>
                  <option>Months</option>
                  <option>Weeks</option>
                </select>
              </Form.Item>
              <Form.Item
                label="Service Base Pricing"
                name="Pricing"
                rules={rules}
              >
                <InputNumber
                  addonBefore="Rs"
                  onChange={(value) => setUpdatedServicePricing(value)}
                />
              </Form.Item>
              <Form.Item
                label="Select Availability"
                name="Availability"
                rules={rules}
              >
                <Radio.Group
                  onChange={(e) => setUpdatedAvailability(e.target.value)}
                >
                  <Radio.Button value="Select" disabled>
                    Select:
                  </Radio.Button>
                  <Radio.Button value="Available">Available</Radio.Button>
                  <Radio.Button value="Not Available">
                    Not Available
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
              <div class="space-x-2">
                <Button htmlType="submit">Update</Button>
                <Button onClick={() => setViewServicesModal(false)}>
                  Discard
                </Button>
              </div>
            </Form>
          </Modal>
        </Space>
      ),
    },
  ];

  // View Requested Services by the client
  const serviceRequestTable = [
    {
      title: "S.N",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Client Name",
      dataIndex: "client_name",
      key: "client_name",
      render: (_, record) => {
        return (
          <div className="flex flex-col">
            {record.client_name.subscribed !== "N/A" ? (
              <Tooltip title="Premium Client">
                <img
                  className="w-4 h-4"
                  src={require(`../../images/crown.png`)}
                  alt="subscribe-icon"
                />
              </Tooltip>
            ) : null}
            <h1>{record.client_name.fullname}</h1>
          </div>
        );
      },
      sorter: (a, b) => {
        return a.client_name.subscribed != "N/A"
          ? -1
          : b.client_name.subscribed !== "N/A"
          ? 1
          : 0;
      },
    },

    {
      title: "Service Name",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Service Caliber",
      dataIndex: "service_caliber",
      key: "service_caliber",
      filterMultiple: false,
      render: (record) => {
        return (
          <div>
            {record === "Bronze" ? (
              <div className="flex flex-row items-center">
                <img
                  className="w-5 h-5"
                  src={require(`../../images/bronze.png`)}
                  alt="Bronze"
                />
                Bronze
              </div>
            ) : record === "Silver" ? (
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
        );
      },
    },
    {
      title: "Requested Date",
      dataIndex: "requested_date",
      key: "requested_date",
    },
    {
      title: "Request Status",
      dataIndex: "request_status",
      key: "request_status",
      filters: [
        { text: "Payment Required", value: "Payment Required" },
        {
          text: "Allocating",
          value: "Allocating",
        },
        { text: "On-Going", value: "On-Going" },
        { text: "Completed", value: "Completed" },
      ],
      render: (requestStatus) => {
        let color = requestStatus.length > 5 ? "geekblue" : "green";
        if (requestStatus === "On-Going") {
          color = "green";
        } else if (requestStatus === "Allocating") {
          color = "yellow";
        } else if (requestStatus === "Completed") {
          color = "gray";
        } else {
          color = "red";
        }
        return (
          <Tag color={color} key={requestStatus}>
            {requestStatus}
          </Tag>
        );
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div className="flex flex-col space-y-2" style={{ padding: 8 }}>
          <Select
            mode="multiple"
            style={{ width: 200 }}
            placeholder="Select Status"
            onChange={(value) => setSelectedKeys(value || [])}
            onDeselect={confirm}
            value={selectedKeys}
            options={[
              "Payment Required",
              "Allocating",
              "On-Going",
              "Completed",
            ].map((status) => ({
              value: status,
              label: status,
            }))}
          />
          <Button
            type="default"
            onClick={confirm}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.request_status.includes(value),
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            icon={<EyeOutlined style={{ fontSize: "13px" }} />}
            onClick={() => handleInfoClick(record.key)}
          ></Button>
          <Modal
            title="Details:"
            description
            open={openModal}
            okType="default"
            onCancel={() => setOpenModal(false)}
            cancelButtonProps={{
              disabled: true,
            }}
            onOk={() => setOpenModal(false)}
            width={1500}
            centered
            footer={[
              <Button
                key="back"
                className="text-white bg-red-900 hover:bg-red-700 rounded"
                onClick={() => setOpenModal(false)}
              >
                Back
              </Button>,
              // Conditionally rendering the buttons
              <Button
                className="text-white bg-sky-900 hover:bg-sky-700 rounded"
                onClick={() => updateServiceRequest("On-Going", record.key)}
                disabled={
                  (singleRequestedService.status =
                    "On-Going" || singleRequestedService.status === "Completed")
                }
              >
                {singleRequestedService.status === "On-Going" ||
                singleRequestedService.status === "Completed"
                  ? "Employee Assigned"
                  : "Assign & Approve"}
              </Button>,
            ]}
          >
            <Descriptions bordered layout="vertical">
              <Descriptions.Item label="Client Name">
                {singleRequestedService.fullname}
              </Descriptions.Item>
              <Descriptions.Item label="Service Name">
                {singleRequestedService.servicename}
              </Descriptions.Item>

              <Descriptions.Item label="Service Caliber">
                {singleRequestedService.required_caliber === "Bronze" ? (
                  <div className="flex flex-row items-center">
                    <img
                      className="w-5 h-5"
                      src={require(`../../images/bronze.png`)}
                      alt="Bronze"
                    />
                    Bronze
                  </div>
                ) : singleRequestedService.required_caliber === "Silver" ? (
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
              </Descriptions.Item>

              <Descriptions.Item label="Requested Date">
                {moment(singleRequestedService.approved_date).format(
                  "YYYY-MM-DD"
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Total Price">
                <h1 class="text-green-700 ">
                  Rs.{singleRequestedService.totalprice}
                </h1>
              </Descriptions.Item>
              <Descriptions.Item label="Service For">
                {singleRequestedService.servicetarget}
              </Descriptions.Item>
              <Descriptions.Item label="Expiry Date">
                {moment(singleRequestedService.expiry_date).format(
                  "YYYY-MM-DD"
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Location">
                {singleRequestedService.servicelocation}
              </Descriptions.Item>
              <Descriptions.Item label="Contact no:">
                {singleRequestedService.contact}
              </Descriptions.Item>

              {singleRequestedService.status === "Allocating" ||
              singleRequestedService.status === "On-Going" ||
              singleRequestedService.status === "Completed" ? (
                <Descriptions.Item label="Payment Status">
                  <div class="flex flex-row items-center">
                    <img
                      class="w-5 h-5 mr-3"
                      src={require(`../../images/tick.png`)}
                    ></img>
                    Paid
                  </div>
                </Descriptions.Item>
              ) : (
                <Descriptions.Item label="Payment Status">
                  <div class="flex flex-row items-center">
                    <img
                      class="w-5 h-5 mr-3"
                      src={require(`../../images/cross.png`)}
                    ></img>
                    Not Paid
                  </div>
                </Descriptions.Item>
              )}
              {singleRequestedService.payment_method === "Khalti Payment" ? (
                <Descriptions.Item label="Payment Method">
                  Online Payment
                </Descriptions.Item>
              ) : (
                <Descriptions.Item label="Payment Method">
                  Cash Payment
                </Descriptions.Item>
              )}

              <Descriptions.Item label="Starting Time:">
                {/* Checking the condition to put AM or PM  */}
                {singleRequestedService.startHour
                  ? parseInt(
                      singleRequestedService.startHour.split(":")[0],
                      10
                    ) <= 12
                    ? singleRequestedService.startHour + " AM"
                    : parseInt(
                        singleRequestedService.startHour.split(":")[0],
                        10
                      ) -
                      12 +
                      ":" +
                      singleRequestedService.startHour.split(":")[1] +
                      " PM"
                  : "No start hour available"}
              </Descriptions.Item>
              <Descriptions.Item label="Approve Payment" name="Approve">
                <Radio.Group
                  onChange={(e) => setPaymentApproval(e.target.value)}
                >
                  <Radio.Button value="Select" disabled>
                    Select
                  </Radio.Button>
                  <Radio.Button value="Payment Received">
                    Payment Received
                  </Radio.Button>
                  <Radio.Button value="Payment Not Received">
                    Payment Not Received
                  </Radio.Button>
                </Radio.Group>
              </Descriptions.Item>
            </Descriptions>
            <Divider></Divider>

            <Card>
              <div class="grid grid-cols-2 items-end justify-center space-y-2">
                <div className="flex flex-row items-center space-x-2 justify-center">
                  <h1 class="items-center text-sky-900 text-lg font-bold">
                    AVAILABLE MAID/S:
                  </h1>
                  <select
                    class="border rounded h-8"
                    onChange={(e) => setAssignedEmployee(e.target.value)}
                    required
                  >
                    {/* Fetching the employees from the database and then assigning to any of the requested services */}
                    {freeEmployees.length === 0 ? (
                      <option value="" disabled>
                        No available employees
                      </option>
                    ) : (
                      <>
                        <option value="" disabled>
                          Choose from the option below:
                        </option>
                        {/* Fetching the employees from the database and then assigning to any of the requested services */}
                        {freeEmployees.map((info) => {
                          return (
                            <option
                              key={info.id}
                              value={info.assigned_employee.fullname}
                            >
                              <div class="flex flex-row items-center">
                                {info.assigned_employee.fullname}(
                                {info.caliber.caliber_level.toUpperCase()})
                              </div>
                            </option>
                          );
                        })}
                      </>
                    )}
                  </select>
                </div>

                <div className="flex flex-row items-center space-x-2 justify-center">
                  <h1 className="text-lg text-sky-900 font-bold">
                    ASSIGNED MAID:
                  </h1>
                  <space>No Maid Assigned Yet:</space>
                </div>
              </div>
            </Card>
          </Modal>
        </Space>
      ),
    },
  ];

  // View All Services
  const allServicesList = createdService.map((info, index) => ({
    sn: index + 1,
    key: info.id,
    service_name: info.servicename,
    service_for: info.servicetarget,
    service_price: info.serviceprice,
    status: info.status,
  }));

  // Data Source For Requested Services
  const allRequestedService = viewRequestedServices.map((info, index) => ({
    sn: index + 1,
    key: info.id,
    client_name: {
      fullname: info.user.fullname,
      subscribed: info.subscription ? info.subscription : "N/A",
    },
    service_name: info.services.servicename,
    service_caliber: info.services.required_caliber,
    requested_date: moment(info.approved_date).format("YYYY-MM-DD"),
    request_status: info.status,
  }));

  // Filtering the table data based on subscription
  const subscribedClients = allRequestedService.filter(
    (client) => client.client_name.subscribed !== "N/A"
  );
  const otherClients = allRequestedService.filter(
    (client) => client.client_name.subscribed === "N/A"
  );

  const sortedData = [...subscribedClients, ...otherClients];
  //   Setting Tabs list

  const TabList = [
    {
      key: "1",
      label: "Add Service",
      children: (
        <TabPane tab="Add Service" key="1">
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item label="Package Name" name="Package" rules={rules}>
              <Input
                onChange={(e) => setServiceName(e.target.value)}
                validationErrors={{
                  isDefaultRequiredValue: "Field is required",
                }}
              />
            </Form.Item>
            <Form.Item label="Service For" name="For" rules={rules}>
              <Radio.Group onChange={(e) => setServiceTarget(e.target.value)}>
                <Radio.Button value="Select:" disabled>
                  Select:
                </Radio.Button>
                <Radio.Button value="Household">Household</Radio.Button>
                <Radio.Button value="Business">Business</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Caliber Requirement:"
              name="caliberrequire"
              rules={rules}
            >
              <Radio.Group onChange={(e) => setServiceCaliber(e.target.value)}>
                <Radio.Button value="Select:" disabled>
                  Select:
                </Radio.Button>
                <Radio.Button value="Bronze">
                  <div class="flex flex-row items-center ">
                    <img
                      class="w-3 h-3 mr-2"
                      src={require(`../../images/bronze.png`)}
                    ></img>{" "}
                    Bronze
                  </div>
                </Radio.Button>
                <Radio.Button value="Silver">
                  <div class="flex flex-row items-center ">
                    <img
                      class="w-3 h-3 mr-2"
                      src={require(`../../images/silver.png`)}
                    ></img>{" "}
                    Silver
                  </div>
                </Radio.Button>
                <Radio.Button value="Gold">
                  <div class="flex flex-row items-center ">
                    <img
                      class="w-3 h-3 mr-2"
                      src={require(`../../images/gold.png`)}
                    ></img>{" "}
                    Gold
                  </div>
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Service Description"
              name="Description"
              rules={rules}
            >
              <Input.TextArea
                rows={4}
                onChange={(e) => setServiceDescription(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Select Service Available Days"
              name="Days"
              rules={rules}
            >
              <select
                class="p-2 border rounded w-60"
                onChange={(e) => setServiceAvailable(e.target.value)}
              >
                <option>Select From Below</option>
                <option disabled>Hours (currently disabled)</option>
                <option>Months</option>
                <option>Weeks</option>
              </select>
            </Form.Item>
            <Form.Item label="Service Base Pricing" name="Price" rules={rules}>
              <InputNumber
                addonBefore="Rs"
                defaultValue={1000}
                onChange={(value) => setServicePricing(value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="text-white bg-sky-900 hover:bg-sky-700 rounded"
                // onClick={() => setOpenModal1(true)}
                htmlType="submit"
              >
                Create
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      ),
    },
    {
      key: "2",
      label: "View Services",
      children: (
        <TabPane tab="View Services" key="2">
          <Table
            columns={serviceTableContents}
            dataSource={allServicesList}
            bordered
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Total ${total} items`,
            }}
          />
        </TabPane>
      ),
    },
    {
      key: "3",
      label: "Service Requests",
      children: (
        <TabPane tab="Service Status" key="3">
          <Table
            columns={serviceRequestTable}
            dataSource={sortedData}
            bordered
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Total ${total} items`,
            }}
          />
        </TabPane>
      ),
    },
  ];

  return (
    <div class="w-screen mt-8">
      {loading && <Spinner />}
      <div class="flex flex-col mt-2 p-6">
        <div className="flex flex-row justify-between items-center w-full p-3">
          <h1 className="text-xl  font-bold">Add - View services</h1>
          <Breadcrumb
            items={[
              {
                href: "/admin-dashboard",
                title: <HomeOutlined />,
              },
              {
                title: "Ratings and Services",
              },
              {
                href: "/create-service",
                title: "Add - View Services",
              },
            ]}
          />
        </div>
        <ToastContainer position="top-center" autoClose={5000} />

        <div class="p-3 bg-white rounded shadow-xl shadow-gray-350">
          <Card>
            <Tabs>{TabList.map((tab) => tab.children)}</Tabs>
          </Card>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default CreateService;
