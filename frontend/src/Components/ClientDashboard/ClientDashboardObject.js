import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Descriptions,
  Progress,
  Card,
  Modal,
  Button,
  Divider,
  Statistic,
  Table,
  message,
} from "antd";
import { EyeOutlined , ExclamationCircleOutlined } from "@ant-design/icons";
import { SiVirustotal } from "react-icons/si";
import { TiTick } from "react-icons/ti";
import { BiSolidReport } from "react-icons/bi";
import DashboardFooter from "../Dashboards/DashboardFooter";
import KhaltiCheckout from "khalti-checkout-web";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pie } from "@ant-design/charts";
import Spinner from "../../Pages/ProfileSettings/Spinner";

function ClientDashboard() {
  const [getServiceItems, setGetServiceItems] = useState([]);

  const [workDetails, setWorkDetails] = useState([]);
  const [showSubscription, setShowSubscription] = useState(false);
  const [loading, setLoading] = useState(false);
  const listItem = [
    "Prioritize Service Requests",
    "Premium Service Plans",
    "Fast-track handling of your reports",
    "Quick response to support requests",
  ];
  const [subscriptionDetails, setSubscriptionDetails] = useState([]);
  const navigate = useNavigate();
  const userData = localStorage.getItem("userData");
  const userID = JSON.parse(userData);
  const user_id = userID.user_id;
  const [getAnnouncement, setGetAnnouncement] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState([]);
  const [totalServices, setTotalServices] = useState(0);
  const [activeService, setActiveSetvice] = useState(0);
  const [totalReports, setTotalReports] = useState(0);
  // Displaying the work details
  useEffect(() => {
    const handleWork = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://127.0.0.1:8000/viewclientservice/${userID.user_id}`
        );
        const data = await res.json();
        setWorkDetails(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        return error;
      }
    };

    handleWork();
  }, []);

  // Displaying totol services
  useEffect(() => {
    const handleSubmit = async () => {
      const res = await fetch("http://127.0.0.1:8000/getservices/");
      const data = await res.json();
      setGetServiceItems(data);
    };
    handleSubmit();
  }, []);

  // Displaying the progress percentage
  const progressPercent = (item) => {
    const startDate = new Date(item.approved_date);
    const endDate = new Date(item.expiry_date);
    const currentDate = new Date();

    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = currentDate.getTime() - startDate.getTime();

    const progressPercentage = (elapsedDuration / totalDuration) * 100;
    return Math.round(progressPercentage);
  };

  const totalDuration = (item) => {
    const startDate = new Date(item.approved_date);
    const endDate = new Date(item.expiry_date);

    const timeDifference =
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

    return timeDifference;
  };

  // Displaying Popup on first page load

  useEffect(() => {
    const firstPageLoad = localStorage.getItem("isFirstPageLoad") === null;

    if (firstPageLoad) {
      setShowSubscription(true);

      localStorage.setItem("isFirstPageLoad", "false");
    }
  }, []);

  // handling Subscription

  const handleSubscription = async () => {
    // Fetching the user ID
    setLoading(true);
    const config = {
      publicKey: "test_public_key_fb53c47dfcf44808988bda227c018702",
      productIdentity: "123",
      productName: "Premium Subscription Plan",
      productUrl: "http://localhost:3000/",
      eventHandler: {
        onSuccess: async (payload) => {
          await sendPaymentToken(payload.token, payload.amount);
        },
        onError: (error) => {
          // Handle errors
          console.log(error);
        },
        onClose: () => {
          navigate("/client-dashboard");
        },
      },
      paymentPreference: ["KHALTI"],
    };
    try {
      const checkout = new KhaltiCheckout(config);
      checkout.show({ amount: 20000 });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const sendPaymentToken = async (paymentToken, amount) => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://127.0.0.1:8000/subscriptionpayment/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payment_token: paymentToken,
            payment_amount: amount,
            user_id: user_id,
          }),
        }
      );

      if (response.ok) {
        navigate("/client-dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    }
  };

  // Fetching the subscription Details

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/subscriptiondetails/${user_id}`
        );
        const data = await response.json();
        setSubscriptionDetails(data);
      } catch (error) {
        toast.error("Unable To Fetch The Details");
      }
    };
    fetchSubscriptionDetails();
  }, [user_id]);

  // Displaying dashboard Details

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

    const getClientData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/clienttransaction/${userID.user_id}`
        );
        const data = await response.json();
        setTotalTransactions(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        message.error(error.message);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      }
    };

    const fetchServiceData = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://127.0.0.1:8000/getservices/");
        const data = await res.json();
        setTotalServices(data.length);
      } catch (error) {
        message.error(error.message);
      }
    };

    const singleClientService = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/viewclientservice/${userID.user_id}`
        );
        const data = await res.json();
        const finalData = data.filter((data) => data.status === "On-Going");
        setActiveSetvice(finalData.length);
        console.log(data);
      } catch (error) {
        toast.error(error);
      }
    };

    const fetchReportDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/getclientreport/${userID.user_id}`
        );
        const data = await response.json();
        setTotalReports(data.length);
      } catch (error) {
        console.error("Error fetching report details:", error);
      }
    };

    fetchReportDetails();
    singleClientService();
    fetchServiceData();
    getClientData();
    announcement();
  }, []);

  // total Payment
  const totalPayment = () => {
    let total = 0;
    totalTransactions?.map((info) => {
      total += parseFloat(info.amount);
    });
    return total;
  };

  // Online Payment

  const onlinePayment = () => {
    const khaltiTransactions = totalTransactions.filter(
      (totalTransactions) =>
        totalTransactions.payment_method === "Khalti Payment"
    );
    const totalAmount = khaltiTransactions.reduce(
      (total, transaction) => total + parseFloat(transaction.amount),
      0
    );
    return totalAmount;
  };

  const cashPayment = () => {
    const cashTransactions = totalTransactions.filter(
      (totalTransactions) => totalTransactions.payment_method === "Cash Payment"
    );
    const totalAmount = cashTransactions.reduce(
      (total, transaction) => total + parseFloat(transaction.amount),
      0
    );
    return totalAmount;
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
      <ToastContainer />
      <Modal
        open={showSubscription}
        onCancel={() => setShowSubscription(false)}
        footer={null}
        width={400}
      >
        {loading && <Spinner />}
        <div class="flex flex-col bg-violet-950 rounded-3xl  items-center justify-center w-full">
          <div class="flex flex-row items-center space-x-3 p-10">
            <button class="flex justify-center w-20 h-20 rounded-3xl items-center item bg-gradient-to-br from-orange-300 via-amber-400 to-yellow-500">
              <img
                class="w-10 h-10"
                src={require(`../../images/subscribe.png`)}
              ></img>
            </button>
            <div class="flex flex-col">
              <h1 class="text-xl font-bold text-white">Premium</h1>
              <h1 class="text-4xl font-bold text-amber-400">
                Rs.2000<span class="text-white text-xl"> /only</span>
              </h1>
            </div>
          </div>

          <div class="flex flex-col items-center space-y-4 mb-5">
            <h1 class="text-sm text-white ">Premium Subscription Plan</h1>
            <hr class="w-full border-t  border-white" />
            <ul>
              {listItem.map((item, index) => (
                <li
                  class="flex flex-row items-center text-amber-400 text-sm p-2"
                  key={index}
                >
                  <img
                    src={require(`../../images/list.png`)}
                    class="w-3 h-3 mr-2"
                  ></img>
                  {item}
                </li>
              ))}
            </ul>
            <hr class="w-full border-t border-white" />
            {subscriptionDetails.is_subscribed === true ? (
              <button
                onClick={handleSubscription}
                class="bg-amber-400 rounded-2xl hover:bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-600 p-3 font-bold text-white hover:text-gray-900"
                disabled
              >
                ALREADY SUBSCRIBED
              </button>
            ) : (
              <button
                onClick={handleSubscription}
                class="bg-amber-400 rounded-2xl hover:bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-600 p-3 font-bold text-white hover:text-gray-900"
              >
                SUBSCRIBE NOW
              </button>
            )}
          </div>
        </div>
      </Modal>

      <div className="mt-2 w-10/14 p-14 ">
        <div className=" flex-col py-3 ">
          <h1 className="text-3xl font-semibold ">Dashboard</h1>
        </div>


        <div className="rounded p-4">
        <div className="grid grid-cols-2">
          <div class="p-2 space-y-3">
            <div class="flex flex-row space-x-3 justify-start">
              <Link to="/request-service">
                <div className="hover:shadow">
                  <Card className="shadow-lg hover:bg-gray-50 hover:dark:bg-gray-50">
                    <Statistic title="Total Services" value={totalServices} prefix={<SiVirustotal className="mr-4 text-sky-700"/>}/>
                  </Card>
                </div>
              </Link>

              <Link to="/client-view-service">
                <div className="hover:shadow">
                  <Card className="shadow-lg hover:bg-gray-50 hover:dark:bg-gray-50">
                    <Statistic title="Active Services" value={activeService} prefix={<TiTick  className="mr-4 text-green-700"/>} />
                  </Card>
                </div>
              </Link>

              <Link to="/client-reports">
                <div className="hover:shadow items-center">
                  <Card className="shadow-lg hover:bg-gray-50 hover:dark:bg-gray-50">
                    <Statistic title="Issued Reports" value={totalReports} prefix={<BiSolidReport className="mr-4 text-orange-700"/>}/>
                  </Card>
                </div>
              </Link>
            </div>

            <div className="hover:shadow">
              <Link to="/client-transaction">
              <Card className="shadow-lg hover:bg-gray-50 hover:dark:bg-gray-50"
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
                    <h1>Total Payment:</h1>
                    <h1>Online Payment:</h1>
                    <h1>Cash Payment:</h1>
                  </div>
                  <div class="flex flex-col ">
                    <h1 className="text-red-700">Rs.{totalPayment()}</h1>
                    <h1 className="text-red-700">Rs.{onlinePayment()}</h1>
                    <h1 className="text-red-700">Rs.{cashPayment()}</h1>
                  </div>
                </div>
              </Card>
              </Link>
             
            </div>

            <div class="rounded border bg-white shadow-xl p-2">
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
            }>

            <div class="p-4 justify-center">
              <Card className="shadow-lg hover:bg-gray-50 hover:dark:bg-gray-50">
                {workDetails.filter((item) => item.status === "On-Going")
                  .length > 0 ? (
                  workDetails
                    .filter((item) => item.status === "On-Going")
                    .map((item) => (
                      <Link to="/client-view-service" key={item.key}>
                        <div class="mb-5">
                          <Progress
                            percent={progressPercent(item)}
                            strokeColor={"green"}
                          />
                        </div>
                        <Card title="Assigned To:">
                          <div class="flex flex-row items-center justify-center space-x-5">
                            <img
                              class="rounded-full w-10 h-10"
                              src={
                                item.assigned_employee.assigned_employee
                                  .profilepic
                              }
                              alt="Profile Pic"
                            ></img>
                            <h1 class="text-sm ">
                              Employee's Name:{" "}
                              {
                                item.assigned_employee.assigned_employee
                                  .fullname
                              }
                            </h1>
                            <div class="flex flex-row item-center justify-between space-x-5">
                              <h1>
                                Start Date:{" "}
                                {new Date(
                                  item.approved_date
                                ).toLocaleDateString()}
                              </h1>
                              <h1>
                                End Date:{" "}
                                {new Date(
                                  item.expiry_date
                                ).toLocaleDateString()}
                              </h1>
                              <h1>
                                Total Duration:{" "}
                                {Math.round(totalDuration(item))} days
                              </h1>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))
                ) : (
                  <div><Card>
                  <div class="flex flex-col items-center justify-center space-y-4 p-4">
                  <ExclamationCircleOutlined style={{ fontSize: "32px" , color:"red"}}/>
                      <h1>No Current Services</h1>
                    <Link to='/request-service'> 
                      <button class="rounded border p-3 bg-green-600 text-white font-bold hover:shadow-xl hover:bg-amber-700">Request For Services Now!</button>
                    </Link>
                    </div>
                  </Card></div>
                )}
              </Card>
            </div>
            </Card>
            
            
          </div>
          </div>
            <div className="space-y-5">
            <div className="p-2 mt-2 bg-white rounded shadow-xl  justify-content-center align-items-center">
                  <Pie {...config} height={300} width={300} />
                </div>
              <Card className="shadow-lg hover:bg-gray-50 hover:dark:bg-gray-50"
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
                    onClick={() => navigate("/client-announcement")}
                  >
                    View Announcements
                  </Button>
                </div>
              </Card>
              
            </div>
          </div>
        </div>
        
        <DashboardFooter />
      </div>
    </div>
  );
}

export default ClientDashboard;
