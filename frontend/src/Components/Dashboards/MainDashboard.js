import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import DashboardFooter from "./DashboardFooter";
import { Card, Button, Statistic, Table, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { FaUsers } from "react-icons/fa6";
import { SiVirustotal } from "react-icons/si";
import { BiSolidReport } from "react-icons/bi";

import "chart.js/auto";
import { Chart } from "react-chartjs-2";

import Spinner from "../../Pages/ProfileSettings/Spinner";

function MainDashboard() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [getAnnouncement, setGetAnnouncement] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalReports, setTotalReports] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [serviceCategory, setServiceCategory] = useState([]);
  const [viewRequestedServices, setViewRequestedServices] = useState([]);

  useEffect(() => {
    // Displaying the announcements
    const announcement = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/app/getannouncement/"
        );
        const data = await response.json();
        setGetAnnouncement(data);
        setLoading(false);
      } catch (error) {
        message.error(error.message);
      }
    };

    // Displaying the payment data
    const getPaymentData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/alltransactions/");
        const data = await response.json();
        setPaymentDetails(data);
      } catch (error) {
        console.log(error);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      }
    };

    // Displaying all the user
    const displayUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/app/allusers/");
        const data = await response.json();
        setTotalUsers(data.slice(1).length);
        setLoading(false);
      } catch (error) {
        message.error("Failed To Fetch User Data");
      }
    };

    // Fetching the Report
    const fetchReportDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/getreport/");
        const data = await response.json();
        setTotalReports(data.length);
      } catch (error) {
        console.error("Error fetching report details:", error);
      }
    };

    // Fetching All the Service Created by the admin
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://127.0.0.1:8000/getservices/");
        const data = await res.json();
        setTotalServices(data.length);
        setServiceCategory(data);
      } catch (error) {
        message.error(error.message);
      }
    };

    // Getting all the requested services
    const serviceRequest = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://127.0.0.1:8000/getrequestedservice/");
        const data = await res.json();
        setViewRequestedServices(data);
      } catch (error) {
        message.error("Failed To Fetch Data");
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      }
    };

    serviceRequest();

    fetchServiceData();
    fetchReportDetails();
    displayUsers();
    announcement();
    getPaymentData();
  }, []);

  // Storing the total amount to display
  const totalReceived = () => {
    let total = 0;
    paymentDetails?.payment_details?.data?.forEach((item) => {
      total += parseFloat(item.amount);
    });
    paymentDetails?.subscription_details?.data?.forEach((item) => {
      total += parseFloat(item.amount);
    });

    return total;
  };
  // Total Salary Paid
  const salaryPaid = () => {
    let total = 0;
    const data = paymentDetails?.salary_details?.data;
    if (data) {
      data.forEach((item) => {
        if (item && item.amount !== null) {
          total += parseFloat(item.amount);
        }
      });
    }
    return total;
  };
  // Calculating Profit
  const profit = totalReceived() - salaryPaid();

  // Fetching The Table Data
  const tableData = getAnnouncement.map((info, index) => ({
    sn: getAnnouncement.length - index,
    key: info.id,
    title: {
      name: info.title,
      date: info.created_date,
    },
  })).reverse();

  // Setting The Table Contents
  const tableContents = [
    {
      title: "S.N",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (_, record) => {
        return (
          <div className="flex flex-col justify-start">
            <h1>{record.title.name}</h1>
            <h1>{new Date(record.title.date).toLocaleDateString()}</h1>
          </div>
        );
      },
    },
  ];

  // Displaying the Pie chart
  const displayPie = () => {
    let householdCount = 0;
    let businessCount = 0;

    serviceCategory.forEach((service) => {
      if (service.servicetarget === "Household") {
        householdCount++;
      } else if (service.servicetarget === "Business") {
        businessCount++;
      }
    });
    return {
      labels: ["Household", "Business"],
      datasets: [
        {
          data: [householdCount, businessCount],
          backgroundColor: [
            "rgba(255, 165, 0, 0.6)",
            "rgba(70, 130, 180, 0.6)",
          ],
          hoverBackgroundColor: [
            "rgba(255, 165, 0, 0.8)",
            "rgba(70, 130, 180, 0.8)",
          ],
        },
      ],
    };
  };

  // Displaying the Bar Graph
  const prepareChartData = (data) => {
    // Initialize an empty object to store the counts for each date
    const dateCounts = {};

    // Iterate over each object in the data array
    data.forEach((item) => {
      // Check if the object has the necessary properties
      if (item.services && item.services.servicename && item.approved_date) {
        // Extract the service name and approved date
        const serviceName = item.services.servicename;
        const approvedDate = new Date(item.approved_date).toLocaleDateString(); // Convert to localized date string

        // Increment the count for the approved date and service name combination
        const key = `${serviceName}-${approvedDate}`;
        dateCounts[key] = (dateCounts[key] || 0) + 1;
      }
    });

    // Prepare the data in the format required by Chart.js
    const labels = [];
    const counts = [];

    // Iterate over the dateCounts object to extract labels and counts
    for (const key in dateCounts) {
      if (dateCounts.hasOwnProperty(key)) {
        const [serviceName, date] = key.split("-");
        labels.push(`${serviceName}`);
        counts.push(dateCounts[key]);
      }
    }

  //  Preparing the data format 
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Service Requests",
          data: counts,
          backgroundColor: "rgba(255, 0, 0, 0.6)",
          borderColor: "rgba(255, 0, 0, 1)",
          borderWidth: 0.5,
        },
      ],
    };

    return chartData;
  };

  // Setting the options for the bar graph
  const options = {
    scales: {
      y: {
        beginAtZero: false,
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
        title: {
          display: true,
          text: "Number of Service Requests",
          color: "grey",
          font: {
            size: 14,
          },
        },
      },
      x: {
        display: false,
      },
    },
  };

  return (
    <div className="w-screen mt-8">
      {loading && <Spinner />}
      <div className="mt-2 w-10/14 p-14">
        <div className=" flex-col py-3 ">
          <h1 className="text-3xl font-semibold ">Dashboard</h1>
        </div>
        <div className="grid grid-cols-2">
          <div class="p-2 space-y-5">
            <div class="flex flex-row space-x-3 justify-start">
              <Link to="/all-users">
                <div className=" hover:shadow">
                  <Card className="shadow-lg hover:bg-gray-50 hover:dark:bg-gray-50">
                    <Statistic
                      title="Total Users"
                      value={totalUsers}
                      prefix={<FaUsers className="mr-4 text-sky-800" />}
                    />
                  </Card>
                </div>
              </Link>

              <Link to="/create-service">
                <div className="hover:shadow">
                  <Card className="shadow-lg hover:bg-gray-50 hover:dark:bg-gray-50">
                    <Statistic
                      title="Total Services"
                      value={totalServices}
                      prefix={<SiVirustotal className="mr-4 text-green-700" />}
                    />
                  </Card>
                </div>
              </Link>

              <Link to="/admin-view-reports">
                <div className="hover:shadow">
                  <Card className="shadow-lg hover:bg-gray-50 hover:dark:bg-gray-50">
                    <Statistic
                      title="Issued Reports"
                      value={totalReports}
                      prefix={
                        <BiSolidReport className="mr-4 text-orange-700" />
                      }
                    />
                  </Card>
                </div>
              </Link>
            </div>

            <div className="hover:shadow">
              <Link to="/admin-payment">
                <Card
                  className="shadow-lg hover:bg-gray-50 hover:dark:bg-gray-50"
                  title={
                    <div className="flex flex-row justify-between">
                      <h1 className="text-sky-800">Values</h1>
                      <svg
                        class="w-10 h-10"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5 9C14.5 9 13.7609 8 11.9999 8C8.49998 8 8.49998 12 11.9999 12C15.4999 12 15.5 16 12 16C10.5 16 9.5 15 9.5 15"
                          stroke="#075985"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 7V17"
                          stroke="#075985"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  }
                >
                  <div class="grid grid-cols-2">
                    <div class="flex flex-col font-bold">
                      <h1>Total Received:</h1>
                      <h1>Total Salary Paid:</h1>
                      <h1>Remaining Balance:</h1>
                    </div>
                    <div class="flex flex-col ">
                      <h1 className="text-sky-700">Rs.{totalReceived()}</h1>
                      <h1 className="text-red-700">Rs.{salaryPaid()}</h1>

                      <h1
                        className={
                          profit < 0 ? "text-red-700" : "text-green-700"
                        }
                      >
                        Rs.{profit}
                      </h1>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>

            <div className="p-2 bg-white shadow-xl rounded">
              <div className="h-full">
                <Card
                  title={
                    <div className="flex flex-row justify-between">
                      <h1 className="text-sky-800">Total Service Usage</h1>
                    </div>
                  }
                >
                  <Chart
                    type="bar"
                    data={prepareChartData(viewRequestedServices)}
                    options={options}
                  />
                </Card>
              </div>
            </div>
          </div>

          <div className="rounded ">
            <div className="p-2 bg-white shadow-xl">
              <Card
                title={
                  <div className="flex flex-row justify-between">
                    <h1 className="text-sky-800">Service Categories</h1>
                    <svg
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.4443 3.6853C6.97115 3.33327 7.52766 3.03383 8.10577 2.7894C9.50868 2.19627 10.2101 1.8997 11.1051 2.49296C12 3.08623 12 4.05748 12 6V8C12 9.88561 12 10.8284 12.5858 11.4142C13.1716 12 14.1144 12 16 12H18C19.9425 12 20.9138 12 21.507 12.8949C22.1003 13.7899 21.8037 14.4913 21.2106 15.8942C20.9662 16.4723 20.6667 17.0288 20.3147 17.5557C19.2159 19.2002 17.6541 20.4819 15.8268 21.2388C13.9996 21.9957 11.9889 22.1937 10.0491 21.8078C8.10929 21.422 6.32746 20.4696 4.92894 19.0711C3.53041 17.6725 2.578 15.8907 2.19215 13.9509C1.8063 12.0111 2.00433 10.0004 2.76121 8.17316C3.51809 6.3459 4.79981 4.78412 6.4443 3.6853Z"
                        stroke="#075985"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.7739 2.12812C13.8771 1.72698 14.286 1.48549 14.6871 1.58873C18.4658 2.56129 21.4389 5.53443 22.4115 9.31307C22.5147 9.71421 22.2732 10.1231 21.8721 10.2263C21.4709 10.3296 21.0621 10.0881 20.9588 9.68696C20.1225 6.43757 17.5626 3.87772 14.3132 3.04139C13.9121 2.93814 13.6706 2.52926 13.7739 2.12812Z"
                        stroke="#075985"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                }
              >
                <div className="w-60 h-60">
                  <Chart type="pie" data={displayPie()} />
                </div>
              </Card>
            </div>

            <div className="hover:shadow-lg mt-5">
              <Card
                className="shadow-lg hover:bg-gray-50 hover:dark:bg-gray-50"
                title={
                  <div className="flex flex-row justify-between">
                    <h1 className="text-sky-800">Announcements</h1>
                    <svg
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 13.9999L5.57465 20.2985C5.61893 20.4756 5.64107 20.5642 5.66727 20.6415C5.92317 21.397 6.60352 21.9282 7.39852 21.9933C7.4799 21.9999 7.5712 21.9999 7.75379 21.9999C7.98244 21.9999 8.09677 21.9999 8.19308 21.9906C9.145 21.8982 9.89834 21.1449 9.99066 20.193C10 20.0967 10 19.9823 10 19.7537V5.49991M18.5 13.4999C20.433 13.4999 22 11.9329 22 9.99991C22 8.06691 20.433 6.49991 18.5 6.49991M10.25 5.49991H6.5C4.01472 5.49991 2 7.51463 2 9.99991C2 12.4852 4.01472 14.4999 6.5 14.4999H10.25C12.0164 14.4999 14.1772 15.4468 15.8443 16.3556C16.8168 16.8857 17.3031 17.1508 17.6216 17.1118C17.9169 17.0756 18.1402 16.943 18.3133 16.701C18.5 16.4401 18.5 15.9179 18.5 14.8736V5.1262C18.5 4.08191 18.5 3.55976 18.3133 3.2988C18.1402 3.05681 17.9169 2.92421 17.6216 2.88804C17.3031 2.84903 16.8168 3.11411 15.8443 3.64427C14.1772 4.55302 12.0164 5.49991 10.25 5.49991Z"
                        stroke="#075985"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                }
              >
                <Table
                  columns={tableContents}
                  dataSource={tableData}
                  bordered
                  pagination={{
                    pageSize: 5,
                    showTotal: (total) => `Total ${total} items`,
                  }}
                />

                <div className="mt-2">
                  <Button
                    icon={<EyeOutlined />}
                    type="default"
                    className="text-white bg-sky-900 hover:bg-sky-700"
                    onClick={() => navigate("/announcements")}
                  >
                    View Announcements
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 p-2 ">
          <div className="flex flex-col p-2 justify-end"></div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default MainDashboard;
