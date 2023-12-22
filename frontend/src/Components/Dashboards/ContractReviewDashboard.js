import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Space, Table, Tag, Button, Modal, Avatar, Select, DatePicker } from "antd";
import { EyeOutlined, UserOutlined } from "@ant-design/icons";
import axios from 'axios';

import DashboardFooter from "./DashboardFooter";

function ContractReviewDashboard() {
  const [contractDetails , setContractDetails] = useState([]);
  
  // API DATA STORAGE
  const [contractDuration , setContractDuration] = useState([]);
  const [contractID , setContractID] = useState([]);
  const [constractStatus , setContractStatus] = useState([]);
  const [contractKey , setContractKey] = useState([]);
  const [renewalDate , setRenewalDate] = useState([]);
  const [dateOfBirth, setdateOfBirth] = useState([]);
  const [email,setEmail] = useState([]);
  const [fullName , setFullName] = useState([]);
  const [userType , setUserType] = useState([]);
  const [userName , setUserName] = useState([]);
  

  console.log(contractDetails.user);

  useEffect(() =>{
        axios.get("http://127.0.0.1:8000/contract/")
        .then(res =>setContractDetails(res.data))
        .catch(err => console.log(err));  
  },[]);

  const [open, setOpen] = useState(false);
  // Radio Button handle change 
  const handleContractChange=(value) =>{
    console.log(value)
  }

  // Date Picker 
  const { RangePicker } = DatePicker;

  const contents = [
    {
      title: "Contract ID",
      dataIndex: "contract_id",
      key: "contract",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "User's Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "User Type",
      dataIndex: "user_type",
      key: "user_type",
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "created_date",
    },
    {
      title: "Contract Status",
      dataIndex: "contract_status",
      key: "contract_status",
      render: (_, { contract_status }) => (
        <>
          {contract_status &&
            contract_status.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "Active") {
                color = "green";
              } else if (tag === "Pending") {
                color = "yellow";
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="medium">
          <Button onClick={() => setOpen(true)}>
            <EyeOutlined style={{ fontSize: "20px" }} />
          </Button>
          <Modal
            title="User Profile / Contracts"
            okText="Confirm Edit"
            okType="default"
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={700}
          >
            <div class="w-full h-0.5 bg-gray-500 border"></div>
            <div class="grid grid-cols-2 p-5">
              <div class="shadow-xl p-3 shadow-zinc-300 justify-self-center rounded">
                <div class="justify-self-center">
                  <div class="flex items-center justify-center space-x-2">
                  <Avatar size={100} icon={<UserOutlined />}/>
                  </div>
                  <div class="flex flex-col p-2 mt-2 space-y-2 text-base items-center justify-center">
                    <h1 class='text-xs text-sky-500 hover:underline'>207412</h1>
                    <h1>Name: Saurav Niraula</h1>
                    <h1>User Type: Client</h1>
                    <h1>Date of Birth: 20202022</h1>
                    <h1>Email: niraulasaurav2@gmail.com</h1>
                  </div>
                </div>
              </div>

              <div class="shadow-xl shadow-zinc-300 p-3 justify-self-center rounded">
                <div class="place-items-center">
                  <div class="flex flex-col p-2 mt-2 space-y-4 text-base">
                    <h1>Contract ID: <span class="hover:underline text-sky-500">207412</span> </h1>
                    <h1>Created Date: 20202022</h1>
                    <h1>Renewal Date: <DatePicker></DatePicker></h1>
                    <h1>Contract Duration: <RangePicker size={"small"}></RangePicker></h1>
                    <h1>
                      Contract Status: 
                       <Select
                        defaultValue="Active"
                        style={{
                          width: 120,
                        }}
                        onChange={(handleContractChange)}
                        options={[
                          {
                            value: 'Active',
                            label: 'Active',
                          },
                          {
                            value: 'Pending',
                            label: 'Pending',
                          },
                          {
                            value: 'Inactive',
                            label: 'Inactive',
                          },
                          {
                            value: 'Terminated',
                            label: 'Terminated',  
                          },
                        ]}
                      ></Select>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </Space>
      ),
    },
  ];

  const data = contractDetails.map(contractDetail => ({
    key: contractDetail.id,
    contract_id: contractDetail.contract_id,
    user_name: contractDetail.user.fullname,
    user_type: contractDetail.user.user_type,
    created_date: contractDetail.created_date,
    contract_status: [contractDetail.contract_status],
  }));


  return (
    <div class="w-screen">
      <div class="flex flex-col mt-2 p-3">
        <div class="flex">
          <h1 class="text-3xl font-base">Contract/Review</h1>
        </div>

        <div class="grid p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
          <div class="grid p-3 grid-cols-2">
            <div>
              <form class="space-x-5" >
                <input
                  class="shadow rounded border border-gray-200 w-60 py-2 px-3 text-gray-700 text-sm mb-3 leading-tight invalid:border-red-500  focus:shadow-outline"
                  type="text"
                  placeholder="Search For Contracts"
                  name="SearchBarForContracts"
                />
                <button
                  class="bg-green-500 py-2 px-2 rounded border text-white hover:bg-green-600 hover:shadow-lg text-sm"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
            <div class="justify-self-end">
              <div>
                <form class="space-x-5 ">
                  <select
                    class="rounded border border-gray-200 text-sm text-gray-500 px-2 py-2"
                    type="text"
                  >
                    <option class="">Choose From The List Below</option>
                    <option>Test</option>
                    <option>Test</option>
                  </select>
                  <button
                    class="bg-violet-500 py-2 px-2 rounded border text-white hover:bg-violet-800 hover:shadow-lg text-sm"
                    type="submit"
                  >
                    Filter Search
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* Horiziontal Line */}
          <div class="w-full h-0.5 bg-gray-500 border"></div>

          <div class="grid grid-row pt-3">
            <Table columns={contents} dataSource={data} />
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default ContractReviewDashboard;
