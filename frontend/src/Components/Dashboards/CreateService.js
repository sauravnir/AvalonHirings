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
} from "antd";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import DashboardFooter from "./DashboardFooter";

function CreateService() {
  const [openModal, setOpenModal] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceTarget, setServiceTarget] = useState("");
  const [servicePricing, setServicePricing] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const navigate = useNavigate();
  const { TabPane } = Tabs;

  const [loading ,setLoading] = useState(false);

  const [viewServicesModal , setViewServicesModal] = useState(false);

  // Store the fetched data for later use

  const [createdService, setCreatedService] = useState([]);
  const serviceData = {
    servicename: serviceName,
    servicedesc: serviceDescription,
    servicetarget: serviceTarget,
    serviceprice: servicePricing,
  };

  //   GET Method to insert the data
  const handleFormSubmit = async () => {
    try {
      // ServiceData.append("")
      const response = await fetch("http://127.0.0.1:8000/createservice/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(serviceData),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate("../admin-dashboard");
      }
    } catch (error) {
      toast.error("Error in creating service!");
      console.log(error);
    }
  };

  // Fetching the created service data from the server
useEffect(()=>{
    const fetchServiceData = async () => {
        try {
          const res = await fetch("http://127.0.0.1:8000/getservices/");
          const data = await res.json();
          setCreatedService(data);
          console.log(data);
        } catch (error) {
          toast.error(error);
        }
      };
      fetchServiceData();
},[])
  

  //Contents for client tables

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


  const allServicesList = createdService.map((info) => ({
    key: info.id,
    service_name: info.servicename,
    service_for: info.servicetarget,
    service_price: info.serviceprice,
    // servicedesc: info.servicedesc,
  }));

  console.log(allServicesList);     
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
                  required
                  validationErrors={{
                    isDefaultRequiredValue: "Field is required",
                  }}
                />
              </Form.Item>
              <Form.Item label="Service For:">
                <Radio.Group
                  onChange={(e) => setServiceTarget(e.target.value)}
                  defaultValue="Household"
                >
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
            loading = {loading}
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
            <Table />
          </TabPane>
        ),
      },
      {
        key: "4",
        label: "Active Services",
        children: (
          <TabPane tab="Active Services" key="4">
            <Table />
          </TabPane>
        ),
      },
      {
        key: "5",
        label: "Completed Services",
        children: (
          <TabPane tab="Completed Services" key="5">
            <Table />
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
