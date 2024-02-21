import React, { useEffect, useState } from "react";

import {
  Tabs,
  Tag,
  Modal,
  Table,
  Space,
  Button,
  Select, 
  Card,
  Descriptions,
   Breadcrumb
} from "antd";
import { SearchOutlined , EyeOutlined, HomeOutlined } from "@ant-design/icons";
import DashboardFooter from "../Dashboards/DashboardFooter";

import Spinner from "../../Pages/ProfileSettings/Spinner";

function WorkSchedules() {
  const [modalOpen, setModalOpen] = useState(false);
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
  });

  console.log("The id status is ", activeService.id)


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
          console.log(data);
        const {service_request, assigned_service_details, client_details } =
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
      title:"Status",
      dataIndex:"work_status",
      key:"work_status",
      filterMultiple:false , 
      filters:[
        { text: "Active", value: "Active" },
        { text: "Completed", value: "Completed" },
      ],
      render: (_,{work_status}) => (
        <>
        {work_status &&
        work_status.map((tag)=>{
          let color;
          if (tag === "Active") {
            color = "green";
          } else if (tag === "Completed"){
            color = "yellow";
          }
          return (
            <Tag color = {color} key = {tag}>
              {tag}
            </Tag>
          )
        })}
        </>
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div className="flex flex-col space-y-2" style={{ padding: 8 }}>
          <Select
            mode="multiple"
            style={{ width: 200 }}
            placeholder="Select Status"
            onChange={(value) => setSelectedKeys(value || [])}
            onDeselect={confirm}
            value={selectedKeys}
            options={["Active", "Completed"].map((status) => ({
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
      onFilter: (value, record) => record.work_status.includes(value),
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
                <Descriptions layout="horizontal" size="middle" row={2}>
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
                
                  <Descriptions.Items label="From">
                    {new Date(activeService.approved_date).toLocaleDateString()}
                  </Descriptions.Items>

                  <Descriptions.Items label="Till">
                    {new Date(activeService.expiry_date).toLocaleDateString()}
                  </Descriptions.Items>
                  <Descriptions.Items label="Starting Hour:" >
                  {parseInt(activeService.startHour.split(":")[0], 10) <= 12 ? activeService.startHour + ' AM' : (parseInt(activeService.startHour.split(":")[0], 10) - 12) + ':' + activeService.startHour.split(":")[1] + ' PM'}
                    </Descriptions.Items>
                </Descriptions>
              </div>
            </div>
          </Modal>
        </Space>
      ),
    },
  ];

  
  const workTableData = activeService && activeService.id && activeService.servicename && activeService.fullname && activeService.workstatus ? [
    {
      key: activeService.id,
      service_name: activeService.servicename,
      client_name: activeService.fullname,
      work_status: [activeService.workstatus === "Occupied" ? "Active" : "Completed"],
    },
  ] : [];   
  return (
    <div className="w-screen mt-8">
      {loading && <Spinner />}
      <div className="flex flex-col mt-2 p-6">
        <div className="flex flex-row w-full items-center justify-between p-3">
          <h1 className="text-xl  font-bold">Work Status</h1>
          <Breadcrumb items={[
              {
                href:"/employee-dashboard",
                title:<HomeOutlined />
              },
              {
                href:"/employee-review-ratings",
                title:"Work Status"
              }
              ]}/>
        </div>
        <div class="p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
          <Card>
          <Table columns={workTable} dataSource={workTableData} pagination={{
            pageSize: 10,
            showTotal: (total) => `Total ${total} items`,
          }} bordered />
          </Card>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default WorkSchedules;
