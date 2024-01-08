import React, { useEffect,useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  Space,
  Table,
  Tag,
  Button,
  Popconfirm,
  Modal,
  Descriptions
} from "antd";
import {
  CheckOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import DashboardFooter from "./DashboardFooter";

function ContractReviewDashboard() {

  const [openModal , setOpenModal] = useState(false)
  const [contractDetails, setContractDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singleData , setSingleData] = useState([])
  const navigate = useNavigate();

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
        const response = await fetch("http://127.0.0.1:8000/contract/");
        const data1 = await response.json();
        const data = data1.slice(1);
        setContractDetails(data);
        console.log(data)
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchContractDetails();
  }, []);

  const fetchModalData = async (actionType , contractId) => {
    try {
      // console.log('Record:', record);

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
        navigate('/admin-dashboard')
        toast.success(`Request ${actionType} Successfully`);
       
      } else {
        // Handle error
        toast.error(`Failed to ${actionType} request`);
      }
    } catch (error) {
      toast.error("Error Occured!");
    }
  };


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
      title:"S.N",
      dataIndex:"sn",
      key:"sn",
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
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Popconfirm 
          title="Do you want to approve this user?"
          placement="topRight"
          okText = "Approve"
          okType = "default"
          onConfirm = {() => fetchModalData("Approved", record.key)}
          disabled={record.contract_status === "Approved"}
          >
          <Button size="small" icon={<CheckOutlined style={{ fontSize: '13px' }}/>}>
            
          </Button>
          </Popconfirm>
          <Popconfirm
          title="Do you want to terminate this user?"
          description="Note: This action cannot be undone"
          placement="topRight"
          okText="Terminate"
          okType = "default"
          danger
          onConfirm={() => fetchModalData("Terminated", record.key)}
          disabled={record.contract_status === "Terminated"}
          >
          <Button size="small" icon={<DeleteOutlined style={{ fontSize: '13px' }}/>}>
          </Button>
          </Popconfirm>

          <Button icon={<QuestionCircleOutlined style={{ fontSize: '13px' }}/>} size="small" onClick={()=>toast.info("In Development")}>
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
        onOk={() =>setOpenModal(false)}
        width={1000}
        centered
        >
        <Descriptions  bordered>
        {/* <Descriptions.Item label="User Name">{singleData.user.fullname}</Descriptions.Item> */}
      </Descriptions>
        </Modal>
        </Space>
      ),
    },
  ];
  

  const data = contractDetails.map((info , index) => ({
    sn:index+1,
    key: info.id,
    contract_id: info.contract_id,
    user_name: info.user.fullname,
    user_type: info.user.user_type,
    created_date: info.created_date,
    contract_status: [info.contract_status],
  }));
  
  return (
    <div class="w-screen mt-14">
      <div class="flex flex-col mt-2 p-6">
      <div className="flex w-full bg-white  rounded shadow p-3">
          <h1 className="text-xl font-bold">User Requests</h1>
        </div>
        <ToastContainer />
        <div class="grid p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
          <div class="grid p-3 grid-cols-2">
            <div>
              <form class="space-x-5">
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
                  Search
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
                    <option>Approved</option>
                    <option>Pending</option>
                    <option>Terminated</option>
                  </select>
                  <button
                    class="bg-green-500 py-2 px-2 rounded border text-white hover:bg-violet-800 hover:shadow-lg text-sm"
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
            <Table columns={contents} dataSource={data} 
            pagination ={{
              pageSize:10 , 
              showTotal :(total) => `Total ${total} items`,
            }} loading={loading} />
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default ContractReviewDashboard;
