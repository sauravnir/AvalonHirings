import React, { useEffect,useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  Space,
  Table,
  Tag,
  Button,
  Popconfirm,
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
  const [contractDetails, setContractDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  console.log(contractDetails);

  const [tableAction, setTableAction] = useState("");

  const onApproval = () => {
    setTableAction("Approved");
  };

  const onTerminate = () => {
    setTableAction("Terminated");
  };

  // Fetching the data in the table
  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/contract/");
        const data1 = await response.json();
        const data = data1.slice(1);
        setContractDetails(data);
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

  // Date Picker
  const contents = [
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
          >
          <Button >
            <CheckOutlined />
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
          >
          <Button>
            <DeleteOutlined />
          </Button>
          </Popconfirm>
          
          <Button>
            <QuestionCircleOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  
  const data = contractDetails.map((contractDetail) => ({
    key: contractDetail.id,
    contract_id: contractDetail.contract_id,
    user_name: contractDetail.user.fullname,
    user_type: contractDetail.user.user_type,
    created_date: contractDetail.created_date,
    contract_status: [contractDetail.contract_status],
  }));
  
  
  


  // const contents = [
  //   {
  //     title: "Request ID",
  //     dataIndex: "contract_id",
  //     key: "contract",
  //     render: (text) => <a>{text}</a>,
  //   },
  //   {
  //     title: "Full Name",
  //     dataIndex: "user_name",
  //     key: "user_name",
  //   },
  //   {
  //     title: "For User Type",
  //     dataIndex: "user_type",
  //     key: "user_type",
  //   },
  //   {
  //     title: "Requested Date",
  //     dataIndex: "created_date",
  //     key: "created_date",
  //   },
  //   {
  //     title: "Approval Status",
  //     dataIndex: "contract_status",
  //     key: "contract_status",
  //     render: (_, { contract_status }) => (
  //       <>
  //         {contract_status &&
  //           contract_status.map((tag) => {
  //             let color = tag.length > 5 ? "geekblue" : "green";
  //             if (tag === "Active") {
  //               color = "green";
  //             } else if (tag === "Pending") {
  //               color = "yellow";
  //             } else {
  //               color = "red";
  //             }
  //             return (
  //               <Tag color={color} key={tag}>
  //                 {tag}
  //               </Tag>
  //             );
  //           })}
  //       </>
  //     ),
  //   },

  //   {
  //     title: "Actions",
  //     key: "actions",
  //     render: (_, { record }) => (
  //       <Space>
  //         <Button onClick={() => onApproval(record.key)}>
  //           <CheckOutlined />
  //         </Button>
  //         <Button onClick={() => onTerminate(record.key)}>
  //           <DeleteOutlined />
  //         </Button>
  //         <Button>
  //           <QuestionCircleOutlined />
  //         </Button>
  //       </Space>
  //     ),
  //   },
  // ];

  // On Click Button contents

  {
    /* <Modal
            title="User Profile / Contracts"
            okText="Confirm Edit"
            okType="default"
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={700}
          >
            <ToastContainer />
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

              <div class="shadow-xl shadow-zinc-300 pq-3 justify-self-center rounded">
                <div class="place-items-center">
                  <div class="flex flex-col p-2 mt-2 space-y-4 text-base">
                    <h1>Contract ID: <span class="hover:underline text-sky-500">207412</span> </h1>
                    <h1>Requested Date: 20202022</h1>
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
          </Modal> */
  }

  // const data = contractDetails.map((contractDetail) => ({
  //   key: contractDetail.id,
  //   contract_id: contractDetail.contract_id,
  //   user_name: contractDetail.user.fullname,
  //   user_type: contractDetail.user.user_type,
  //   created_date: contractDetail.created_date,
  //   contract_status: [contractDetail.contract_status],
  //   actions: (
  //     <Space>
  //       <Button onClick={() => onApproval(contractDetail.id)}>
  //         <CheckOutlined />
  //       </Button>
  //       <Button onClick={() => onTerminate(contractDetail.id)}>
  //         <DeleteOutlined />
  //       </Button>
  //       <Button>
  //         <QuestionCircleOutlined />
  //       </Button>
  //     </Space>
  //   ),
  // }));

  return (
    <div class="w-screen">
      <div class="flex flex-col mt-2 p-3">
        <div class="flex">
          <h1 class="text-3xl font-base">User Requests</h1>
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
            <Table columns={contents} dataSource={data} loading={loading} />
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default ContractReviewDashboard;
