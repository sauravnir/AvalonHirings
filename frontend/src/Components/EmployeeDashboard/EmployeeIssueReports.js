import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Modal, Form, Input,Table , Tag, Select , Tooltip , message , Breadcrumb} from "antd";
import {
  SearchOutlined,
  QuestionOutlined,
  HomeOutlined,
  MoneyCollectOutlined
} from "@ant-design/icons";

import DashboardFooter from "../Dashboards/DashboardFooter.js";
import Spinner from "../../Pages/ProfileSettings/Spinner.js";

function EmployeeIssueReports() {
  const rules=[{
    required: true,
    message:"required"
  }]
  const [openModal, setOpenModal] = useState(false);
  const [openModal1 , setOpenModal1] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportDesc, setReportDesc] = useState("");
  const navigate = useNavigate();
  const [reportDetails, setReportDetails] = useState([]);
  const [loading , setLoading] = useState(false);
  const get_userdata = localStorage.getItem("userData");
  const parsedata = JSON.parse(get_userdata);
  const get_username = parsedata.username;


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", reportTitle);
      formData.append("description", reportDesc);
      formData.append("username", get_username);
      
      if(reportTitle  && reportDesc !== null) {
        const response = await fetch("http://127.0.0.1:8000/report/", {
          method: "POST",
          body: formData,
        });
        
        if (response.ok) {
          const user_type = reportDetails[0].user.user_type
          const data = await response.json();
          message.success(data.message);
          if (user_type === "Client") {
            navigate("/client-dashboard");
          } else {
            navigate("/employee-dashboard")
          }
        } else {
          throw new Error("Failed to submit report");
        }
      } 
      else{
        message.error("Please enter with valid details!")
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      message.error("Failed to submit report. Please try again later.");
      window.location.reload();
    }finally{
      setLoading(false);
    }
  };
  

  const userdata = localStorage.getItem("userData");
  const userId = JSON.parse(userdata)
 
  // Fetching Reports from the database
  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/getclientreport/${userId.user_id}`);
        const data = await response.json();
        setReportDetails(data);
      } catch (error) {
        console.error("Error fetching report details:", error);
      }finally{
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      }
    };

    fetchReportDetails();
  }, []);


const contents = [
  {
    title:"S.N",
    dataIndex:"sn",
    key:"sn",
  },
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
    filterMultiple: false,
    filters: [
      { text: "Approved", value: "Approved" },
      { text: "Pending", value: "Pending" },
      { text: "Denied", value: "Denied" },
    ],
    render: (_, { report_status }) => (
      <>
        {report_status &&
          report_status.map((tag) => {
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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div className="flex flex-col space-y-2" style={{ padding: 8 }}>
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
  }
]  
// table datasource 
const data = reportDetails.map((info , index)=>({
  sn : reportDetails.length - index,
  key : info.id,
  title : info.title, 
  issued_date : info.issue_date,    
  report_status : [info.report_action]
})).reverse();

// Sorting Data

  return (
    <div className="w-screen mt-8 ">
      {loading && <Spinner />}
      <div className="flex flex-col mt-2 p-6">
        <div className="flex flex-row items-center justify-between w-full p-3">
          <h1 className="text-xl font-bold">Reports / Requests</h1>
          <Breadcrumb items={[
              {
                href:parsedata.user_type === "Client" ? '/client-dashboard' : '/employee-dashboard',
                title:<HomeOutlined />
              },
              {
                href:parsedata.user_type === "Client" ? '/client-reports' : '/employee-reports',
                title:"Issue Reports"
              }
              ]}/>
        </div>

        <div className=" flex flex-col p-3 rounded shadow-xl bg-white shadow-gray-350">
          
            <Card>
              <div className="flex flex-row justify-between text-red-600">                
              </div>
              
                <Form layout="vertical" onFinish={handleSubmit}>
                  <Form.Item label="Title:" name="title" rules={rules}>
                    <Select 
                    onChange={(value) => setReportTitle(value)}
                    options={[
                      {
                        value: "Choose From The Options Below",
                        label: "Choose From The Options Below",
                        disabled: true,
                      },
                      {
                        value: "Voilence / threats",
                        label: "Voilence / threats",
                      },
                      {
                        value:"Unprofessional Behaviour",
                        label :"Unprofessional Behaviour",
                      },
                      {
                        value:"Others",
                        label:"Others",
                      }
                    ]}>
                      
                    </Select>
                    {/* <Input onChange={(e) => setReportTitle(e.target.value)} /> */}
                  </Form.Item>
                  <Form.Item label="Description" name="description" rules={rules}>
                    <Input.TextArea
                      rows={4}    
                      onChange={(e) => setReportDesc(e.target.value)}
                    /></Form.Item>
                  <Form.Item>
                    <Button className="bg-sky-900 text-white hover:bg-sky-700 rounded" onClick={() => setOpenModal(true)}><span class="text-white">Submit</span></Button>
                    {/* <button onClick={() => setOpenModal(true)} class="bg-green-500 w-1/4 text-white items-center p-2 rounded border border-green-700 hover:bg-green-700" >Submit</button> */}
                    <Modal
                      title="Are you sure you want to submit?"
                      centered
                      open={openModal}
                      okText="Submit"
                      onCancel={() => setOpenModal(false)}
                      onOk={handleSubmit}
                      okType="default"
                      footer={<div className="flex flex-row justify-center space-x-2"><Button onClick={handleSubmit} className="text-white bg-sky-900 hover:bg-sky-700 rounded">Submit</Button>
                      <Button className="text-white bg-red-900 hover:bg-red-700 rounded" onClick={() => setOpenModal(false)}>Discard</Button>
                      </div>}
                      width={400}
                    />
                  </Form.Item>
                </Form>
              
            </Card>
        </div>
        <div class="mt-12 p-3 bg-white rounded shadow-lg">
          <div class="flex flex-row justify-start space-x-2 items-center">
            <h1 class="text-lg p-2 font-bold hover:underline">View Reports</h1>
            <Tooltip title="Note: Once approved , the related department will contact you for further processing."><Button className="rounded-full" size="small" icon={<QuestionOutlined style={{ fontSize: "13px" }}/>}></Button></Tooltip>
          </div>
            <Table columns={contents} dataSource={data} pagination={{
              pageSize:10,
              showTotal:(total) => `Total ${total} items`
            }}></Table>
          </div>
      </div>
      
      <DashboardFooter />
    </div>
  );
}

export default EmployeeIssueReports;
