import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Progress, Card, message, Table, Button, Statistic } from "antd";
import { EyeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { TiTick } from "react-icons/ti";
import { BiSolidReport } from "react-icons/bi";
import DashboardFooter from "../Dashboards/DashboardFooter";
import { Pie } from "@ant-design/charts";
import Spinner from "../../Pages/ProfileSettings/Spinner";
function EmployeeDashboardObject() {
  const [workDetails, setWorkDetails] = useState({
    fullname: "",
    profilepicture: "",
    expiry_date: "",
    approved_date: "",
  });

  const navigate = useNavigate();
  const userData = localStorage.getItem("userData");
  const userID = JSON.parse(userData);
  const [loading, setLoading] = useState(false);
  const [getAnnouncement, setGetAnnouncement] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [activeServices, setActiveServices] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  useEffect(() => {
    const handleWork = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/assignedservices/${userID.user_id}`
        );
        const data = await response.json();
        const { client_details, assigned_service_details, service_request } =
          data;

        const setDetails = {
          fullname: client_details?.fullname || "",
          profilepicture: client_details?.profilepic || "",
          expiry_date: service_request?.expiry_date || "",
          approved_date: assigned_service_details?.approved_date || "",
        };

        setWorkDetails(setDetails);
        console.log("Work Details", workDetails);
      } catch (error) {
        return error;
      }
    };

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

    const totalValue = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/employeesalary/${userID.user_id}`
        );
        const data = await response.json();
        setTransaction(data);
        setLoading(false);
      } catch (error) {
        message.error("Failed to fetch data.");
      }
    };

    const viewAssignedService = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/assignedservices/${userID.user_id}`
        );
        const data = await response.json();
        setActiveServices(data.length);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    // const fetchReportDetails = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await fetch(
    //       `http://127.0.0.1:8000/getclientreport/${userID.user_id}`
    //     );
    //     const data = await response.json();
    //     setTotalReports(data.length);
    //   } catch (error) {
    //     console.error("Error fetching report details:", error);
    //   }
    // };

    // fetchReportDetails();
    viewAssignedService();
    totalValue();
    announcement();
    handleWork();
  }, []);

  const totalAmount = () => {
    let total = 0;
    transaction?.map((item) => {
      total += parseFloat(item.amount);
    });
    return total;
  };

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

  // Calculating the progress percentage
  const progressPercent = (workDetails) => {
    const startDate = new Date(workDetails.approved_date);
    const endDate = new Date(workDetails.expiry_date);
    const currentDate = new Date();

    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = currentDate.getTime() - startDate.getTime();

    const progressPercentage = (elapsedDuration / totalDuration) * 100;

    return Math.round(progressPercentage);

    // Calculate the total duration
  };
  const startDate = new Date(workDetails.approved_date);
  const endDate = new Date(workDetails.expiry_date);
  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  // Pie Chart

  const data = [
    {
      type: "A",
      value: 100,
    },
    {
      type: "B",
      value: 200,
    },
  ];

  const config = {
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      content: "{value}",
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
  };

  return (
    <div className="w-screen mt-8">
      {loading && <Spinner />}
      <div className="mt-2 w-10/14 p-14">
        <div className=" flex-col py-3 ">
          <h1 className="text-3xl font-semibold ">Dashboard</h1>
        </div>

        <div className="rounded p-4">
          <div className="grid grid-cols-2">
            <div class="p-2 space-y-3">
              {/* <div class="flex flex-row space-x-3 justify-start">
                <Link to="/employee-work-schedule">
                  <div className="hover:shadow-lg">
                    <Card className="shadow-lg hover:bg-gray-50 hover:dark:bg-gray-50">
                      <Statistic
                        title="Active Services"
                        value={activeServices}
                        prefix={<TiTick className="mr-4 text-green-700" />}
                      />
                    </Card>
                  </div>
                </Link>

                <Link to="/employee-reports">
                  <div className="hover:shadow-lg">
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
              </div> */}

              <div className="hover:shadow-lg">
                <Link to="/employee-transaction">
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
                        <h1>Total Amount Received:</h1>
                      </div>
                      <div class="flex flex-col ">
                        <h1 className="text-green-700 ">
                          Rs.{totalAmount()}
                        </h1>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
              <div className="bg-white rounded shadow-lg hover:bg-gray-50 hover:dark:bg-gray-50">
                <Card
                  title={
                    <div className="flex flex-row justify-between">
                      <h1 className="text-sky-800">Work Progress</h1>
                      <svg
                        class="w-8 h-8"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2.99988V5.99988M12 20.9999V17.9999M4.20577 16.4999L6.80385 14.9999M21 11.9999H18M16.5 19.7941L15 17.196M3 11.9999H6M7.5 4.20565L9 6.80373M7.5 19.7941L9 17.196M19.7942 16.4999L17.1962 14.9999M4.20577 7.49988L6.80385 8.99988"
                          stroke="#075985"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  }
                >
                  <div class="p-4 justify-center">
                    
                      {Object.keys(workDetails).length !== 0 ? (
                    <Card title="Assigned For:">
                    <Link to="/employee-work-schedule" key={workDetails.key}>
                      <div class="mb-5">
                        <Progress
                          percent={progressPercent(workDetails)}
                          strokeColor={"green"}
                        />
                      </div>
                      <div class="flex flex-row items-center justify-center space-x-5">
                        <img
                          class="rounded-full object-cover w-10 h-10"
                          src={workDetails.profilepicture}
                          alt="Profile Pic"
                        ></img>
                        <h1 class="text-sm ">
                          Client's Name:{" "}
                          <span class="font-semibold">
                            {workDetails.fullname}
                          </span>
                        </h1>
                        <div class="flex flex-row item-center justify-between space-x-5">
                          <h1>
                            Start Date:{" "}
                            {workDetails.approved_date
                              ? new Date(
                                  workDetails.approved_date
                                ).toLocaleDateString()
                              : ""}
                          </h1>
                          <h1>
                            End Date:{" "}
                            {workDetails.expiry_date
                              ? new Date(
                                  workDetails.expiry_date
                                ).toLocaleDateString()
                              : ""}
                          </h1>
                          <h1>
                            Total Duration:{" "}
                            {workDetails.approved_date &&
                            workDetails.expiry_date
                              ? Math.round(daysDifference)
                              : ""}{" "}
                            days
                          </h1>
                        </div>
                      </div>
                    </Link>
                  </Card>
                  
                      ) : (
                        <div>
                          <Card>
                            <div class="flex flex-col items-center justify-center space-y-4 p-4">
                              <ExclamationCircleOutlined
                                style={{ fontSize: "32px", color: "#075985" }}
                              />
                              <h1>No Current Services</h1>
                            </div>
                          </Card>
                        </div>
                      )}
                  </div>
                </Card>
              </div>
            </div>

            <div className="rounded">
              <div className="hover:shadow-lg">
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
                      onClick={() => navigate("/employee-announcement")}
                    >
                      View Announcements
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div className="text-white font-medium">
            <DashboardFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboardObject;
