import React, { useEffect, useState } from "react";
import DashboardFooter from "./DashboardFooter";
// import {  } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";
import { Table , Button , Tabs } from "antd";
import Spinner from "../../Pages/ProfileSettings/Spinner";
function PaymentDashboard() {

 

  const navigate = useNavigate();
  const [loading , setLoading] = useState(false);
  const [paymentDetails , setPaymentDetails] = useState([])
  const { TabPane } = Tabs;

  useEffect(()=>{
    const getPaymentData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/alltransactions/")
        const data = await response.json();
        setPaymentDetails(data);
        console.log(data);
      }catch(error){
        console.log(error);
      }finally{
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      }
    };
    getPaymentData();
  },[])




  //   Contents for Client Table

  const paymentColumn = [
    {
      title:"S.N",
      dataIndex:"sn",
      key:"sn"
    },
    {
      title:"User Type",
      dataIndex:"user_type",
      key:"user_type"
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Value",
      dataIndex: "payment_amount",
      key: "payment_amount",
    },
    {
      title:"Payment Method",
      dataIndex: "payment_method",
      key:"payment_method",
    },
    {
      title:"Date",
      dataIndex:"date" ,
      key : "date"
    },
    {
      title:"Description",
      dataIndex:"description",
      key:"description"
    },
  ];

  // data for Service Payments 

  const servicePayments = paymentDetails?.payment_details?.data?.map((info, index) => ({
    sn: index + 1,
    key: info?.id,
    user_type: info?.service_use?.user?.user_type,
    user_name: info?.service_use?.user?.fullname,
    payment_amount: `Rs ${info?.amount}`,
    payment_method : info?.payment_method,
    date: info?.payment_date,
    description: info?.service_use?.services?.servicename,
  })) || [];


// data for Employee Salary 

const salaryPayments = paymentDetails?.salary_details?.data?.map((info , index) =>({
  sn:index + 1 ,
  key:info?.id , 
  user_type:info?.caliber?.employee?.user_type ,
  user_name : info?.caliber?.employee?.fullname , 
  payment_amount : `Rs ${info?.amount}` ,
  date:info?.payment_date , 
  description:"Salary Payment"
}))


const premiumPayments = paymentDetails?.subscription_details?.data?.map((info , index)=>({
  sn:index + 1,
  key:info?.id,
  user_type :info?.user?.user_type , 
  user_name:info?.user?.fullname,
  payment_amount : `Rs ${info?.amount}` , 
  date : info?.payment_date ,
  description:info?.subscription_name

}))

  const TabList =[
    {
      key:'1',
      label:'Service Payments',
      children :(
        <TabPane tab="Service Payments" key="1">
          <Table
          columns = {paymentColumn}
          dataSource={servicePayments}
          bordered
          pagination={{
            pageSize:10,
            showTotal:(total) => `Total ${total} items`
          }}
        
          />
        </TabPane>
      )
    },  
    {
      key:'2',
      label:'Salary Payments',
      children :(
        <TabPane tab="Salary Payments" key="2">
          <Table
          columns = {paymentColumn}
          bordered
          dataSource={salaryPayments}
          pagination={{
            pageSize:10,
            showTotal:(total) => `Total ${total} items`
          }}
          />
        </TabPane>
      )
    },
    {
      key:'3',
      label:'Premium Membership',
      children :(
        <TabPane tab="Premium Membership" key="3">
          <Table
          columns = {paymentColumn}
          bordered
          dataSource={premiumPayments}
          pagination={{
            pageSize:10,
            showTotal:(total) => `Total ${total} items`
          }}
          />
        </TabPane>
      )
    },
]
  return (
    <div class="w-screen mt-8">
      {loading && <Spinner />}
      <div class="flex flex-col mt-2 p-6">
        <div class="flex py-3">
          <h1 class="text-2xl font-bold">Transcations</h1>
        </div>

        <div class="grid p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
          <div class="grid p-3 grid-cols-2">
            <div>
                <input
                  class="shadow rounded border border-gray-200 w-60 py-2 px-3 text-gray-700 text-sm mb-3 leading-tight invalid:border-red-500  focus:shadow-outline"
                  type="text"
                  placeholder="Search an item..."
                  name="SearchBarForPayments"
                />
                
            </div>
            <div class="justify-self-end ">
              <div class="flex flex-row space-x-2">
                  <select
                    class="rounded border border-gray-200 text-sm text-gray-500 px-2 py-1"
                    type="text"
                  >
                    <option class="">Choose From The List Below</option>
                    <option>Test</option>
                    <option>Test</option>
                  </select>
                  <Link to='/create-transaction'>
                  <Button>Add Transaction</Button>
                  </Link>
              </div>
            </div>
          </div>
          <div class="m-1">
            <Tabs>{TabList.map((tab)=>tab.children)}</Tabs>
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default PaymentDashboard;
