import React, { useState, useEffect , useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardFooter from "./DashboardFooter";
import { Card, Button, Modal, Table, Space, Descriptions, Tag , Breadcrumb, Select , message , Input } from "antd";
import { EyeOutlined, HomeOutlined , SearchOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../../Pages/ProfileSettings/Spinner";
import "react-toastify/dist/ReactToastify.css";

// import InfiniteScroll from 'react-infinite-scroll-component';

function ViewReports() {
  const [openModalClient, setOpenModalClient] = useState(false);
  const [action, setAction] = useState("");
  const navigate = useNavigate();
  const [actionResponse, setActionResponse] = useState(null);
  const [loading , setLoading] = useState(false);
  const [searchQuery , setSearchQuery] = useState('');
  const [userInput , setUserInput] = useState(false);
  const onSearchChange = useRef([])

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
    setUserInput(true);
}


  const onApproval = () => {
    setAction("Approved");
  };

  const onDenial = () => {
    setAction("Denied");
  };

  const [modalDetails, setModalDetails] = useState({
    fullname: "",
    contact: "",
    title: "",
    description: "",
    date: "",
    username: "",
    user_id: "",
    report_action : ""
  });

  const [reportDetails, setReportDetails] = useState([]);

  const showReportClient = (report) => {
    fetchModalData(report);
    setOpenModalClient(true);
  };

  const modalCancelClient = () => {
    setOpenModalClient(false);
  };

  // Fetching the reports from API
  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/getreport/");
        const contentType = response.headers.get("content-type");
        const data = await response.json();
        setReportDetails(data);
        onSearchChange.current = data ;
      } catch (error) {
        console.error("Error fetching report details:", error);
      }finally{
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      }
    };

    fetchReportDetails();
  }, []);

  // Fetching the data in modal
  const fetchModalData = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/getreportobject/${id}/`
      );
      const data = await response.json();
      console.log("Modal Data", data);
      const { user, title, description, issue_date , report_action } = data[0];
      console.log(data);
      setModalDetails({
        fullname: user?.fullname || "",
        contact: user?.contact || "",
        title: title || "",
        description: description || "",
        date: issue_date || "",
        username: user?.username || "",
        user_id: id || "",
        report_action : report_action || ""
      });
      
    } catch (error) {
      console.error("Error fetching report details:", error);
    }
  };

  const postApproval = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8000/updatereport/${modalDetails.user_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: action }),
        }
      );

      const responseData = await response.json();
      // setActionResponse(responseData)
      if (response.ok && responseData.success) {
        toast.success("Response has been recorded");
      } else {
        console.error(responseData.error);
      }
    } catch (error) {
      console.log(error);
    }finally{
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (action) {
      postApproval();
      message.success("Success!");
      navigate("/admin-dashboard");
    }
  }, [action]);


// Searching Query 
useEffect(() => {
  const filterData = async () => {
      try{
          setLoading(true);
          let newData = [...onSearchChange.current]

          if(searchQuery.trim() !== ""){
              newData = newData.filter((item)=>
              item.user.fullname.toLowerCase().includes(searchQuery.toLowerCase())||
              item.user.user_type.toLowerCase().includes(searchQuery.toLowerCase())
              )
          }
          setReportDetails(newData);
          setLoading(false)
      }catch(error){
          message.error('Failed To Load Data');
      }
  };

  if(userInput){
    filterData();
  }else{
    setReportDetails([...onSearchChange.current])
    setUserInput(false);
  }
},[userInput , searchQuery])


  const pendingItems = [
    {
      title: "S.N",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "User Type",
      dataIndex: "user_type",
      key: "user_type",
    },
    {
      title: "Report Title",
      dataIndex: "report_title",
      key: "report_title",
    },
    {
      title: "Report Status",
      dataIndex: "report_status",
      key: "report_status",
      filterMultiple: false,
      filters: [
        { text: "Approved", value: "Approved" },
        { text: "Pending", value: "Pending" },
        { text: "Denied", value: "Denied" },
      ],
      render:(report_status ,record)=>{
        let color = report_status.length > 5 ? "geekblue" : "green";
        if (report_status === "Pending"){
          color = "yellow";
        } else if (report_status === "Approved"){
          color = "green";
        }else {
          color = "red"
        }
        return (
          <Tag color = {color} key = {record.key}>
            {report_status}
          </Tag>
        )
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div class="flex flex-col space-y-2" style={{ padding: 8 }}>
          <Select
            mode="multiple"
            style={{ width: 200 }}
            placeholder="Select Status"
            onChange={(value) => setSelectedKeys(value || [])}
            onDeselect={confirm}
            value={selectedKeys}
            options={["Approved", "Pending", "Denied"].map((status) => ({
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
      onFilter: (value, record) => record.report_status.includes(value),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => showReportClient(record.key)}
            size="small"
            icon={<EyeOutlined style={{ fontSize: '13px' }}/>}
            >
          </Button>
        </Space>
      ),
    },
  ];

  
  const pendingData = reportDetails.map((info, index) => ({
    sn: reportDetails.length - index,
    key: info.id,
    user_name: info.user.fullname,
    user_type: info.user.user_type,
    report_title: info.title,
    report_status: info.report_action,
  })).reverse();

  return (
    <div class="w-screen mt-8">
      {loading && <Spinner />}
      <div class="flex flex-col mt-2 p-6">
        <div className="flex flex-row justify-between items-center w-full p-3">
          <h1 className="text-xl font-bold">Reports and Issues</h1>
          <Breadcrumb items={[
              {
                href:"/admin-dashboard",
                title:<HomeOutlined />
              },
              {
                href:"/admin-view-reports",
                title:"Reports"
              }
              ]}/>
        </div>
        <ToastContainer position="top-center" autoClose={5000} />

        <div class="p-3 bg-white rounded shadow-xl shadow-gray-350">
          <Card>
            <div className="flex flex-row justify-start w-60 py-2">
              <Input 
              prefix = {<SearchOutlined />}
              placeholder="Search Items"
              value = {searchQuery}
              onChange={handleSearchQuery}
              />
            </div>
          <Table
            columns={pendingItems}
            dataSource={pendingData}
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Total ${total} items`,
            }}
          />
            <Modal
              open={openModalClient}
              onCancel={modalCancelClient}
              okText="Approve"
              cancelText="Decline"
              footer={[
                <Button key="back" onClick={modalCancelClient}>
                  Back
                </Button>,
                modalDetails.report_action === "Pending" && (
                  <>
                    <Button
                      onClick={onApproval}
                      className="bg-sky-900 hover:bg-sky-700 rounded text-white"
                    > 
                      Approve
                    </Button>
                    <Button
                      // style={{ backgroundColor: "red", color: "white" }}
                      onClick={onDenial}
                      className="bg-red-900 hover:bg-red-700 rounded text-white"
                    >
                      Decline
                    </Button>
                  </>
                ),
              ]}
              width={1000}
            >
              
                <Descriptions title="Report Details" layout="vertical" bordered>
                  <Descriptions.Items label="Report ID">
                    {modalDetails.user_id}
                  </Descriptions.Items>
                  <Descriptions.Items label="Fullname">
                    {modalDetails.fullname}
                  </Descriptions.Items>
                  <Descriptions.Items label="Username:">
                    {modalDetails.username}
                  </Descriptions.Items>
                  <Descriptions.Items label="Contact Number">
                    {modalDetails.contact}
                  </Descriptions.Items>
                  <Descriptions.Items label="Report Title">
                    {modalDetails.title}
                  </Descriptions.Items>
                  <Descriptions.Items label="Issued Date:">
                    {modalDetails.date}
                  </Descriptions.Items>
                  <Descriptions.Items label="Report Description">
                    {modalDetails.description}
                  </Descriptions.Items>
                  
                </Descriptions>
         
            </Modal>
          </Card>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default ViewReports;
