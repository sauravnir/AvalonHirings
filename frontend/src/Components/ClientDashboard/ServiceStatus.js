import React, { useState, useEffect } from "react";

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

} from "antd";

import { EyeOutlined } from "@ant-design/icons";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import KhaltiCheckout from "khalti-checkout-web";

// Rating Description
const desc = ['Terrible', 'Bad', 'Average', 'Good', 'Perfectionist'];

function ServiceStatus() {
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [singleService, setSingleService] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [singleEmployee, setSingleEmployee] = useState({
    id: "",
    fullname: "",
    contact: "",
    profilepic: "",
  });

  const [spinning , setSpinning] = useState(false);
  const [ratingValue , setRatingValue] = useState("");
  const [ratingFeedbacks , setRatingFeedBacks] = useState("");

  const userData = localStorage.getItem("userData");
  const userID = JSON.parse(userData);
  const client_id = userID.user_id
  const navigate = useNavigate();

  const getPayment = (value) => {
    setPaymentMethod(value);
  };

  // Handling Khalti Payment
  const khaltiPayment = async (id, serviceName, totalPrice) => {
    const config = {
      publicKey: "test_public_key_fb53c47dfcf44808988bda227c018702",
      productIdentity: id,
      productName: serviceName,
      productUrl: "http://localhost:3000/",
      eventHandler: {
        onSuccess: async (payload) => {
          await sendPaymentToken(
            payload.token,
            payload.amount,
            payload.product_identity
          );
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
      checkout.show({ amount: totalPrice / 10 });
    } catch (error) {
      console.log(error);
    }
  };

  const sendPaymentToken = async (paymentToken, amount, serviceuseid) => {
    try {

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
        navigate("/client-dashboard");
        alert("Payment Completed!");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // Handling Cash Payment

  const cashPayment = async (id, totalPrice) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/cashpayment/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_use_id: id, total_price: totalPrice }),
      });
      if (response.ok) {
        navigate("/client-dashboard");
      }
    } catch (error) {
      console.log(error);
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
        const { assigned_employee } = data[0];
        const viewAssignedEmployee = {
          id: assigned_employee?.assigned_employee?.id || "",
          fullname: assigned_employee?.assigned_employee?.fullname || "",
          contact: assigned_employee?.assigned_employee?.contact || "",
          profilepic: assigned_employee?.assigned_employee?.profilepic || "",
        };
        setSingleEmployee(viewAssignedEmployee);
      } catch (error) {
        toast.error(error);
      }
    };
    singleClientService();
  }, []);


  const handleRatings=async(Id)=>{
    try{
      const response = await fetch("http://127.0.0.1:8000/rateemployee/",{
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({employee_id:Id , rating_num : ratingValue , rating_feedback : ratingFeedbacks , client_id : client_id  })
      })
      
      if(response.ok){
        navigate('/client-dashboard')
      }
    } catch(error){
      toast.error(error);
    }
  }


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
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "Status",
      dataIndex: "service_status",
      key: "service_status",
      render: (_, { service_status }) => (
        <>
          {service_status &&
            service_status.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "Payment Required") {
                color = "orange";
              } else if (tag === "On-Going") {
                color = "green";
              } else if (tag === "Paid (Waiting For Approval)") {
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
    },
    {
      title: "Actions",
      key: "process",
      render: (_, record) => (
        <Space>
          <Button
            disabled={
              record.service_status.includes("Paid (Waiting For Approval)") ||
              record.service_status.includes("Completed") ||
              record.service_status.includes("On-Going")
            }
            onClick={() => setOpenModal(true)}
            size="small"
          >
            {record.service_status.includes("Paid (Waiting For Approval)")
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
                <Radio.Button value="Khalti">Khalti</Radio.Button>
                <Radio.Button value="Cash">Cash</Radio.Button>
              </Radio.Group>
            </div>
          </Modal>

          {record.service_status.includes("On-Going") ? (
            <div>
              <Button
                size="small"
                onClick={() => setOpenModal1(true)}
                icon={<EyeOutlined style={{ fontSize: "13px" }} />}
              ></Button>
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
                  <button
                    class="flex flex-row items-center p-2 border rounded hover:bg-gradient-to-r from-amber-400 to-orange-500 hover:text-white"
                    onClick={() => setOpenModal2(true)}
                  >
                    <img
                      class="w-5 h-5 mr-2"
                      src={require(`../../images/rate.png`)}
                    ></img>
                    Rate User
                  </button>
                </div>
                <Modal
                  title="Rate User"
                  open={openModal2}
                  onCancel={() => setOpenModal2(false)}
                  centered
                  okText="Submit Rating"
                  okType="default"
                  width={500}
                  onOk={()=>handleRatings(singleEmployee.id)}
                >
                  <div class="flex flex-col p-4 ">
                    <Card>
                      {/* <div class="flex flex-row items-center justify-center shadow p-3">
                        <img
                          class="w-12 h-12 rounded-full object-cover mr-4"
                          src={singleEmployee.profilepic}
                        ></img>
                        <div class="flex flex-col">
                          <h1 class="text-lg">{singleEmployee.fullname}</h1>
                          <h1>{singleEmployee.contact}</h1>
                        </div>
                      </div> */}
                      <div class="flex flex-col justify-center ">
                        <Form layout="vertical">
                          <Form.Item label="Give Ratings" >
                            <h1>
                              <Space>
                              <Rate tooltips={desc} onChange={(value) =>setRatingValue(value)} value={ratingValue}/>
                              {ratingValue ? <span>{desc[ratingValue-1]}</span> : ""}
                              </Space>
                            </h1>
                          </Form.Item>
                          <Form.Item label="Any Feedbacks?" >
                            <Input.TextArea onChange={(e) => setRatingFeedBacks(e.target.value)}>
                            </Input.TextArea>
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
    total_price: info.totalprice,
    approved_date: info.approved_date,
    service_status: [info.status],
  }));

  return (
    <div className="w-screen mt-14 ">
      <div className="flex flex-col mt-2 py-3 px-4 ">
        <ToastContainer />
        <div className="flex w-full items-center mt-3 justify-between bg-white rounded shadow border p-3">
          <h1 className="text-xl font-bold">View Progress / Status</h1>
          <select class=" w-1/3 shadow-lg p-2 text-sm">
            <option>Filter Service Status</option>
            <option>Processing</option>
            <option>Payment Required</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
        </div>

        <div class="space-y-12">
          <div className="p-3 mt-5 bg-white rounded shadow-xl shadow-gray-350">
            <div class="flex justify-center items-center p-3">
              <div class="bg-sky-700 rounded p-2 px-10">
                <h1 class="hover:underline text-white">
                  Note: The service will only be available once the payment is
                  done.
                </h1>
              </div>
            </div>
            <Card>
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
      </div>
      <DashboardFooter />
    </div>
  );
}

export default ServiceStatus;
