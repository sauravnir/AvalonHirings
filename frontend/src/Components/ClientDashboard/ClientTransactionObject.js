import React, {useState , useEffect , useRef} from 'react'
import { Table , Button , message , Input , Breadcrumb , Card} from "antd";
import {SearchOutlined , HomeOutlined} from "@ant-design/icons";
import Spinner from '../../Pages/ProfileSettings/Spinner';
import DashboardFooter from '../Dashboards/DashboardFooter';
function ClientTransactionObject() {
const [loading , setLoading] = useState(false);
const [searchQuery , setSearchQuery] = useState('');
const [userInput , setUserInput] = useState(false);
const localdata= localStorage.getItem("userData");
const userType = JSON.parse(localdata);
const onSearchChange = useRef([])

const [data , setData ] = useState([])

const [amount , setAmount] = useState();
// handling search query 

const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
    setUserInput(true);
}

useEffect(() => {
    const filterData = async () => {
        try{
            setLoading(true);
            let newData = [...onSearchChange.current]

            if(searchQuery.trim() !== ""){
                newData = newData.filter((item)=>
                item.service_use.services.servicename.toLowerCase().includes(searchQuery.toLowerCase())
                )
            }
            setData(newData);
            setLoading(false)
        }catch(error){
            message.error('Failed To Load Data');
        }
    };

    if(userInput){
        filterData();
    }else{
        setData([...onSearchChange.current])
        setUserInput(false);
    }
},[userInput , searchQuery])

useEffect(()=>{
    const getClientData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/clienttransaction/${userType.user_id}`)
            const data = await response.json();
            setData(data);
            onSearchChange.current = data;

            const totalAmount= data.reduce((acc , item) => {
              const amount = parseFloat(item.amount);
              if(!isNaN(amount)){
                return acc + amount;
              }
              return acc; 
            }, 0);
            setAmount(totalAmount);
            setLoading(false);
        }catch (error){
            message.error(error.message);
        }finally{
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setLoading(false);
    }
}
    getClientData()
},[])



const clientContents = [
    {
        title:"S.N",
        dataIndex:"sn",
        key:"sn"
    },
     {
       title:"Service Name",
       dataIndex:"service_name",
       key:"service_name"
     },
      {
        title: "Amount",
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
]


const tableData = data.map((info, index) =>({
    sn : index+1 ,
    key : info.id , 
    service_name : info.service_use?.services?.servicename,
    payment_amount :`Rs.${info.amount}`  ,
    payment_method : info.payment_method , 
    date : info.payment_date
}))

  return (
    <div class="w-screen mt-8">
        {loading && <Spinner />}
        <div class="flex flex-col mt-2 p-6">
        <div class="flex flex-row justify-between items-center py-3">
          <h1 class=" text-xl  font-bold">All Transactions</h1>
          <Breadcrumb 
          items = {[{
            href : '/client-dashboard',
            title:<HomeOutlined />
          },
          {
            href:'client-transaction',
            title:'Transaction'
          }
        ]}
          />
        </div>

          
        <div class="flex flex-col p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
          
            <Card>
            <div class="flex flex-row justify-start p-2">
              <Input className='w-60' prefix={<SearchOutlined />} value = {searchQuery} onChange={handleSearchQuery} placeholder='Search Service Names'/>
               
          </div>
          <Table columns={clientContents} dataSource={tableData} pagination={{
                pageSize:10,
                showTotal:(total) => `Total ${total} items`
            }}></Table>

            <div className="flex flex-row justify-center">
              <h1 className="font-bold text-gray-700 text-sm">Total Paid:<span className="text-green-700">Rs.{amount}</span></h1>
            </div>
            </Card>
          
        </div>
            <DashboardFooter />
        </div>
    </div>
  )
}

export default ClientTransactionObject