import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardFooter from "./DashboardFooter";
import { Card, Button, Modal, Tabs, Table, Space, Descriptions, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// import InfiniteScroll from 'react-infinite-scroll-component';

function ViewReports() {
  const [openModalClient, setOpenModalClient] = useState(false);
  const [action, setAction] = useState("");
  const navigate = useNavigate();
  const [actionResponse, setActionResponse] = useState(null);

  const { TabPane } = Tabs;

  console.log(actionResponse);
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
        const response = await fetch("http://127.0.0.1:8000/getreport/");
        const contentType = response.headers.get("content-type");
        console.log("Content-Type:", contentType);
        const data = await response.json();
        // console.log(data);
        setReportDetails(data);
      } catch (error) {
        console.error("Error fetching report details:", error);
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
    }
  };

  useEffect(() => {
    if (action) {
      postApproval();

      navigate("/admin-dashboard");
    }
  }, [action]);

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
      render:(report_status ,record)=>{
        console.log(report_status)
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
      }
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

  
  const pendingData = reportDetails
  .filter((info) => info.report_action === "Pending")
  .map((info, index) => ({
    sn: index + 1,
    key: info.id,
    user_name: info.user.fullname,
    user_type: info.user.user_type,
    report_title: info.title,
    report_status: info.report_action,
  }));
  
  const approvedData = reportDetails
  .filter((info) => info.report_action === "Approved")
  .map((info, index) => ({
    sn: index + 1,
    key: info.id,
    user_name: info.user.fullname,
    user_type: info.user.user_type,
    report_title: info.title,
    report_status: info.report_action,
  }));

  const deniedData = reportDetails
  .filter((info) => info.report_action === "Denied")
  .map((info, index) => ({
    sn: index + 1,
    key: info.id,
    user_name: info.user.fullname,
    user_type: info.user.user_type,
    report_title: info.title,
    report_status: info.report_action,
  }));

  // Contents in the tab
  const TabList = [
    {
      key: "1",
      label: "Pending",
      children: (
        <TabPane tab="Pending" key="1">
        
          <Table
            columns={pendingItems}
            dataSource={pendingData}
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Total ${total} items`,
            }}
          />
        </TabPane>
      ),
    },
    {
      key: "2",
      label: "Approved",
      children: (
        <TabPane tab="Approved" key="2">
          <Table
            columns={pendingItems}
            dataSource={approvedData}
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Total ${total} items`,
            }}
          />
        </TabPane>
      ),
    },
    {
      key: "3",
      label: "Denied",
      children: (
        <TabPane tab="Denied" key="3">
          <Table
            columns={pendingItems}
            dataSource={deniedData}
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Total ${total} items`,
            }}
          />
        </TabPane>
      ),
    },
 
  ];

  return (
    <div class="w-screen mt-14">
      <div class="flex flex-col mt-2 p-6">
        <div className="flex w-full bg-white  rounded shadow p-3">
          <h1 className="text-xl font-bold">Reports and Issues</h1>
        </div>
        <ToastContainer position="top-center" autoClose={5000} />

        <div class="p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
          <Card>
            <Tabs>{TabList.map((tab) => tab.children)}</Tabs>
            <Modal
              open={openModalClient}
              onCancel={modalCancelClient}
              okText="Approve"
              cancelText="Decline"
              footer={[
                <Button key="back" size="small" onClick={modalCancelClient}>
                  Back
                </Button>,
                modalDetails.report_action === "Pending" && (
                  <>
                    <Button
                      style={{ backgroundColor: "green", color: "white" }}
                      size="small"
                      onClick={onApproval}
                    >
                      Approve
                    </Button>
                    <Button
                      style={{ backgroundColor: "red", color: "white" }}
                      size="small"
                      onClick={onDenial}
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
