import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Modal, Form, Input, Tabs } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardFooter from "../Dashboards/DashboardFooter.js";


// Fetching the Report Status in progress


function EmployeeIssueReports() {
  const [openModal, setOpenModal] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportDesc, setReportDesc] = useState("");
  const navigate = useNavigate();
  const [reportDetails, setReportDetails] = useState([]);
  const { TabPane } = Tabs;



  const storedDataString = localStorage.getItem("userData");
  const userData = JSON.parse(storedDataString);
  const userID = userData.user_id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      const get_userdata = localStorage.getItem("userData");
      const parsedata = JSON.parse(get_userdata);
      const get_username = parsedata.username;
      console.log(get_username);
      formData.append("title", reportTitle);
      formData.append("description", reportDesc);
      formData.append("username", get_username);

      const response = await fetch("http://127.0.0.1:8000/report/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        navigate("/employee-dashboard");
        toast.success("Registered Successfully");
      } else {
        toast.error("Failed to register");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Err..something is wrong!");
    }
  };

  // Fetching Reports from the database
  // useEffect(() => {
  //   const fetchReportDetails = async () => {
  //     try {
  //       const response = await fetch(`http://127.0.0.1:8000/getreport/${userID}`);
  //       const contentType = response.headers.get("content-type");
  //       console.log("Content-Type:", contentType);
  //       const data = await response.json();
  //       setReportDetails(data);
  //     } catch (error) {
  //       console.error("Error fetching report details:", error);
  //     }
  //   };

  //   fetchReportDetails();
  // }, [userID]);

  // useEffect(() => {
  //   const fetchReportDetails = async () => {
  //     try {
  //       if (!userID) {
  //         console.error('User ID is missing.');
  //         return;
  //       }

  //       const response = await fetch(`http://127.0.0.1:8000/getreport/${userID}`);
  //       const contentType = response.headers.get('content-type');

  //       if (!response.ok) {
  //         console.error('Error fetching report details:', response.statusText);
  //         return;
  //       }

  //       if (contentType && contentType.includes('application/json')) {
  //         const data = await response.json();
  //         setReportDetails(data);
  //       } else {
  //         console.error('Invalid content type:', contentType);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching report details:', error.message);
  //     }
  //   };

  //   fetchReportDetails();
  // }, []);
  // Tabs Contents

  // const pendingReports = () => {
  //   return reportDetails.map(
  //     (report) =>
  //       report.report_action === "Pending" &&
  //       report.user.id === userID && (
  //         <div className="mb-3" key={report.id}>
  //           <Card hoverable>
  //             <div className="flex flex-row items-center place-content-between">
  //               <h1>User Name: {report.user.fullname} {console.log(report.user.fullname)}</h1>
  //               <h1>User Type: {report.user.user_type}</h1>
  //               <h1>Title: {report.title}</h1>
  //               <h1>
  //                 Status:
  //                 {report.report_action === "Pending" ? (
  //                   <button className="bg-yellow-300 border p-1 rounded">
  //                     Pending
  //                   </button>
  //                 ) : report.report_action === "Approved" ? (
  //                   <button className="bg-green-300 border p-1 rounded">
  //                     Approved
  //                   </button>
  //                 ) : (
  //                   <button className="bg-red-300 border p-1 rounded">
  //                     Declined
  //                   </button>
  //                 )}
  //               </h1>
  //               {/* <Button
  //                 danger
  //                 onClick={() => showReportClient(report.id)}
  //                 disabled={
  //                   report.report_action === "Approved" ||
  //                   report.report_action === "Denied"
  //                 }
  //               >
  //                 View details
  //               </Button> */}
  //             </div>
  //           </Card>
  //         </div>
  //       )
  //   );
  // };

  // const TabList = [
  //   {
  //     key: "1",
  //     label: "Pending",
  //     children: (
  //       <TabPane tab="Pending" key="1">
  //         {pendingReports()}
  //       </TabPane>
  //     ),
  //   },
  //   {
  //     key: "2",
  //     label: "Approved",
  //     children:(
  //       <TabPane tab="Approved" key="2">
  //         {pendingReports()}
  //       </TabPane>
  //     ),
  //   },
  //   // {
  //   //   key: "3",
  //   //   label: "Denied",
  //   //   children:(
  //   //     <TabPane tab="Denied" key="3">
  //   //       {approvedReports()}
  //   //     </TabPane>
  //   //   ),
  //   // },
  // ];

  return (
    <div className="w-screen">
      <div className="flex flex-col mt-2 p-3">
        <div className="flex">
          <h1 className="text-xl font-base">ISSUE REPORTS / REQUESTS</h1>
        </div>

        <div className="p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
          <Card>
            <Card>
              <div className="text-red-600">
                *Fill with necessary and valid information!*
              </div>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form layout="vertical">
                  <Form.Item label="Title:">
                    <Input onChange={(e) => setReportTitle(e.target.value)} />
                  </Form.Item>
                  <Form.Item label="Description">
                    <Input.TextArea
                      rows={4}
                      onChange={(e) => setReportDesc(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button onClick={() => setOpenModal(true)}>Submit</Button>
                    <Modal
                      title="Are you sure you want to submit?"
                      open={openModal}
                      okText="Submit"
                      onCancel={() => setOpenModal(false)}
                      onOk={handleSubmit}
                      okType="default"
                      width={400}
                    />
                  </Form.Item>
                </Form>
              </form>
            </Card>
          </Card>
          <div>
            {/* <Tabs>{TabList.map((tab) => tab.children)}</Tabs> */}
          </div>

          <ToastContainer position="top-center" autoClose={4000} />
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default EmployeeIssueReports;
