import React, {useState , useEffect , useRef} from 'react'
import { Table , Button , message } from "antd";
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
            onSearchChange.current = data ;
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
        <div class="flex py-3">
          <h1 class="text-2xl font-bold">All Transactions</h1>
        </div>

        <div class="grid p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
          <div class="flex flex-row justify-end">
            <div>
                <input
                  class="shadow rounded border border-gray-200 w-60 py-2 px-3 text-gray-700 text-sm mb-3 leading-tight invalid:border-red-500  focus:shadow-outline"
                  type="text"
                  value = {searchQuery}
                  onChange = {handleSearchQuery}
                  placeholder="Search for service names"
                  name="SearchBarForPayments"
                />
                
            </div>
          </div>
          <div class="m-1">
            <Table columns={clientContents} dataSource={tableData} pagination={{
                pageSize:10,
                showTotal:(total) => `Total ${total} items`
            }}></Table>
          </div>
        </div>


            <DashboardFooter />
        </div>
    </div>
  )
}

export default ClientTransactionObject