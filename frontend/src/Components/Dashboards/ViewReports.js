import React, { useState , useEffect} from "react";
import DashboardFooter from "./DashboardFooter";
import { Card, Button, Modal, Descriptions } from "antd";

function ViewReports() {
  const [loading, setLoading] = useState(false);
  const [openModalClient, setOpenModalClient] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  // setting table report details 


  const [reportDetails , setReportDetails] = useState([]);

  const showReportClient = (report) => {
    setSelectedReport(report);
    setOpenModalClient(true);
  };


  const modalConfirmClient = () => {
    console.log("hi");
  };

  const modalCancelClient = () => {
    setOpenModalClient(false);
  };

    const modalDeclineClient = () => {
      console.log("Declined!");
    };


  const reportItemsClient = [
    {
      key: "1",
      label: "User Name",
      children: "Saurav Niraula",
    },
    {
      key: "2",
      label: "Contact Number",
      children: "1810000000 ",
    },
    {
      key: "3",
      label: "Title",
      children: "I want a leave",
    },
    {
      key: "4",
      label: "Description",
      span: 3,
      children: "loremsaksfa;sfaskjhfalkshfalsassssssssssssssssssssssfasfqweqw11234234sfasfasf  k",
    },
    {
      key: "4",
      label: "Date",
      span: 2,
      children: "Input Date",
    },
  ];


  // Fetching the reports from API
  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/getreport/');
        const data = await response.json();
        console.log(data);
        setReportDetails(data);
      } catch (error) {
        console.error('Error fetching report details:', error);
      }
    };

    fetchReportDetails();
  }, []);

  const renderReports = () => {
    return reportDetails.map((report) => (
      <Card key={report.id} >
        <div className="flex flex-row items-center place-content-between space-y-3">
          <h1>Client Name: {report.user.fullname}</h1>
          <h1>User Type: {report.user.user_type}</h1>
          <h1>Title: {report.title}</h1>
          <Button danger onClick={() => showReportClient(report)}>
            View Details
          </Button>
        </div>
      </Card>
    ));
  };

  return (
    <div class="w-screen">
      <div class="flex flex-col mt-2 p-3">
        <div class="flex">
          <h1 class="text-xl font-base">REPORTS AND ISSSUES</h1>
        </div>

        <div class="p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
          <Card title="View All The Reports and Issues ">
            <Card type="inner" title="Employees and Clients">
              {renderReports()}
              <Modal
                    title="Report ID:23123"
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
                        style={{ backgroundColor: "red" }}
                        onClick={modalConfirmClient}
                      >
                        Decline
                      </Button>,
                      <Button
                        style={{ backgroundColor: "green" }}
                        onClick={modalConfirmClient}
                      >
                        Approve
                      </Button>,
                    ]}
                  >
                    <Descriptions layout="vertical" items={reportItemsClient} />
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
