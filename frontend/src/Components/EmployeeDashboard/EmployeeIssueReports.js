import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Modal, Form, Input, Tabs, Table , Tag, Select } from "antd";
import {
  SearchOutlined
} from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardFooter from "../Dashboards/DashboardFooter.js";
import Spinner from "../../Pages/ProfileSettings/Spinner.js";

function EmployeeIssueReports() {
  const [openModal, setOpenModal] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportDesc, setReportDesc] = useState("");
  const navigate = useNavigate();
  const [reportDetails, setReportDetails] = useState([]);
  const [loading , setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
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
        const user_type = reportDetails[0].user.user_type
        if(user_type === "Client"){
          navigate("/client-dashboard");
        } else {
          navigate("/employee-dashboard")
        }
        toast.success("Registered Successfully");
      } else {
        toast.error("Failed to register");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Err..something is wrong!");
    }finally{
      await new Promise((resolve) => setTimeout(resolve, 2000));
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

// Displaying the latest data in the table 

// useEffect(() => {
//   // Reverse the data array to display the most recent data at the top
//   const reversedData = [...reportDetails].reverse();

//   // Add SN based on the reversed data
//   const finalData = reversedData.map((info, index) => ({
//     ...info,
//     sn: index + 1,
//   }));

//   // Set the finalData in the component's state
//   setTableData(finalData);
// }, [reportDetails]);


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
  sn : index+1,
  key : info.id,
  title : info.title, 
  issued_date : info.issue_date,    
  report_status : [info.report_action]
}));

// Sorting Data

  return (
    <div className="w-screen mt-8 ">
      {loading && <Spinner />}
      <div className="flex flex-col mt-2 p-6">
        <div className="flex w-full p-3">
          <h1 className="text-xl font-bold">Issue Reports / Requests</h1>
        </div>

        <div className=" flex flex-col p-3 rounded shadow-xl bg-white shadow-gray-350">
          
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
          <div class="flex flex-row justify-between">
            <h1 class="text-lg p-2 font-bold hover:underline">View Reports</h1>
          </div>
            <h1 class="text-sm p-2 mb-4 text-red-500">Note: Once approved , the related department will contact you for further processing.</h1>
            <Table columns={contents} dataSource={data} pagination={{
              pageSize:5,
              showTotal:(total) => `Total ${total} items`
            }}></Table>
          </div>
      </div>
      
      <DashboardFooter />
    </div>
  );
}

export default EmployeeIssueReports;
