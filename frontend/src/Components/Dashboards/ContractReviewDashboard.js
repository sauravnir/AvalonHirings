import React, { useEffect, useState, useRef } from "react";

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
} from "antd";

import {
  CheckOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import DashboardFooter from "./DashboardFooter";

import Spinner from "../../Pages/ProfileSettings/Spinner";

function ContractReviewDashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [contractDetails, setContractDetails] = useState([]);
  const originalContractDetails = useRef([]);
  const [loading, setLoading] = useState(false);
  const [singleData, setSingleData] = useState([]);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [userInputReceived, setUserInputReceived] = useState(false);
  // console.log(contractDetails);

  // const onApproval = () => {
  //   setTableAction("Approved");
  // };

  // const onTerminate = () => {
  //   setTableAction("Terminated");
  // };

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

        
      } catch (error) {
        toast.error(error.message);
      }finally{
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      }
    };

    fetchContractDetails();
  }, []);

  const fetchModalData = async (actionType, contractId) => {
    try {
      // console.log('Record:', record);
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8000/contractupdate/${contractId}`,
        {
          method: "POST", // Adjust the method as needed
          headers: {
            "Content-Type": "application/json",
            // Add other headers if needed
          },
          body: JSON.stringify({ action: actionType }),
        }
      );
        
      if (response.ok) {
        // Handle success

        // window.location.reload();
        navigate("/admin-dashboard");
        toast.success(`Request ${actionType} Successfully`);
      } else {
        // Handle error
        toast.error(`Failed to ${actionType} request`);
      }
    } catch (error) {
      toast.error("Error Occured!");
    }finally{
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
        setLoading(true);
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
      }finally{
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      }
    };
    if (userInputReceived) {
      applySearchAndFilter();
    } else {
      setContractDetails([...originalContractDetails.current]);
      setUserInputReceived(false);
    }
  }, [searchQuery, userInputReceived]);

  // Fetch Singular Data

  // const fetchSingularData = async(id) => {
  //   try{
  //     const res = await fetch(`http://127.0.0.1:8000/contractinfo/${id}`);
  //     const data = await res.json();
  //     setSingleData(data)
  //   }
  //   catch(error){
  //     toast.error(error)
  //   }
  // }

  // const handleInfoClick =(id)=>{
  //   fetchSingularData(id);
  //   setOpenModal(true);
  // }

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
    },
    {
      title: "Requested Date",
      dataIndex: "created_date",
      key: "created_date",
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
            ></Button>
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

          <Button
            icon={<QuestionCircleOutlined style={{ fontSize: "13px" }} />}
            size="small"
            onClick={() => toast.info("In Development")}
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
            width={1000}
            centered
          >
            <Descriptions bordered>
              {/* <Descriptions.Item label="User Name">{singleData.user.fullname}</Descriptions.Item> */}
            </Descriptions>
          </Modal>
        </Space>
      ),
    },
  ];

  const data = contractDetails.map((info, index) => ({
    sn: index + 1,
    key: info.id,
    contract_id: info.contract_id,
    user_name: info.user.fullname,
    user_type: info.user.user_type,
    created_date: info.created_date,
    contract_status: [info.contract_status],
  }));

  return (
    <div class="w-screen mt-8">
      {loading && <Spinner />}
      <div class="flex flex-col mt-2 p-6">
        <div className="flex w-full p-3">
          <h1 className="text-xl font-bold">User Requests</h1>
        </div>
        <ToastContainer />
        <div class="grid p-3 bg-white rounded shadow-xl shadow-gray-350">
          <div class="grid p-3 grid-cols-2">
            <div>
              {/* <form class="space-x-5"> */}
              <input
                class="shadow rounded border border-gray-200 w-60 py-2 px-3 text-gray-700 text-sm mb-3 leading-tight invalid:border-red-500  focus:shadow-outline"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search For Contracts"
                name="SearchBarForContracts"
              />
              {/* </form> */}
            </div>
          </div>
          {/* Horiziontal Line */}
          <div class="w-full h-0.5 bg-gray-500 border"></div>

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
