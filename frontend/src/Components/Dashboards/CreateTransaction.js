import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Row, Col, Select , Button, InputNumber , message , Breadcrumb , Tabs} from "antd";
import {  
  HomeOutlined,
  PlusOutlined
} from "@ant-design/icons";
import Spinner from "../../Pages/ProfileSettings/Spinner";
import DashboardFooter from "./DashboardFooter";
function CreateTransaction() {
  const rules = [
    {
      required: true,
      message: "required",
    },
  ];  
const [loading ,setLoading] = useState(false);  
const [transaction , setTransaction] = useState([]);
const [paymentType, setPaymentType] = useState(null);
const [selectedEmployee, setSelectedEmployee] = useState(null);
const navigate = useNavigate()
const { TabPane } = Tabs;
// Creating Salary transaction 
const[salaryAmount , setSalaryAmount] = useState('')
const[salaryDescription , setSalaryDescription] = useState('')
const [caliberId , setCaliberId] = useState()

useEffect(()=>{
    const getPaymentData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/salaryfield/")
        const data = await response.json();
        setTransaction(data)
        console.log(data);
        setLoading(false); 
      
      }catch(error){
        console.log(error);
      }
    };
    getPaymentData();
  },[])

const handlePaymentTypeChange = (value) =>{
  setPaymentType(value);
  setSelectedEmployee(null);
}


const handleEmployeeChange = (value) => {
  setSelectedEmployee(value);

  // Extracting the caliber_id 
  const selectedEmployeeData =transaction.find((e) => e.id === value);
  const caliber = selectedEmployeeData ? selectedEmployeeData.id : null;

  setCaliberId(caliber);
  console.log(caliber)
}

const handleDiscard = () => {
  setLoading(true);
  navigate('/admin-dashboard')
  setLoading(false);
}


// Creating salary 
const createTransaction = async () => {
  try {
    setLoading(true);
    const response = await fetch("http://127.0.0.1:8000/givesalary/",{
      method: "POST",
      headers:{'Content-Type' : 'application/json'},
      body: JSON.stringify({amount : salaryAmount , description : salaryDescription , caliber : caliberId}),
    })
    setLoading(false)
    const data = await response.json()
    if(response.ok){
      message.success(data.message);
      navigate('/admin-dashboard')
    }
  }catch(error){
    message.error("Transaction Failed!");
  }
}


const TabList = [
  {
    key:'1',
    label:"Salary Payment",
    children:(
      <TabPane tab="Salary Payment" key="1">
        <div className="p-3 bg-white rounded ">
          <div className="flex flex-row justify-end items-center">
            <Button type="default" className="text-white bg-green-900 hover:bg-sky-700 rounded" icon={<PlusOutlined />}>
              Make Payment
            </Button>
          </div>
            <div class="p-5">
            <Form layout="vertical" onFinish={createTransaction}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Payment Type:" rules={rules} name="Type">
                    <Select
                    onChange={handlePaymentTypeChange}
                    options={[
                        "Salary Payment",
                       
                      ].map((status) => ({
                        value: status,
                        label: status,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Beneficiary:" name="Name" rules={rules}>
                    <Select
                    disabled ={!paymentType || paymentType != "Salary Payment"}
                    onChange ={handleEmployeeChange} 
                    options={
                        transaction.map((info)=>({
                          value: info.id , 
                          label : info.employee.fullname
                        }))
                     }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                <Form.Item label="Caliber">
                    <Input value={selectedEmployee ? transaction.find((e) => e.id === selectedEmployee)?.caliber_level.toUpperCase():""} disabled/>
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label="Total Amount:" name="salaryAmount" 
                  rules={rules} >
                  
                    <InputNumber  
                    addonBefore="Rs"
                    onChange={(value)=>setSalaryAmount(value)}
                    />
                  </Form.Item>
                </Col>
                <Row gutter={16}>
                </Row>
              </Row>
                <Form.Item label="Description:" >
                <Input.TextArea 
                onChange={(e) => setSalaryDescription(e.target.value)}
                />
              </Form.Item>
              <div class="flex flex-row justify-end space-x-3">
              <Button htmlType="submit" className = "text-white bg-sky-900 hover:bg-sky-700 rounded">
                Book Payment
              </Button>
              <Button className = "text-white bg-red-900 hover:bg-red-700 rounded" onClick={handleDiscard}>
                Discard
              </Button>
            </div>
            </Form>
            </div>
        </div>
      </TabPane>
    )
  },
  {
    key:"2",
    label:"Refund Payment",
    children:(
      <TabPane tab="Refund Payment" key="2">

      </TabPane>
    )
  }
]



  return (
    <div className="w-screen mt-8 ">
      {loading && <Spinner />}
      <div className="flex flex-col mt-2 py-3 px-4 ">
        <div className="flex flex-row w-full items-center mt-3 justify-between p-3">
          <h1 className="text-xl font-bold">Add Transaction</h1>
          <Breadcrumb items={[
              {
                href:"/admin-dashboard",
                title:<HomeOutlined />
              },
              {
                title:"Transactions"
              },
              {
                href:"/create-transaction",
                title:"Add Transaction"
              }
              ]}/>
        </div>
        <div className="bg-white p-2 rounded shadow-xl">
        <Tabs>{TabList.map((tab)=>tab.children)}</Tabs>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default CreateTransaction;
