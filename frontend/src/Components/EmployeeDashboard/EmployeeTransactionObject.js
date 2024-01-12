import React, { useState, useEffect} from "react";
import { Table, Button, message , Breadcrumb } from "antd";
import { HomeOutlined} from "@ant-design/icons";
import Spinner from "../../Pages/ProfileSettings/Spinner";
import DashboardFooter from "../Dashboards/DashboardFooter";
function EmployeeTransactionObject() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const localdata = localStorage.getItem("userData");
  const userType = JSON.parse(localdata);
  useEffect(() => {
    const tableValue = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/employeesalary/${userType.user_id}`
        );
        const data = await response.json();
        setData(data);
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
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Value",
      dataIndex: "payment_amount",
      key: "payment_amount",
    },
    {
      title: "Payment Date ",
      dataIndex: "payment_date",
      key: "payment_date",
    },
  ];

  const tableData = data.map((info, index) => ({
    sn: index + 1,
    key: info.id,
    user_name: info.caliber?.employee?.username,
    payment_amount: info.amount,
    payment_date: info.payment_date,
  }));

  return (
    <div class="w-screen mt-8">
      {loading && <Spinner />}
      <div class="flex flex-col mt-2 p-6">
        <div class="flex flex-row justify-between items-center py-3">
          <h1 class="text-xl font-bold">All Transactions</h1>
          <Breadcrumb items={[
              {
                href:"/employee-dashboard",
                title:<HomeOutlined />
              },
              {
                href:"/employee-transaction",
                title:"Transaction"
              }
              ]}/>
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
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  );
}

export default EmployeeTransactionObject;
