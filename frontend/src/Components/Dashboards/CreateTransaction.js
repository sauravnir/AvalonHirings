import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Select,
  Button,
  InputNumber,
  message,
  Breadcrumb,
  Tooltip,
  Modal
} from "antd";
import { HomeOutlined , QuestionOutlined} from "@ant-design/icons";
import Spinner from "../../Pages/ProfileSettings/Spinner";
import DashboardFooter from "./DashboardFooter";
function CreateTransaction() {
  const rules = [
    {
      required: true,
      message: "required",
    },
  ];
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [paymentType, setPaymentType] = useState(null);
  const navigate = useNavigate();
  const [openModal , setOpenModal] = useState(false);
  // Creating Salary transaction
  const [salaryAmount, setSalaryAmount] = useState("");
  const [salaryDescription, setSalaryDescription] = useState("");
  const [caliberId, setCaliberId] = useState();
  const [payableAmount , setPayableAmount] = useState(0);
  const [employeeName, setEmployeeName] = useState("");
  useEffect(() => {
    const getPaymentData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/salaryfield/");
        const data = await response.json();
        setTransaction(data);
        setLoading(false);
      } catch (error) {
        message.error(error); 
      }
    };
    getPaymentData();
  }, []);

  const handlePaymentTypeChange = (value) => {
    setPaymentType(value);
   
  };

  const handleEmployeeChange = async (value , option) => {
    setEmployeeName(option.label);
    const selectedEmployeeData = transaction.find((e) => e.id === value);
    const caliber = selectedEmployeeData ? selectedEmployeeData.id : null;
    setCaliberId(caliber);
    try { 
      const response = await fetch(`http://127.0.0.1:8000/fetchamount/${caliber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPayableAmount(data.total_payable); 
    } catch(e){
      message.error("Failed To Fetch Amount");
    }
  };
  


// Handling discard
  const handleDiscard = () => {
    setLoading(true);
    navigate("/admin-dashboard");
    setLoading(false);
  };



  // Overall Transaction the booked salary
  const createTransaction = async () => {
    try {
      setLoading(true); 
      if(salaryAmount !== "" && salaryDescription !== "" && caliberId !== null && paymentType !== null ) {
        const response = await fetch("http://127.0.0.1:8000/givesalary/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: salaryAmount,
          description: salaryDescription,
          caliber: caliberId,
          payment_type : paymentType,
        }),
      });
      
      const data = await response.json();
      if (response.ok) {
        
        message.success(data.message);
        navigate('/admin-dashboard');
      }
    }else {
      message.error("Transaction Failed! Try again.")
      }
      setLoading(false);
    } catch (error) {
      message.error("Transaction Failed!");
    }
  };


  return (
    <div className="w-screen mt-8 ">
      {loading && <Spinner />}
      <div className="flex flex-col mt-2 py-3 px-4 ">
        <div className="flex flex-row w-full items-center mt-3 justify-between p-3">
          <h1 className="text-xl font-bold">Add Transaction</h1>
          <Breadcrumb
            items={[
              {
                href: "/admin-dashboard",
                title: <HomeOutlined />,
              },
              {
                title: "Transactions",
              },
              {
                href: "/create-transaction",
                title: "Add Transaction",
              },
            ]}
          />
        </div>
        <div className="bg-white p-2 rounded shadow-xl">
          <div className="p-3 bg-white rounded ">
            <div class="p-5">
              <Form layout="vertical" onFinish={createTransaction}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Payment Type:" rules={rules} name="Type">
                      <Select
                        onChange={handlePaymentTypeChange}
                        options={["Salary Booking", "Salary Payment"].map(
                          (status) => ({
                            value: status,
                            label: status,
                          })
                        )}
              
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Beneficiary:" name="Name" rules={rules}>
                      <Select
                        disabled={
                          !paymentType
                        }
                        onChange={handleEmployeeChange}
                        options={transaction.map((info) => ({
                          value: info.id,
                          label: info.employee.fullname,
                        }))}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                     <div className="p-2">
                      
                      {paymentType === "Salary Payment" ?
                        <h1>Total Payable Amount: <Tooltip title="Amount Booked - Amount Paid" ><Button className="rounded-full" size="small" icon={<QuestionOutlined />}></Button></Tooltip>{payableAmount < 0 ? <h1 className="text-red-500">Rs {payableAmount}</h1> : <h1 className="text-green-500">Rs.{payableAmount}</h1>}</h1>
                        : null 
                      } 
                      </div>
                    <Form.Item
                      label="Total Amount:"
                      name="salaryAmount"
                      rules={rules}
                    >
                      <InputNumber
                        className="w-full"
                        addonBefore="Rs."
                        onChange={(value) => setSalaryAmount(value)}
                        disabled={!paymentType}  
                      />
                      
                    </Form.Item>
                  </Col>
                  <Row gutter={16}></Row>
                </Row>
                <Form.Item label="Description:" name="description" rules={rules}>
                  <Input.TextArea
                    onChange={(e) => setSalaryDescription(e.target.value)}
                    disabled={!paymentType}
                  />
                </Form.Item>
                <div class="flex flex-row justify-end space-x-3">
                 
                  <Button   
                    className="text-white bg-sky-900 hover:bg-sky-700 rounded"
                    onClick={()=>setOpenModal(true)}
                  >
                    {paymentType === "Salary Payment" ? "Make Payment" : "Make Booking"}
                  </Button>

                  <Modal
                  title="Are you sure?"
                  centered 
                  open={openModal}
                  okText=  {paymentType === "Salary Payment" ? "Make Payment" : "Make Booking"}
                  onOk={createTransaction}
                  onCancel={()=>setOpenModal(false)}
                  okType="default"
                  footer={<div className="flex flex-row justify-center space-x-2"><Button onClick={createTransaction} className="text-white bg-sky-900 hover:bg-sky-700 rounded">Submit</Button>
                  <Button className="text-white bg-red-900 hover:bg-red-700 rounded" onClick={() => setOpenModal(false)}>Discard</Button>
                  </div>}
                  width={400}
                  >
                    <Card>
                      <div>
                        <h1>Beneficiary Name: <span className="font-bold">{employeeName}</span></h1>
                        <h1>Amount: <span className="font-bold">Rs.{salaryAmount}</span></h1>
                        <h1>Action: <span className="font-bold">{paymentType}</span></h1>
                      </div>
                    </Card>
                  </Modal>

                  <Button
                    className="text-white bg-red-900 hover:bg-red-700 rounded"
                    onClick={handleDiscard}
                  >
                    Discard
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {/* <DashboardFooter /> */}
    </div>
  );
}

export default CreateTransaction;
