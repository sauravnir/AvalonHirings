import React, { useState, useEffect } from "react";
import { Pie } from 'react-chartjs-2';

import { Link, useNavigate } from "react-router-dom";
import DashboardFooter from "./DashboardFooter";
import { Card, Space, Button, Divider, Statistic, Table, message } from "antd";
import { DollarOutlined, EyeOutlined } from "@ant-design/icons";
import { FaUsers } from "react-icons/fa6";
import { SiVirustotal } from "react-icons/si";
import { BiSolidReport } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa6";

import Spinner from "../../Pages/ProfileSettings/Spinner";
function MainDashboard() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [getAnnouncement, setGetAnnouncement] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalReports, setTotalReports] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [serviceCategory, setServiceCategory] = useState([]);
  useEffect(() => {
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

    const allRatings = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/allratings/");
        const data = await response.json();
        setTotalRatings(data.ratings.length);
      } catch (error) {
        console.log(error);
      }
    };

    allRatings();
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

  const salaryPaid = () => {
    let total = 0;
    paymentDetails?.salary_details?.data?.forEach((item) => {
      total += parseFloat(item.amount);
    });
    return total;
  };

  const profit = totalReceived() - salaryPaid();

  const tableData = getAnnouncement.map((info, index) => ({
    sn: index + 1,
    key: info.id,
    title: {
      name: info.title,
      date: info.created_date,
    },
  }));

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

  // Generating Pie Chart 
  const generateChartData = (data) => {
    const targets = data.reduce((acc, curr) => {
      acc[curr.servicetarget] = (acc[curr.servicetarget] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(targets),
      datasets: [
        {
          label: 'Service Targets',
          data: Object.values(targets),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
        },
      ],
    };
  };


// const lineData = [
//   { year: '2021', value: 100 },
//   { year: '2022', value: 200 },
//   { year: '2023', value: 300 },
//   { year: '2024', value: 400 },
//   { year: '2025', value: 500 },
// ]

// const lineConfig = {
//   data: lineData,
//   xField: 'year',
//   yField: 'value',
//   point: {
//     size: 5,
//     shape: 'circle',
//   },
//   label: {
//     style: {
//       fill: '#aaa',
//     },
//   },
// };



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
              <Link to="/ratings">
                <div className="hover:shadow">
                  <Card className="shadow-lg hover:bg-gray-50 hover:dark:bg-gray-50">
                    <Statistic
                      title="Total Ratings"
                      value={totalRatings}
                      prefix={<FaRegStar className="mr-4 text-yellow-500" />}
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
                      
                        <h1 className={profit < 0 ? "text-red-700" : "text-green-700"}>Rs.{profit}</h1>

                    </div>
                  </div>
                </Card>
              </Link>
            </div>

            {/* <div className="p-2 bg-white shadow-xl rounded">
          </div> */}
             {/* <Line {...lineConfig} height={500} width={500}/> */}
          </div>

          <div className="rounded ">
            <div className="p-2 bg-white shadow-xl">
            {/* <Pie data={generateChartData(serviceCategory)} /> */}
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
          
          <div className="flex flex-col p-2 justify-end">
            
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default MainDashboard;
