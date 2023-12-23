import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Modal, Form, Input, Upload } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import DashboardFooter from "../Dashboards/DashboardFooter.js";

function EmployeeIssueReports() {
  const [openModal, setOpenModal] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportDesc, setReportDesc] = useState("");
  const navigate = useNavigate();

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
  
      if(response.ok){
        // toast("Wow so easy !");
        // console.log("Hello");
        navigate('/employee-dashboard')
      }
    } catch (error) {
      console.log(error.message);
    }
  };


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
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default EmployeeIssueReports;
