import React, { useEffect, useState } from "react";
import DashboardFooter from "./DashboardFooter";
// import {  } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Table, Tabs, Tag, Modal, Space, Button, Dropdown } from "antd";

// importing Khalti
import KhaltiCheckout from "khalti-checkout-web";

function PaymentDashboard() {
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [returnUrl, setReturnUrl] = useState("http://localhost:3000/admin-dashboard");
  const [websiteUrl, setWebsiteUrl] = useState("http://localhost:3000");
  const [amount, setAmount] = useState(1000);
  const [purchaseOrderId, setPurchaseOrderId] = useState("Order01");
  const [purchaseOrderName, setPurchaseOrderName] = useState("test");
  const navigate = useNavigate();
  const [EmployeeModelOpen, setEmployeeModelOpen] = useState(false);
  const [ClientModelOpen, setClientModelOpen] = useState(false);
  const [selectPaymentMethod, setSelectPaymentMethod] = useState("");

  console.log(selectPaymentMethod);

  function cashPayment() {
    alert("Hello!");
  }

  const ContractSearch = async (e) => {
    e.preventDefault();
    try {
      console.log("Hello Word!");
    } catch (e) {}
  };

  // Handles the Tab
  const onChange = (key) => {
    console.log(key);
  };

  //   Data For The Client Table
  const clientData = [
    {
      key: "1",
      client_id: 123,
      client_name: "Saurav Niraula",
      payment_amount : 2000,
      payment_status: ["Unpaid"],
    },
    {
      key: "1",
      client_id: 123,
      client_name: "Saurav Niraula",
      payment_amount : 2000,
      payment_status: ["Paid"],
    }, 
  ];

  //   Contents for Client Table

  const clientTableContents = [
    {
      title:"S.N",
      dataIndex:"sn",
      key:"sn"
    },
    {
      title: "Client ID",
      dataIndex: "client_id",
      key: "client_id",
    },
    {
      title: "Client Name",
      dataIndex: "client_name",
      key: "client_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Payment Amount",
      dataIndex: "payment_amount",
      key: "payment_amount",
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "payment_status",
      render: (_, { payment_status }) => (
        <>
          {payment_status &&
            payment_status.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "Paid") {
                color = "green";
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
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, { action }) => (
        <Space size="medium">
          <Button size="small" onClick={() => setClientModelOpen(true)}>
            Request Payment
          </Button>
          <Modal
            title="Are you sure? "
            open={ClientModelOpen}
            onOk={() => setClientModelOpen(false)}
            onCancel={() => setClientModelOpen(false)}
            okText="Make Request"
            okType="default"
            width={400}
          >
            <div class="flex flex-col">
              <h1>Request payment of Rs.1000 from Saurav Niraula?</h1>
            </div>
          </Modal>
        </Space>
      ),
    },
  ];

  // Data For Employee Table
  const employeeData = [
    {
      key: "1",
      employee_id: 123,
      employee_name: "Saurav Niraula",
      payment_amount : 10000,
      salary_status: ["Unpaid"],
    },
    {
      key: "2",
      employee_id: 123,
      employee_name: "Saurav Niraula",
      payment_amount : 10000,
      salary_status: ["Paid"],
    },
  ];

  // //   Contents for employee Table

  const employeeTableContents = [
    {
      title:"S.N",
      dataIndex:"sn",
      key:"sn"
    },
    {
      title: "Employee ID",
      dataIndex: "employee_id",
      key: "employee_id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Employee Name",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "Payment Amount",
      dataIndex: "payment_amount",
      key: "payment_amount",
    },
    {
      title: "Salary Status",
      dataIndex: "salary_status",
      key: "salary_status",
      render: (_, { salary_status }) => (
        <>
          {salary_status &&
            salary_status.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "Paid") {
                color = "green";
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
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, { action }) => (
        <Space size="medium">
          <Button size="small" onClick={() => setEmployeeModelOpen(true)}>
            Process Salary
          </Button>
          <Modal
            title="Are you sure?"
            open={EmployeeModelOpen}
            okText="Pay"
            onCancel={() => setEmployeeModelOpen(false)}
            onOk={() =>
              selectPaymentMethod == "Khalti" ? handlePayment() : cashPayment()
            }
            okType="default"
            width={400}
          >
            <div class="flex flex-col">
              <h1>Payment ID: A124</h1>
              <h1>Name:Saurav Niraula</h1>
              <h1>Amount: Rs.2000</h1>
              <h1>
                Pay with:
                <select
                  class="p-1"
                  onChange={(e) => setSelectPaymentMethod(e.target.value)}
                >
                  <option>-------------------------</option>
                  <option>Khalti</option>
                  <option>Cash</option>
                  <option disabled>Esewa (not available)</option>
                </select>
              </h1>
            </div>
          </Modal>
        </Space>
      ),
    },
  ];

  const clientTable = (
    <Table columns={clientTableContents} dataSource={clientData} bordered></Table>
  );
  const employeeTable = (
    <Table columns={employeeTableContents} dataSource={employeeData} bordered></Table>
  );

  // Number of tabs
  const TabList = [
    {
      key: "1",
      label: "Client",
      children: [clientTable],
    },
    {
      key: "2",
      label: "Employee",
      children: [employeeTable],
    },
  ];

  // Handling Gateaway Payment Sideeffect
  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  }, [paymentUrl]);

  // Handling API Payment
  const handlePayment = async (e) => {
    const config = {
      publicKey: "test_public_key_fb53c47dfcf44808988bda227c018702",
      productIdentity: "1234567890",
      productName: "Drogon",
      productUrl: "http://localhost:3000/",
      eventHandler: {
        onSuccess: (payload) => {
          // Hit your merchant API for initiating verification
          console.log(payload);
        },
        onError: (error) => {
          // Handle errors
          console.log(error);
        },
        onClose: () => {
          navigate('/dashboard');
        },
      },
      paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
      ],
    };
    try {
      const checkout = new KhaltiCheckout(config); 
      checkout.show({amount : 1000});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="w-screen mt-14">
      <div class="flex flex-col mt-2 p-6">
        <div class="flex py-3">
          <h1 class="text-2xl font-bold">Payment</h1>
        </div>

        <div class="grid p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
          <div class="grid p-3 grid-cols-2">
            <div>
              <form class="space-x-5" onSubmit={ContractSearch}>
                <input
                  class="shadow rounded border border-gray-200 w-60 py-2 px-3 text-gray-700 text-sm mb-3 leading-tight invalid:border-red-500  focus:shadow-outline"
                  type="text"
                  placeholder="Search an item..."
                  name="SearchBarForPayments"
                />
                <button
                  class="bg-green-500 py-2 px-2 rounded border text-white hover:bg-green-600 hover:shadow-lg text-sm"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
            <div class="justify-self-end">
              <div>
                <form class="space-x-5 " onSubmit={ContractSearch}>
                  <select
                    class="rounded border border-gray-200 text-sm text-gray-500 px-2 py-2"
                    type="text"
                  >
                    <option class="">Choose From The List Below</option>
                    <option>Test</option>
                    <option>Test</option>
                  </select>
                  <button
                    class="bg-violet-500 py-2 px-2 rounded border text-white hover:bg-violet-800 hover:shadow-lg text-sm"
                    type="submit"
                  >
                    Filter Search
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="m-1">
            <Tabs onChange={onChange} type="card" items={TabList} ></Tabs>
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default PaymentDashboard;
