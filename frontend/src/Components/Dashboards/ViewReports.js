import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardFooter from "./DashboardFooter";
import { Card, Button, Modal, Tabs } from "antd";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// import InfiniteScroll from 'react-infinite-scroll-component';

function ViewReports() {
  const [loading, setLoading] = useState(false);
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

  console.log(action);
  const [modalDetails, setModalDetails] = useState({
    fullname: "",
    contact: "",
    title: "",
    description: "",
    date: "",
    username: "",
    user_id: "",
  });

  const [reportDetails, setReportDetails] = useState([]);

  const showReportClient = (report) => {
    fetchModalData(report);
    setOpenModalClient(true);
  };

  const modalConfirmClient = () => {
    console.log("hi");
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
      const response = await fetch(`http://127.0.0.1:8000/getreportobject/${id}/`);
      const data = await response.json();
      const { user, title, description, issue_date } = data;
      console.log(data);
      setModalDetails({
        fullname: user?.fullname || "",
        contact: user?.contact || "",
        title: title || "",
        description: description || "",
        date: issue_date || "",
        username: user?.username || "",
        user_id: id || "",
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

  const onChange = (key) => {
    console.log(key);
  };
 

  const renderReports = () => {
    return reportDetails.map(
      (report) =>
        report.report_action === "Pending" && (
          <div className="mb-3" key={report.id}>
            <Card hoverable>
              <div className="flex flex-row items-center place-content-between">
                <h1>User Name: {report.user.fullname}</h1>
                <h1>User Type: {report.user.user_type}</h1>
                <h1>Title: {report.title}</h1>
                <h1>
                  Status:
                  {report.report_action === "Pending" ? (
                    <button className="bg-yellow-300 border p-1 rounded">
                      Pending
                    </button>
                  ) : report.report_action === "Approved" ? (
                    <button className="bg-green-300 border p-1 rounded">
                      Approved
                    </button>
                  ) : (
                    <button className="bg-red-300 border p-1 rounded">
                      Declined
                    </button>
                  )}
                </h1>
                <Button
                  danger
                  onClick={() => showReportClient(report.id)}
                  disabled={
                    report.report_action === "Approved" ||
                    report.report_action === "Denied"
                  }
                >
                  View details
                </Button>
              </div>
            </Card>
          </div>
        )
    );
  };

  //Rendering Approved / Denied Reports
  const renderCheckedReports = () => {
    return reportDetails.map(
      (report) =>
        report.report_action !== "Pending" && (
          
          <div className="mb-3" key={report.id}>
            <Card hoverable>
              <div className="flex flex-row items-center place-content-between">
                <h1>User Name: {report.user.fullname}</h1>
                <h1>User Type: {report.user.user_type}</h1>
                <h1>Title: {report.title}</h1>
                <h1>
                  Status:
                  {report.report_action === "Pending" ? (
                    <button className="bg-yellow-300 border p-1 rounded">
                      Pending
                    </button>
                  ) : report.report_action === "Approved" ? (
                    <button className="bg-green-300 border p-1 rounded">
                      Approved
                    </button>
                  ) : (
                    <button className="bg-red-300 border p-1 rounded">
                      Declined
                    </button>
                  )}
                </h1>
                <Button
                  danger
                  onClick={() => showReportClient(report.id)}
                  disabled={
                    report.report_action === "Approved" ||
                    report.report_action === "Denied"
                  }
                >
                  View details
                </Button>
              </div>
            </Card>
          </div>
        )
    );
  };

  // Contents in the tab
  const TabList = [
    {
      key: "1",
      label: "Pending",
      children: (
        <TabPane tab="Pending" key="1">
          {renderReports()}
        </TabPane>
      ),
    },
    {
      key: "2",
      label: "Approved/Denied",
      children:(
        <TabPane tab="Approved/Denied" key="2">
          {renderCheckedReports()} 
        </TabPane>
      ),
    },
  ];

  return (
    <div class="w-screen">
      <div class="flex flex-col mt-2 p-3">
        <ToastContainer position="top-center" autoClose={5000} />

        <div class="p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
          <Card title="REPORTS AND ISSUES">
            <Card>
              <div style={{ maxHeight: "390px", overflowY: "auto" }}>
              <Tabs>{TabList.map((tab) => tab.children)}</Tabs>
              </div>
              <Modal
                title="Registered Report"
                open={openModalClient}
                onOk={modalConfirmClient}
                onCancel={modalCancelClient}
                okText="Approve"
                cancelText="Decline"
                footer={[
                  <Button key="back" onClick={modalCancelClient}>
                    Back
                  </Button>,

                  <Button
                    style={{ backgroundColor: "green" }}
                    onClick={onApproval}
                  >
                    Approve
                  </Button>,
                  <Button style={{ backgroundColor: "red" }} onClick={onDenial}>
                    Decline
                  </Button>,
                ]}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <p className="text-lg font-semibold">
                      Report ID : {modalDetails.user_id}
                    </p>
                    {/* <p className="text-gray-800">{modalDetails.user_id}</p> */}
                  </div>
                  <div className="mb-4">
                    <p className="text-lg font-semibold">Fullname:</p>
                    <p className="text-gray-800">{modalDetails.fullname}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-lg font-semibold">Username:</p>
                    <p className="text-gray-800">{modalDetails.username}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-lg font-semibold">Contact Number:</p>
                    <p className="text-gray-800">{modalDetails.contact}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-lg font-semibold">Title:</p>
                    <p className="text-gray-800">{modalDetails.title}</p>
                  </div>

                  <div className="mb-4 col-span-2">
                    <p className="text-lg font-semibold">Description:</p>
                    <p className="text-gray-800">{modalDetails.description}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-lg font-semibold">Date:</p>
                    <p className="text-gray-800">{modalDetails.date}</p>
                  </div>
                </div>
              </Modal>
            </Card>
          </Card>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default ViewReports;
