import React, { useEffect, useState } from "react";

import {
  Tabs,
  Modal,
  Table,
  Space,
  Button,
  Card,
  Descriptions,
  Badge,
  Breadcrumb
} from "antd";
import { EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import DashboardFooter from "../Dashboards/DashboardFooter";

import Spinner from "../../Pages/ProfileSettings/Spinner";

function WorkSchedules() {
  const [modalOpen, setModalOpen] = useState(false);
  const { TabPane } = Tabs;
  const [loading , setLoading] = useState(false);
  const [activeService, setActiveService] = useState({
    id: "",
    servicename: "",
    fullname: "",
    serviceavailable: "",
    contact: "",
    servicelocation: "",
    servicedesc: "",
    expiry_date: "",
    profilepicture: "",
    workstatus: "",
    approved_date: "",
    startHour : "",
    endHour : "",
  });

  const data = localStorage.getItem("userData");

  const userType = JSON.parse(data);

  useEffect(() => {
    const viewAssignedService = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/assignedservices/${userType.user_id}`
        );
        const data = await response.json();

        const { service_request, assigned_service_details, client_details } =
          data;
        const viewActiveService = {
          id: data.id,
          servicename: assigned_service_details?.servicename || "",
          fullname: client_details?.fullname || "",
          serviceavailable: assigned_service_details?.serviceavailable || "",
          contact: client_details?.contact || "",
          servicelocation: service_request?.servicelocation || "",
          servicedes: assigned_service_details?.servicedesc || "",
          expiry_date: service_request?.expiry_date || "",
          profilepicture: client_details?.profilepic || "",
          workstatus: data.work_status,
          approved_date: assigned_service_details?.approved_date || "",
          startHour : service_request?.startHour || "",
          endHour : service_request?.endHour || "",
        };

        setActiveService(viewActiveService);
        
      } catch (error) {
        console.log(error);
      }finally {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      }
    };

    viewAssignedService();
  }, []);

  const workTable = [
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
      title: "Client Name",
      dataIndex: "client_name",
      key: "clent_name",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, { action }) => (
        <Space>
          <Button
            size="small"
            icon={<EyeOutlined style={{ fontSize: "13px" }} />}
            onClick={() => setModalOpen(true)}
          ></Button>
          <Modal
            title="Client's Details"
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            footer={null}
            width={1000}
            centered={true}
          >
            <div class="flex flex-col p-4 items-center">
              <div class="bordered space-y-2">
                <Descriptions layout="horizontal" size="middle" bordered>
                  <Descriptions.Items label="Client Profile">
                    <div class="flex flex-row items-center justify-center">
                      <a href={activeService.profilepicture}>
                        <img
                          class="w-16 h-16 rounded-full border mb-5 object-cover"
                          alt="User Picture"
                          src={activeService.profilepicture}
                        ></img>
                      </a>
                    </div>
                  </Descriptions.Items>
                  <Descriptions.Items label="Client's Name:">
                    {activeService.fullname}
                  </Descriptions.Items>

                  <Descriptions.Items label="Client's Contact:">
                    {activeService.contact}
                  </Descriptions.Items>

                  <Descriptions.Items label="Work Location">
                    {activeService.servicelocation}
                  </Descriptions.Items>

                  <Descriptions.Items label="Service Name">
                    {activeService.servicename}
                  </Descriptions.Items>

                  <Descriptions.Items label="Description">
                    {activeService.servicedes}
                  </Descriptions.Items>
                  {/* <Descriptions.Items label="Service Time">
                    {activeService.serviceavailable}
                  </Descriptions.Items> */}

                  <Descriptions.Items label="From">
                    {new Date(activeService.approved_date).toLocaleDateString()}
                  </Descriptions.Items>

                  <Descriptions.Items label="Till">
                    {new Date(activeService.expiry_date).toLocaleDateString()}
                  </Descriptions.Items>
                  <Descriptions.Items label="Working Hours" >
                    {(activeService.startHour).split(':')[0]} to {(activeService.endHour).split(':')[0]}
                    </Descriptions.Items>
                  <Descriptions.Items label="Status">
                    <Badge status="processing" text="Active" />
                  </Descriptions.Items>
                </Descriptions>
              </div>
            </div>
          </Modal>
        </Space>
      ),
    },
  ];

  const workTableData = [
    {
      sn: 1,
      key: activeService.id,
      service_name: activeService.servicename,
      client_name: activeService.fullname,
    },
  ];

  const TabList = [
    {
      key: "1",
      label: "Active Work",
      children: (
        <TabPane tab="Active Work" key="1">
          <Table columns={workTable} dataSource={workTableData} bordered />
        </TabPane>
      ),
    },
    {
      key: "2",
      label: "Work History",
      children: (
        <TabPane tab="Work History" key="2">
          <Table
            columns={workTable}
            // dataSource={workTableData}
            bordered
          />
        </TabPane>
      ),
    },
  ];
  return (
    <div className="w-screen mt-8">
      {loading && <Spinner />}
      <div className="flex flex-col mt-2 p-6">
        <div className="flex flex-row w-full items-center justify-between p-3">
          <h1 className="text-xl  font-bold">Work Schedules</h1>
          <Breadcrumb items={[
              {
                href:"/employee-dashboard",
                title:<HomeOutlined />
              },
              {
                href:"/employee-review-ratings",
                title:"Work Schedule"
              }
              ]}/>
        </div>
        <ToastContainer position="bottom-center" autoClose={6000} />
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

export default WorkSchedules;
