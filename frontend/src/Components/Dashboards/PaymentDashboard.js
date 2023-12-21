import React, { useEffect } from "react";
import DashboardFooter from "./DashboardFooter";
import { useState } from "react";
// import {  } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Table, Tabs, Tag, Modal, Space , Button  } from "antd";

function PaymentDashboard() {
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [returnUrl, setReturnUrl] = useState("http://localhost:3000/dashboard");
  const [websiteUrl, setWebsiteUrl] = useState("http://localhost:3000");
  const [amount, setAmount] = useState(1000 * 100);
  const [purchaseOrderId, setPurchaseOrderId] = useState("Order01");
  const [purchaseOrderName, setPurchaseOrderName] = useState("test");
  const navigate = useNavigate();
  const [EmployeeModelOpen, setEmployeeModelOpen] = useState(false);
  const [ClientModelOpen, setClientModelOpen] = useState(false);

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
    client_id:123 ,
    client_name:"Saurav Niraula", 
    payment_status:["Unpaid"],
      },
      {
        key: "1",
        client_id:123 ,
        client_name:"Saurav Niraula", 
        payment_status:["Paid"],
      },
    ];

  //   Contents for Client Table

  const clientTableContents = [
    {
        title:"Client ID",
        dataIndex: "client_id",
        key: "client_id",
  },
    {
        title:'Client Name',
        dataIndex: "client_name",
        key: "client_name",
        render: (text) => <a>{text}</a>,        
  },
   
  {
        title:"Payment Status",
        dataIndex: "payment_status",
        key:"payment_status", 
   render : (_,{payment_status}) => (
    <>
          {payment_status &&
            payment_status.map((tag) => {
                let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "Paid") {
                color = "green";
              }else{
                color = "yellow";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag}
                </Tag>
              );
            })}
        </>
   )
  },
  {
    title:'Action',
    dataIndex: "action",
    key: "action",
    render : (_,{action}) => (
        <Space size="medium">
          <Button onClick={()=>setClientModelOpen(true)}>
            Request Payment
          </Button>
          <Modal
            title="Are you sure? "
            open={ClientModelOpen}
            onOk={()=>setClientModelOpen(false)}
            onCancel={()=>setClientModelOpen(false)}
            okText="Make Request"
            okType="default"
            width={400}
          >
            <div class="flex flex-col">
                <h1>Request payment of Rs.1000 from Saurav Niraula?</h1>
            </div>
          </Modal>
        </Space>
    )        
},

];


// Data For Employee Table
const employeeData = [
    {
    key: "1",
    employee_id:123 ,
    employee_name:"Saurav Niraula", 
    salary_status:["Unpaid"],
      },
      {
        key: "2",
        employee_id:123 ,
        employee_name:"Saurav Niraula", 
        salary_status:["Paid"],
      },
    ];

// //   Contents for employee Table

  const employeeTableContents = [
    {
        title:"Employee ID",
        dataIndex: "employee_id",
        key: "employee_id",
        render: (text) => <a>{text}</a>, 
  },
    {
        title:'Employee Name',
        dataIndex: "employee_name",
        key: "employee_name",   
  },
   
  {
        title:"Salary Status",
        dataIndex: "salary_status",
        key:"salary_status", 
   render : (_,{salary_status}) => (
    <>
          {salary_status &&
            salary_status.map((tag) => {
                let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "Paid") {
                color = "green";
              }else{
                color = "yellow";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag}
                </Tag>
              );
            })}
        </>
   )
  },
  {
    title:'Action',
    dataIndex: "action",
    key: "action",
    render : (_,{action}) => (
        <Space size="medium">
          <Button onClick={()=>setEmployeeModelOpen(true)}>
            Process Salary
            
          </Button>
          <Modal
            title="Are you sure?"
            open={EmployeeModelOpen}
            okText="Pay"
            onCancel={()=>setEmployeeModelOpen(false)}
            onOk={handlePayment}
            okType="default"
            width={400}
          >
            <div class="flex flex-col">
                <h1>Payment ID: A124</h1>
                <h1>Name:Saurav Niraula</h1>
                <h1>Amount: Rs.2000</h1>
            </div>
          </Modal>
        </Space>
    )        
},

];



  const clientTable = <Table columns={clientTableContents} dataSource={clientData}></Table>;
  const employeeTable = <Table columns={employeeTableContents} dataSource={employeeData}></Table>;

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

  //    Handling Gateaway Payment Sideeffect
  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  }, [paymentUrl]);

  const handlePayment = async (e) => {
    e.preventDefault();
    console.log("test");
    try {
      const payload = {
        return_url: returnUrl,
        website_url: websiteUrl,
        amount: amount,
        purchase_order_id: purchaseOrderId,
        purchase_order_name: purchaseOrderName,
        customer_info: {
          name: "Hari Kumar",
          email: "test@khalti.com",
          phone: "9800000001",
        },
      };

      const headers = {
        Authorization: "key b42caed1ffbd4202b41b700a32e3a237",
        "Content-Type": "application/json",
      };
      const response = await fetch(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(payload),
        }
      );

      // console.log(await response.json());

      if (response.ok) {
        const responseData = await response.json();
        setPaymentUrl(responseData.payment_url);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div class="w-screen">
      <div class="flex flex-col mt-14 p-3">
        <div class="flex">
          <h1 class="text-3xl font-base">Payment</h1>
        </div>

        <div class="grid p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
          <h1 class="text-sm p-2 text-sky-700 hover:underline">
            *Make or Request Payments*
          </h1>
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
            <Tabs onChange={onChange} type="card" items={TabList}></Tabs>
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default PaymentDashboard;
