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
  Popconfirm,
  Descriptions,
} from "antd";
import {
  CheckOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import DashboardFooter from "./DashboardFooter";

function CreateService() {
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  const [serviceName, setServiceName] = useState("");
  const [serviceTarget, setServiceTarget] = useState("");
  const [servicePricing, setServicePricing] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [status, setStatus] = useState("Available");
  const [serviceAvailable, setServiceAvailable] = useState("");
  const navigate = useNavigate();
  const { TabPane } = Tabs;

  const [loading, setLoading] = useState(false);

  const [viewServicesModal, setViewServicesModal] = useState(false);

  const [viewRequestedServices, setViewRequestedServices] = useState([]);

  const [singleRequestedService, setSingleRequestedService] = useState([]);

  const handleInfoClick = (id) => {
    fetchRequestedService(id);
    setOpenModal(true);
  };

  // Store the fetched data for later use

  const [createdService, setCreatedService] = useState([]);

  // Setting the service data while creating
  const serviceData = {
    servicename: serviceName,
    servicedesc: serviceDescription,
    servicetarget: serviceTarget,
    serviceprice: servicePricing,
    status: status,
    serviceavailable: serviceAvailable,
  };

  //   GET Method to insert the data
  const handleFormSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/createservice/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(serviceData),
      });
      if (response.ok) {
        navigate("../client-dashboard");
      }
    } catch (error) {
      toast.error("Error in creating service!");
      console.log(error);
    }
  };

  // Fetching the created service data from the server
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/getservices/");
        const data = await res.json();
        setCreatedService(data);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchServiceData();
  }, []);

  // Loading all requested services
  useEffect(() => {
    const serviceRequest = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/getrequestedservice/");
        const data = await res.json();
        setViewRequestedServices(data);
      } catch (error) {
        toast.error("Failed to fetch services!");
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
      setSingleRequestedService(data);

      if (res.ok) {
        console.log(data);
      } else {
        console.log("Failed to fetch service");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // Update Service Request / Status

  const updateServiceRequest = async (approvalType, serviceID) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/updateservicerequest/${serviceID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: approvalType }),
        }
      );

      if (response.ok) {
        navigate("../admin-dashboard");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  //View Services

  const serviceTableContents = [
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
      render: (_, { action }) => (
        <Space size="medium">
          <Button onClick={() => setViewServicesModal(true)}>View</Button>
          <Modal
            title="Data Display Garna Parcha Update Hune Sahit "
            open={viewServicesModal}
            // onOk={()}
            onCancel={() => setViewServicesModal(false)}
            okText="Update"
            okType="default"
            width={400}
          ></Modal>
        </Space>
      ),
    },
  ];

  // View Requested Services by the client
  const serviceRequestTable = [
    {
      title: "Client Name",
      dataIndex: "client_name",
      key: "client_name",
    },
    {
      title: "Service Name",
      dataIndex: "service_name",
      key: "service_name",
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
      render: (requestStatus) => {
        let color = requestStatus.length > 5 ? "geekblue" : "green";
        if (requestStatus === "On-Going") {
          color = "yellow";
        } else if (requestStatus === "Pending") {
          color = "blue";
        } else {
          color = "red";
        }

        return (
          <Tag color={color} key={requestStatus}>
            {requestStatus}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => setOpenModal1(true)}>
            <CheckOutlined />
          </Button>
          <Modal
            title="Confirm Service Request?"
            open={openModal1}
            okType="default"
            onCancel={() => setOpenModal1(false)}
            onOk={() => updateServiceRequest("On-Going" , record.key)}
          ></Modal>

          <Button onClick={() => setOpenModal2(true)}>
            <CloseOutlined />
          </Button>
          <Modal
            title="Terminate Service Request?"
            open={openModal2}
            okType="default"
            danger
            okCancel={() => setOpenModal2(false)}
            onOk={() => updateServiceRequest("Terminated", record.key)} 
          ></Modal>
          <Button onClick={() => handleInfoClick(record.id)}>
            <QuestionCircleOutlined />
          </Button>
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
            width={1000}
            centered
          >
            <Descriptions bordered>
              {/* <Descriptions.Item label="Client Name">{singleRequestedService.user.fullname}</Descriptions.Item> */}
              {/* <Descriptions.Item label="Service Name">{singleRequestedService.services.servicename}</Descriptions.Item>
        <Descriptions.Item label="Requested Date">
          {moment(singleRequestedService.approved_date).format('YYYY-MM-DD')}
        </Descriptions.Item>
        <Descriptions.Item label="Total Price"><h1 class="text-green-700 text-lg">Rs.{singleRequestedService.totalprice}</h1></Descriptions.Item>
        <Descriptions.Item label="Service For">{singleRequestedService.services.servicetarget}</Descriptions.Item>
        <Descriptions.Item label="Expiry Date">
          {moment(singleRequestedService.expiry_date).format('YYYY-MM-DD')}
        </Descriptions.Item> */}
            </Descriptions>
          </Modal>
        </Space>
      ),
    },
  ];

  // View All Services
  const allServicesList = createdService.map((info) => ({
    key: info.id,
    service_name: info.servicename,
    service_for: info.servicetarget,
    service_price: info.serviceprice,
    status: info.status,
  }));

  // Data Source For Requested Services

  const allRequestedService = viewRequestedServices.map((info) => ({
    key: info.id,
    client_name: info.user.fullname,  
    service_name: info.services.servicename,
    requested_date: moment(info.approved_date).format("YYYY-MM-DD"),
    request_status: info.status,
  }));

  //   Setting Tabs list

  const TabList = [
    {
      key: "1",
      label: "Add Service",
      children: (
        <TabPane tab="Add Service" key="1">
          <form onSubmit={handleFormSubmit}>
            <Form layout="vertical">
              <Form.Item label="Package Name">
                <Input
                  onChange={(e) => setServiceName(e.target.value)}
                  validationErrors={{
                    isDefaultRequiredValue: "Field is required",
                  }}
                />
              </Form.Item>
              <Form.Item label="Service For">
                <Radio.Group onChange={(e) => setServiceTarget(e.target.value)}>
                  <Radio.Button value="Select:" disabled>
                    Select:
                  </Radio.Button>
                  <Radio.Button value="Household">Household</Radio.Button>
                  <Radio.Button value="Business">Business</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Service Description">
                <Input.TextArea
                  rows={4}
                  onChange={(e) => setServiceDescription(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Select Service Available Days">
                <select
                  class="p-2 border rounded w-60"
                  onChange={(e) => setServiceAvailable(e.target.value)}
                >
                  <option>Select From Below</option>
                  <option>Hours</option>
                  <option>Months</option>
                  <option>Weeks</option>
                </select>
              </Form.Item>
              <Form.Item label="Service Pricing">
                <InputNumber
                  addonBefore="Rs"
                  defaultValue={1000}
                  onChange={(value) => setServicePricing(value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{ background: "green", color: "white" }}
                  onClick={() => setOpenModal(true)}
                >
                  Create
                </Button>
                <Modal
                  title="Are you sure?"
                  description
                  open={openModal}
                  okText="Submit"
                  onCancel={() => setOpenModal(false)}
                  onOk={handleFormSubmit}
                  okType="default"
                  width={400}
                  centered
                />
              </Form.Item>
            </Form>
          </form>
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
            loading={loading}
            bordered
          />
        </TabPane>
      ),
    },
    {
      key: "3",
      label: "Service Requests",
      children: (
        <TabPane tab="Service Requests" key="3">
          <Table
            columns={serviceRequestTable}
            dataSource={allRequestedService}
            loading={loading}
            bordered
          />
        </TabPane>
      ),
    },
  ];

  return (
    <div class="w-screen">
      <div class="flex flex-col mt-2 p-3">
        <div className="flex mt-8 ">
          <h1 className="text-2xl font-base">Add/View Services</h1>
        </div>
        <ToastContainer position="top-center" autoClose={5000} />

        <div class="p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
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
