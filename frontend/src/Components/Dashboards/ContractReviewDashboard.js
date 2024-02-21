import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Space,
  Table,
  Tag,
  Button,
  Popconfirm,
  Modal,
  Descriptions,
  Select,
  Input,
  message,
  Breadcrumb,
  Form
} from "antd";

import {
  EyeOutlined,
  CheckOutlined,
  DeleteOutlined,
  SearchOutlined,
  HomeOutlined,
  StarOutlined
  
} from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import DashboardFooter from "./DashboardFooter";

import Spinner from "../../Pages/ProfileSettings/Spinner";

function ContractReviewDashboard() {

  const rules = [{
    required : true , 
    message : "required"
  }]

  const [openModal, setOpenModal] = useState(false);
  
  const [contractDetails, setContractDetails] = useState([]);
  const originalContractDetails = useRef([]);
  const [loading, setLoading] = useState(false);
  const [singleData, setSingleData] = useState([]);
  const navigate = useNavigate();
  const [caliber , setCaliber] = useState('')
  const [searchQuery, setSearchQuery] = useState("");
  const [userInputReceived, setUserInputReceived] = useState(false);
  const [caliberRecordKey , setCaliberRecordKey] = useState();
  // Fetching the data in the table
  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/contract/");
        const data1 = await response.json();
        const data = data1.slice(1);
        setContractDetails(data);
        originalContractDetails.current = data;
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchContractDetails();
  }, []);

  const fetchModalData = async (actionType, contractId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8000/contractupdate/${contractId}`,
        {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: actionType }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        message.success(data.message);
        navigate("/admin-dashboard");
      } else {
        // Handle error
        message.error(`Failed to ${actionType} request`);
      }
    } catch (error) {
      message.error("Error Occured!");
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setUserInputReceived(true);
  };

  useEffect(() => {
    const applySearchAndFilter = async () => {
      try {
        let newData = [...originalContractDetails.current];

        if (searchQuery.trim() !== "") {
          newData = newData.filter(
            (item) =>
              item.user.fullname
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              item.user.user_type
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              item.contract_id.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setContractDetails(newData);
      } catch (error) {
        toast.error(error.message);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    };
    if (userInputReceived) {
      applySearchAndFilter();
    } else {
      setContractDetails([...originalContractDetails.current]);
      setUserInputReceived(false);
    }
  }, [searchQuery, userInputReceived]);



  const handleCaliberSubmit = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/assigncaliber/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({caliber :caliber}), 
      });
      setLoading(false);
  
      if (response.ok) {
        const data = await response.json();
        message.success(data.message);
        navigate('/admin-dashboard')
      }
      setLoading(false);
    } catch (error) {
      message.error(error.message);
    }
  };
  

  // Table Contents
  const contents = [
    {
      title: "S.N",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Request ID",
      dataIndex: "contract_id",
      key: "contract",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Full Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "For User Type",
      dataIndex: "user_type",
      key: "user_type",
      filterMultiple : false , 
      filters :[
        { text: "Client", value: "Client" },
        { text: "Employee", value: "Employee" },
      ],
     filterDropdown :({ setSelectedKeys , selectedKeys, confirm}) => (
      <div class="flex flex-col space-y-2" style={{ padding: 8 }}>
          <Select
            mode="multiple"
            style={{ width: 200 }}
            placeholder="Select User Type"
            onChange={(value) => setSelectedKeys(value || [])}
            onDeselect={confirm}
            value={selectedKeys}
            options={["Employee" , "Client"].map((status) => ({
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
     onFilter : (value  ,record ) => record.user_type.includes(value)
    },
    {
      title: "Requested Date",
      dataIndex: "created_date",
      key: "created_date",
    },
    {
      title:"Caliber Level",
      dataIndex : "caliber_level",
      key : "caliber_level",
      render : (record) => {
        return(
          <div className="flex flex-row space-x-2 items-center">
            {record !== "N/A" && <img className="w-8 h-8" src={require(`../../images/${record}.png`)} alt={record} />}
            <h1>{(record).toUpperCase()}</h1>
          </div>
        )
      }
    },
    {
      title: "Approval Status",
      dataIndex: "contract_status",
      key: "contract_status",
      filterMultiple: false,
      filters: [
        { text: "Approved", value: "Approved" },
        { text: "Pending", value: "Pending" },
        { text: "Terminated", value: "Terminated" },
      ],
      render: (_, { contract_status }) => (
        <>
          {contract_status &&
            contract_status.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "Approved") {
                color = "green";
              } else if (tag === "Terminated") {
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
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div class="flex flex-col space-y-2" style={{ padding: 8 }}>
          <Select
            mode="multiple"
            style={{ width: 200 }}
            placeholder="Select Status"
            onChange={(value) => setSelectedKeys(value || [])}
            onDeselect={confirm}
            value={selectedKeys}
            options={["Approved", "Pending", "Terminated"].map((status) => ({
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
      onFilter: (value, record) => record.contract_status.includes(value),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Do you want to approve this user?"
            placement="topRight"
            okText="Approve"
            okType="default"
            onConfirm={() => fetchModalData("Approved", record.key)}
            disabled={record.contract_status === "Approved"}
          >
            <Button
              size="small"
              icon={<CheckOutlined style={{ fontSize: "13px" }} />}
            >

            </Button>
          </Popconfirm>
          <Popconfirm
            title="Do you want to terminate this user?"
            description="Note: This action cannot be undone"
            placement="topRight"
            okText="Terminate"
            okType="default"
            danger
            onConfirm={() => fetchModalData("Terminated", record.key)}
            disabled={record.contract_status === "Terminated"}
          >
            <Button
              size="small"
              icon={<DeleteOutlined style={{ fontSize: "13px" }} />}
            ></Button>
          </Popconfirm>

          {record.user_type ==="Employee" ? (<div>
          <Button
          size="small"
          icon = {<StarOutlined />}
          onClick={() =>{setCaliberRecordKey(record.key);setOpenModal(true)} }
          >
          </Button></div>) : null}

          <Modal
          title="Assign a caliber"
          open={openModal}
          onCancel={()=>setOpenModal(false)}
          footer={null}
          centered
          >
            <Form layout="vertical" onFinish={()=>handleCaliberSubmit(caliberRecordKey)}>
            <Form.Item label="Set Caliber:" name="caliber" rules={rules}>
              <Select 
              onChange={(value) => setCaliber(value)}
              options={[
                {
                  value: "Choose From The Options Below",
                  label: "Choose From The Options Below",
                  disabled: true,
                },
                {
                  value: "bronze",
                  label: "Bronze",
                },
                {
                  value: "silver",
                  label:  "Silver",
                },
                {
                  value: "gold",
                  label:"Gold"
                },
              ]}
              />
              
            </Form.Item>
            <div className="flex flex-row space-x-2 mt-2">
                <Button
                  className = "text-white bg-sky-900 hover:bg-sky-700 rounded"
                  htmlType="submit"
                >
                  CONFIRM
                </Button>
                <Button
                className="text-white bg-red-900 hover:bg-red-700 rounded"
                onClick={() => setOpenModal(false)}
                >
                  CANCEL
                </Button>
              </div>
            </Form>
          </Modal> 
          
        </Space>
      ),
    },
  ];

  const data = contractDetails.map((info, index) => ({
    sn: contractDetails.length -index,
    key: info.id,
    contract_id: info.contract_id,
    user_name: info.user.fullname,
    user_type: info.user.user_type,
    created_date: info.created_date,
    caliber_level : (info.caliber? info.caliber.caliber_level : "N/A" ), 
    contract_status: [info.contract_status],
  })).reverse();
  
  return (
    <div class="w-screen mt-8">
      {loading && <Spinner />}
      <div class="flex flex-col mt-2 p-6">
        <div className="flex flex-row justify-between items-center w-full p-3">
          <h1 className="text-xl font-bold">Member Requests</h1>
          <Breadcrumb
            items={[
              {
                href: "/admin-dashboard",
                title: <HomeOutlined />,
              },
              {
                title:"Users & Requests",
              },
              {
                href: "/admin-contractreview",
                title: "Member Requests",
              },
            ]}
          />
        </div>
        
        <ToastContainer />
        <div class="grid p-3 bg-white rounded shadow-xl shadow-gray-350">
        <div class="grid grid-cols-2 p-2">
          <div class="flex flex-row justify-start w-60">
            <Input
              prefix={<SearchOutlined />}
              width={100}
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Seach Item"
            />
          </div>
          <div class="flex flex-row justify-end">
            <Link to="/all-users">
              <Button
                icon={<EyeOutlined />}
                className="bg-sky-900 text-white rounded hover:bg-sky-700"
                type="default"
              >
                View All Users
              </Button>
            </Link>
          </div>
        </div>
          <div class="grid grid-row pt-3">
            <Table
              columns={contents}
              dataSource={data}
              pagination={{
                pageSize: 10,
                showTotal: (total) => `Total ${total} items`,
              }}
            />
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default ContractReviewDashboard;
