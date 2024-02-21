import React, { useState, useEffect } from "react";
import { Table, Button, message, Breadcrumb, Input, Form } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Spinner from "../../Pages/ProfileSettings/Spinner";
import DashboardFooter from "../Dashboards/DashboardFooter";
function EmployeeTransactionObject() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const localdata = localStorage.getItem("userData");
  const userType = JSON.parse(localdata);

  const [amount, setAmount] = useState();
  const [booked, setBooked] = useState(0);

  useEffect(() => {
    const tableValue = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/employeesalary/${userType.user_id}`
        );
        const data = await response.json();
        setData(data);
        const totalAmount = data.reduce((acc, item) => {
          const amount = parseFloat(item.amount);
          if (!isNaN(amount)) {
            return acc + amount;
          }
          return acc;
        }, 0);
        
        const bookedAmount = data.reduce((acc , item)=>{
          const bamt = parseFloat(item.salary_book);
          if(!isNaN(bamt)) {
            return acc + bamt; 
          }
          return acc;
        } , 0);

        setAmount(totalAmount);
        setBooked(bookedAmount);
        setLoading(false);
      } catch (error) {
        message.error("Failed to fetch data.");
      }
    };

    tableValue();
  }, []);

  const employeeContents = [
    {
      title: "S.N",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Booked Payment",
      dataIndex: "booked_amount",
      key: "booked_amount",
    },
    {
      title: "Paid Amount",
      dataIndex: "payment_amount",
      key: "payment_amount",
    },
    {
      title: "Payment Date ",
      dataIndex: "payment_date",
      key: "payment_date",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const tableData = data.map((info, index) => ({
    sn: index + 1,
    key: info.id,
    booked_amount: `Rs. ${info.salary_book !== null ? info.salary_book : "0"}`,
    payment_amount: `Rs. ${info.amount !== null ? info.amount : "0"}`,
    payment_date: info.action_date,
    description: info.description,
  }));

  return (
    <div class="w-screen mt-8">
      {loading && <Spinner />}
      <div class="flex flex-col mt-2 p-6">
        <div class="flex flex-row justify-between items-center py-3">
          <h1 class="text-xl font-bold">All Transactions</h1>
          <Breadcrumb
            items={[
              {
                href: "/employee-dashboard",
                title: <HomeOutlined />,
              },
              {
                href: "/employee-transaction",
                title: "Transaction",
              },
            ]}
          />
        </div>
        <div class="grid p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
          <div class="m-1">
            <Table
              columns={employeeContents}
              dataSource={tableData}
              pagination={{
                pageSize: 10,
                showTotal: (total) => `Total ${total} items`,
              }}
            ></Table>
            <div className="flex flex-row items-center justify-center space-x-3  ">
              <h1 className="font-bold text-gray-700 text-sm">
                Total Paid Amount:
                <span className="text-green-600"> Rs.{amount}</span>
              </h1>
              
            </div>
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default EmployeeTransactionObject;
