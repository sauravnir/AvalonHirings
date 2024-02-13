import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DashboardFooter from "../Dashboards/DashboardFooter";
import {
  Card,
  Button,
  Modal,
  Table,
  Tag,
  Space,
  Radio,
  Descriptions,
  Rate,
  Input,
  Form,
  Select,
  message,
  Tooltip,
  Breadcrumb,
  Divider,
  InputNumber,
} from "antd";

import {
  EyeOutlined,
  SearchOutlined,
  QuestionOutlined,
  HomeOutlined,
  PlusOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";

import { RiRefund2Line } from "react-icons/ri";

import { useNavigate } from "react-router-dom";

import KhaltiCheckout from "khalti-checkout-web";
import Spinner from "../../Pages/ProfileSettings/Spinner";
// Rating Description
const desc = ["Terrible", "Bad", "Average", "Good", "Perfectionist"];

function ServiceStatus() {
  const rules = [
    {
      required: true,
      message: "required",
    },
  ];
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [descOpen, setDescOpen] = useState(false);

  const handleDescOpen = () => {
    setDescOpen(!descOpen);
  };
  const [singleService, setSingleService] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [singleEmployee, setSingleEmployee] = useState({
    id: "",
    fullname: "",
    contact: "",
    profilepic: "",
  });
  const [loading, setLoading] = useState(false);
  const onFilterChange = useRef([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [userInput, setUserInput] = useState(false);
  // const [spinning , setSpinning] = useState(false);
  const [ratingValue, setRatingValue] = useState("");
  const [ratingFeedbacks, setRatingFeedBacks] = useState("");

  const userData = localStorage.getItem("userData");
  const userID = JSON.parse(userData);
  const client_id = userID.user_id;
  const navigate = useNavigate();

  const getPayment = (value) => {
    setPaymentMethod(value);
  };

  // Handling Khalti Payment
  const khaltiPayment = async (id, serviceName, totalPrice) => {
    setLoading(true);
    const config = {
      publicKey: "test_public_key_fb53c47dfcf44808988bda227c018702",
      productIdentity: id,
      productName: serviceName,
      productUrl: "http://localhost:3000/",
      eventHandler: {
        onSuccess: async (payload) => {
          try {
            await sendPaymentToken(
              payload.token,
              payload.amount,
              payload.product_identity
            );
            setLoading(false);
          } catch (error) {
            setLoading(false);
            message.error("Failed to process payment.");
          }
        },
        onError: (error) => {
          setLoading(false);
          message.error(error.message);
        },
        onClose: () => {
          setLoading(false);
          navigate("/client-view-service");
        },
      },
      paymentPreference: ["KHALTI"],
    };
    try {
      const checkout = new KhaltiCheckout(config);
      checkout.show({ amount: Math.floor(totalPrice / 100) });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  

  const sendPaymentToken = async (paymentToken, amount, serviceuseid) => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/servicetransaction/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_token: paymentToken,
          payment_amount: amount,
          serviceuseid: serviceuseid,
        }),
      });
      
      if (res.ok) {
        const data = await res.json();
        message.success(data.message);
        navigate("/client-dashboard");
      }
    } catch (error) {
      message.error("Failed To Make Payment");
    }
    setLoading(false);
  };

  // Handling Cash Payment

  const cashPayment = async (id, totalPrice) => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/cashpayment/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_use_id: id, total_price: totalPrice }),
      });
      if (response.ok) {
        const data = await response.json();
        navigate("/client-dashboard");
        message.success(data.message);
      }
      setLoading(false);
    } catch (error) {
      message.error(error.message);
    }
  };

  // Fetching client requested services using user_id
  useEffect(() => {
    const singleClientService = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/viewclientservice/${userID.user_id}`
        );
        const data = await res.json();
        setSingleService(data);
        console.log(data);
        const { assigned_employee } = data[0];
        const viewAssignedEmployee = {
          id: assigned_employee?.assigned_employee?.id || "",
          fullname: assigned_employee?.assigned_employee?.fullname || "",
          contact: assigned_employee?.assigned_employee?.contact || "",
          profilepic: assigned_employee?.assigned_employee?.profilepic || "",
        };
        console.log(viewAssignedEmployee);
        setSingleEmployee(viewAssignedEmployee);
        onFilterChange.current = data;
      } catch (error) {
        message.error("Something went wrong!");
      }
    };
    singleClientService();
  }, []);

  // Handling Filter Changes

  const handleFilterChange = (e) => {
    setFilterQuery(e.target.value);
    setUserInput(true);
  };

  useEffect(() => {
    const filterData = async () => {
      try {
        setLoading(true);
        let newData = [...onFilterChange.current];

        if (filterQuery.trim() !== "") {
          newData = newData.filter((item) =>
            item.services.servicename
              .toLowerCase()
              .includes(filterQuery.toLowerCase())
          );
        }

        setSingleService(newData);
        setLoading(false);
      } catch (error) {
        message.error("Failed To Load  The Data");
      }
    };

    if (userInput) {
      filterData();
    } else {
      setSingleService([...onFilterChange.current]);
      setUserInput(false);
    }
  }, [userInput, filterQuery]);

  // Handling Client Ratings
  const handleRatings = async (Id) => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/rateemployee/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employee_id: Id,
          rating_num: ratingValue,
          rating_feedback: ratingFeedbacks,
          client_id: client_id,
        }),
      });
      setLoading(false);
      if (response.ok) {
        const data = await response.json();
        message.success(data.message);
        navigate("/client-dashboard");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const requestContent = [
    {
      title: "S.N",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Service Name ",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Service From",
      dataIndex: "service_from",
      key: "service_from",
    },
    {
      title: "Service Till",
      dataIndex: "service_till",
      key: "service_till",
    },
    {
      title: "Time Frame",
      dataIndex: "time_frame",
      key: "time_frame",
      render: (_, record) => {
        return (
          <div class="flex flex-row">
            <h1>
              {parseInt(record.time_frame.startHour.split(":")[0], 10) <= 12
                ? record.time_frame.startHour + " AM"
                : parseInt(record.time_frame.startHour.split(":")[0], 10) -
                  12 +
                  ":" +
                  record.time_frame.startHour.split(":")[1] +
                  " PM"}
            </h1>
          </div>
        );
      },
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "Service Caliber",
      dataIndex: "service_caliber",
      key: "service_caliber",
      render: (record) => {
        return (
          <div>
            {record === "Bronze" ? (
              <div className="flex flex-row items-center">
                <img
                  className="w-5 h-5"
                  src={require(`../../images/bronze.png`)}
                  alt="Bronze"
                />
                Bronze
              </div>
            ) : record === "Silver" ? (
              <div className="flex flex-row items-center">
                <img
                  className="w-5 h-5"
                  src={require(`../../images/silver.png`)}
                  alt="Silver"
                />
                Silver
              </div>
            ) : (
              <div className="flex flex-row items-center">
                <img
                  className="w-5 h-5"
                  src={require(`../../images/gold.png`)}
                  alt="Gold"
                />
                Gold
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex flex-row space-x-2">
          <span>Status</span>
          <div class="flex flex-row items-center">
            <Tooltip
              title="Note: The service will only be available once the payment is
      done."
            >
              <Button
                size="small"
                icon={<QuestionOutlined style={{ fontSize: "13px" }} />}
              ></Button>
            </Tooltip>
          </div>
        </div>
      ),
      dataIndex: "service_status",
      key: "service_status",
      filterMultiple: false,
      filters: [
        { text: "Payment Required", value: "Payment Required" },
        {
          text: "Allocating",
          value: "Allocating",
        },
        { text: "On-Going", value: "On-Going" },
        { text: "Completed", value: "Completed" },
      ],
      render: (_, { service_status }) => (
        <>
          {service_status &&
            service_status.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "Payment Required") {
                color = "orange";
              } else if (tag === "On-Going") {
                color = "green";
              } else if (tag === "Allocating") {
                color = "yellow";
              } else if (tag === "Completed") {
                color = "gray";
              } else {
                color = "red";
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
            options={[
              "Payment Required",
              "Allocating",
              "On-Going",
              "Completed",
            ].map((status) => ({
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
      onFilter: (value, record) => record.service_status.includes(value),
    },
    {
      title: "Action",
      key: "process",
      render: (_, record) => (
        <Space>
          <Button
            disabled={
              record.service_status.includes("Allocating") ||
              record.service_status.includes("Completed") ||
              record.service_status.includes("On-Going")
            }
            onClick={() => setOpenModal(true)}
            size="small"
          >
            {record.service_status.includes("Allocating")
              ? "Paid"
              : record.service_status.includes("On-Going")
              ? "Paid"
              : record.service_status.includes("Completed")
              ? "Paid"
              : "Make Payment"}
          </Button>

          <Modal
            title="Payment Details:"
            open={openModal}
            description
            okType="default"
            onCancel={() => setOpenModal(false)}
            okText="Make Payment"
            centered
            onOk={() =>
              paymentMethod === "Khalti"
                ? khaltiPayment(
                    record.key,
                    record.service_name,
                    record.total_price
                  )
                : cashPayment(record.key, record.total_price)
            }
            width={1100}
          >
            <Descriptions bordered layout="vertical">
              <Descriptions.Item label="Service Name:">
                {console.log(record.key)};
                <a>{record.service_name}</a>
              </Descriptions.Item>
              <Descriptions.Item label="Service Duration:">
                <a>
                  {(() => {
                    const startDate = new Date(record.approved_date);
                    const endDate = new Date(record.service_till);
                    const timeDifference = endDate - startDate;
                    const daysDifference = Math.floor(
                      timeDifference / (1000 * 3600 * 24)
                    );
                    return `${daysDifference} days`;
                  })()}
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Total Amount:">
                <span class="text-green-800"> Rs.{record.total_price}</span>
              </Descriptions.Item>
            </Descriptions>
            <div class="flex flex-row items-center justify-center mt-10 space-x-4 mb-10">
              <h1>Pay with:</h1>
              <Radio.Group
                defaultValue="Khalti"
                onChange={(e) => getPayment(e.target.value)}
              >
                <Radio.Button disabled>Esewa</Radio.Button>
                <Radio.Button
                  className="bg-violet-700 text-white"
                  value="Khalti"
                >
                  Khalti
                </Radio.Button>
                <Radio.Button className="bg-green-700 text-white" value="Cash">
                  Cash
                </Radio.Button>
              </Radio.Group>
            </div>
          </Modal>

          {record.service_status.includes("On-Going") ? (
            <div class="flex flex-row items-center space-x-2">
              <Button size="small" onClick={() => setOpenModal1(true)}>
                Assigned Maid
              </Button>


              <Modal
                open={openModal1}
                onCancel={() => setOpenModal1(false)}
                footer={null}
                width={1000}
                centered
              >
                {" "}
                <div class="text-base font-bold">Employee Details</div>
                <Descriptions layout="horizontal" size="middle" bordered>
                  <Descriptions.Items label="Employee's Profile">
                    <div class="flex flex-row items-center justify-center">
                      <a href={singleEmployee.profilepic}>
                        <img
                          class="w-16 h-16 rounded-full border mb-5 object-cover"
                          alt="User Picture"
                          src={singleEmployee.profilepic}
                        ></img>
                      </a>
                    </div>
                  </Descriptions.Items>
                  <Descriptions.Items label="Employee's Name">
                    {singleEmployee.fullname}
                  </Descriptions.Items>
                  <Descriptions.Items label="Employee's Contact">
                    {singleEmployee.contact}
                  </Descriptions.Items>

                  <Descriptions.Items></Descriptions.Items>
                </Descriptions>
                {/* Employee Rating */}
                <div class="flex justify-end mt-5">
                  <Button
                    className="flex flex-row items-center p-2 border rounded hover:bg-gradient-to-r from-amber-400 to-orange-500 hover:text-white"
                    onClick={() => setOpenModal2(true)}
                    icon={
                      <img
                        class="w-5 h-5 mr-2"
                        src={require(`../../images/rate.png`)}
                      ></img>
                    }
                  >
                    Rate User
                  </Button>
                </div>
                <Modal
                  title="Rate User"
                  open={openModal2}
                  onCancel={() => setOpenModal2(false)}
                  centered
                  okText="Submit Rating"
                  okType="default"
                  width={500}
                  onOk={() => handleRatings(singleEmployee.id)}
                >
                  <div class="flex flex-col p-4 ">
                    <Card>
                      <div class="flex flex-col justify-center ">
                        <Form layout="vertical">
                          <Form.Item label="Give Ratings">
                            <h1>
                              <Space>
                                <Rate
                                  tooltips={desc}
                                  onChange={(value) => setRatingValue(value)}
                                  value={ratingValue}
                                />
                                {ratingValue ? (
                                  <span>{desc[ratingValue - 1]}</span>
                                ) : (
                                  ""
                                )}
                              </Space>
                            </h1>
                          </Form.Item>
                          <Form.Item label="Any Feedbacks?">
                            <Input.TextArea
                              onChange={(e) =>
                                setRatingFeedBacks(e.target.value)
                              }
                            ></Input.TextArea>
                          </Form.Item>
                        </Form>
                      </div>
                    </Card>
                  </div>
                </Modal>
              </Modal>
            </div>
          ) : null}
        </Space>
      ),
    },
  ];

  // Populating the table data
  const tableData = singleService.map((info, index) => ({
    sn: index + 1,
    key: info.id,
    service_name: info.services.servicename,
    location: info.servicelocation,
    service_from: new Date(info.approved_date).toLocaleDateString(),
    service_till: new Date(info.expiry_date).toLocaleDateString(),
    time_frame: {
      startHour: info.startHour,
    },
    total_price: info.totalprice,
    approved_date: info.approved_date,
    service_caliber: info.services.required_caliber,
    service_status: [info.status],
  }));

  return (
    <div className="w-screen mt-8 ">
      {loading && <Spinner />}
      <div className="flex flex-col mt-2 py-3 px-4 ">
        <div className="flex flex-row justify-between items-center mt-3 p-3">
          <h1 className="text-xl font-bold">Service Status</h1>
          <Breadcrumb
            items={[
              {
                href: "/client-dashboard",
                title: <HomeOutlined />,
              },
              {
                title: "Services",
              },
              {
                href: "/client-view-service",
                title: "Service Status",
              },
            ]}
          />
        </div>

        <div className="p-3 bg-white rounded shadow-xl shadow-gray-350">
          <Card>
            <div class="flex flex-cols-2 p-2 justify-between items-center">
              <div>
                <Input
                  prefix={<SearchOutlined />}
                  className="w-60 "
                  value={filterQuery}
                  onChange={handleFilterChange}
                  placeholder="Search Service Names"
                />
              </div>
              <div className="flex flex-row space-x-2">
                <Link to="/request-service">
                  <Button
                    icon={<PlusOutlined />}
                    className="bg-sky-900 hover:bg-sky-700 text-white rounded"
                  >
                    Request Service
                  </Button>
                </Link>

                <Button
                  className="bg-red-900 hover:bg-red-700 text-white rounded"
                  icon={<RiRefund2Line />}
                  onClick={() => setOpenModal3(true)}
                >
                  Request Refund
                </Button>

                <Modal
                  title={
                    <div className="flex flex-row justify-start mt-4">
                      <h1 className="text-lg font-bold p-1">
                        Request A Refund
                      </h1>
                    </div>
                  }
                  open={openModal3}
                  onCancel={() => setOpenModal3(false)}
                  footer={null}
                  width={1000}
                  centered
                >
                  <div className="flex flex-col p-2 ">
                    {/* <div className="flex flex-row ">
                      <Descriptions layout="vertical">
                        <Descriptions.Item label="Service Name">
                          {record.service_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Activation Date">
                          {record.service_from}
                        </Descriptions.Item>
                        <Descriptions.Item label="Refund Amount">
                          Rs.{Math.round(record.total_price * 0.9)}
                        </Descriptions.Item>
                      </Descriptions>
                    </div> */}
                   
                    <div className="flex flex-col">
                      <Form layout="vertical">
                        <Form.Item
                          label="Why are you requesting a refund?"
                          name="reason"
                          rules={rules}
                        >
                          <Select
                            options={[
                              {
                                value: "Choose From The Options Below",
                                label: "Choose From The Options Below",
                                disabled: true,
                              },
                              {
                                value:
                                  "Quality of service is below expectation",
                                label:
                                  "Quality of service is below expectation",
                              },
                              {
                                value: "Maid's Irregularity",
                                label: "Maid's Irregularity",
                              },
                              {
                                value: "Others",
                                label: "Others",
                              },
                            ]}
                          />
                        </Form.Item>
                        <Form.Item label="Service Name:" name="servicename" rules={rules}>
                          <Input />
                        </Form.Item>

                        <Form.Item label="Amount" name="amount" rules={rules}>
                            <InputNumber addonBefore="Rs"/>
                        </Form.Item>

                        <Form.Item
                          label="Description:"
                          name="description"
                          rules={rules}
                        >
                          <Input.TextArea />
                        </Form.Item>

                        <div className="flex flex-row justify-between space-x-2">
                          <div className="space-x-2">
                            <Button
                              className="text-white bg-sky-900 hover:bg-sky-700 rounded"
                              htmlType="submit"
                            >
                              REQUEST REFUND
                            </Button>
                            <Button
                              onClick={() => setOpenModal3(false)}
                              className="text-white bg-red-900 hover:bg-red-700 rounded"
                            >
                              CANCEL
                            </Button>
                          </div>
                          <div className="items-center">
                            <Button size="small" onClick={handleDescOpen}>
                              How do refunds work?
                            </Button>
                          </div>
                        </div>
                      </Form>
                      <Divider />
                      {descOpen ? (
                        <div>
                          <h1 className="font-bold">How do refunds work?</h1>
                          <p>
                            Should you ever require a refund for a service,
                            please reach out to our customer support team,
                            providing the necessary details for a swift review
                            and processing. It's important to note that a <span className="font-bold text-red-800">10% </span>
                            processing fee will be deducted from the total
                            service amount to cover administrative expenses
                            related to the refund. We appreciate your
                            understanding and value your continued trust in our
                            services. Our dedicated support team is ready to
                            assist with any inquiries or concerns you may have.
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
            <Table
              columns={requestContent}
              dataSource={tableData}
              pagination={{
                pageSize: 5,
                showTotal: (total) => `Total ${total} items`,
              }}
            ></Table>

            
          </Card>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default ServiceStatus;
