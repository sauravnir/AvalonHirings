import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Modal, Form, Input, Tabs, Table , Tag } from "antd";
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


  const userdata = localStorage.getItem("userData");
  const userId = JSON.parse(userdata)
  console.log(userId)
 
  // Fetching Reports from the database
  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/getclientreport/${userId.user_id}`);
        const data = await response.json();
        setReportDetails(data);
      } catch (error) {
        console.error("Error fetching report details:", error);
      }
    };

    fetchReportDetails();
  }, []);

const contents = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Issued Date",
    dataIndex: "issued_date",
    key: "issued_date",
  },
  {
    title: "Status",
    dataIndex: "report_status",
    key: "report_status",
    render: (_, { report_status }) => (
      <>
        {report_status &&
          report_status.map((tag) => {
            console.log("Tag:", tag);
            let color;
            if (tag === "Approved") {
              color = "green";
            } else if (tag === "Denied") {
              color = "red";
            } else {
              color = "yellow";
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
      </>
    ),
    
  }
]

// table datasource 
console.log(reportDetails)
const data = reportDetails.map((info)=>({
  key : info.id,
  title : info.title, 
  issued_date : info.issue_date,    
  report_status : [info.report_action]
}));

  return (
    <div className="w-screen mt-14 ">
      <div className="flex flex-col mt-2 p-6">
        <div className="flex w-full bg-white  rounded shadow p-3">
          <h1 className="text-2xl font-bold">Issue Reports / Requests</h1>
        </div>

        <div className=" flex flex-col p-3 mt-5 bg-white rounded shadow-xl shadow-gray-350">
          
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
                    /></Form.Item>
                  <Form.Item>
                    <Button style={{background:"green" , borderColor :"green"}} onClick={() => setOpenModal(true)}><span class="text-white">Submit</span></Button>
                    {/* <button onClick={() => setOpenModal(true)} class="bg-green-500 w-1/4 text-white items-center p-2 rounded border border-green-700 hover:bg-green-700" >Submit</button> */}
                    <Modal
                      title="Are you sure you want to submit?"
                      centered
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
          
          <div>
            {/* <Tabs>{TabList.map((tab) => tab.children)}</Tabs> */}
          </div>

          <ToastContainer position="top-center" autoClose={4000} />

          
        </div>
        <div class="mt-12 p-3 bg-white rounded shadow-lg">
            <h1 class="text-lg p-2 font-bold hover:underline">View Reports</h1>
            <h1 class="text-sm p-2 mb-4 text-red-500">Note: Once approved , the related department will contact you for further processing.</h1>
            <Table columns={contents} dataSource={data}></Table>
          </div>
      </div>
      
      <DashboardFooter />
    </div>
  );
}

export default EmployeeIssueReports;
