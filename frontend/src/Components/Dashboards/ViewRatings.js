import React, {useState , useEffect} from "react";
import {
  Card,
  Button,
  Modal,
  Table,
  Space,
  Rate,
  Select,
  Input,
  Breadcrumb
} from "antd";
import { SearchOutlined , EyeOutlined , HomeOutlined } from "@ant-design/icons";
import Spinner from "../../Pages/ProfileSettings/Spinner";

const RatingText = ({ rating  }) => {
  const getRatingText = (input) => {
    const ratingValue = parseFloat(input);

    switch (true) {
      case ratingValue >= 1 && ratingValue < 2:
        return 'Terrible';
      case ratingValue >= 2 && ratingValue < 3:
        return 'Bad';
      case ratingValue >= 3 && ratingValue < 4:
        return 'Average';
      case ratingValue >= 4 && ratingValue < 5:
        return 'Good';
      case ratingValue === 5:
        return 'Perfectionist';
      default:
        return 'Unknown Rating';
    }
  };

  const text = getRatingText(rating);

  return <span>{text}</span>;
};

function ViewRatings() {
  const [loading, setLoading] = useState(false);
  const [openModal , setOpenModal] = useState(false)
  const [getAllRating , setGetAllRating] = useState([]); 
  const [singleRating , setSingleRating] = useState({
    fullname : "",
    profilepic : "",
    email :  "",
    ratings : "",
    created_date : "",
    comments : "",
    contact : "",
  });
  
  const handleModalClick=(id)=>{
    setOpenModal(true);
    fetchSingleRating(id);
  }

  useEffect(()=>{
    const allRatings = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/allratings/");
        const data = await response.json();
        setGetAllRating(data);
      } 
      catch (error) {
        console.log(error);
      }finally{
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      }
    }

    allRatings()
  },[])

  const fetchSingleRating = async (id) => {
    try {
      
      const response = await fetch(`http://127.0.0.1:8000/singleratings/${id}`)
      const data = await response.json();
      setSingleRating(prevState => ({
        ...prevState,
        fullname: data.employee.fullname,
        email: data.employee.email,
        profilepic: data.employee.profilepic,
        ratings: data.ratings,
        created_date: data.created_date,
        comments : data.comments ,
        contact : data.employee.contact
      }));
      
      console.log(data.ratings);
    }
    catch(error){
      console.log(error);
    }
  }


  // Displaying the rating text
  const tableColumns = [
    {
      title: "S.N",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "From (Client)",
      dataIndex: "client_name",
      key: "client_name",
    },
    {
      title: "To (Employee)",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "Rating",
      dataIndex: "emp_rating",
      key: "emp_rating",
    },
    {
      title: "Action",
      dataIndes: "action",
      key: "action",
      render : (_,record)=>(
        <Space>
          <Button  size="smed"
            icon={<EyeOutlined style={{ fontSize: "13px" }} />}
            onClick={() => handleModalClick(record.key)}
            >
            
          </Button>
          <Modal 
          open={openModal}
          onCancel={() => setOpenModal(false)}
          footer={null}
          centered
          >
            <div class="flex flex-col rounded border p-4">
              <div class="flex flex-row p-2 space-x-2 items-center">
                <img class="w-16 h-16 object-cover rounded-full mr-3" src={singleRating.profilepic}></img>
                <div class="flex flex-col">
                <h1 class="text-lg font-bold">{singleRating.fullname}</h1>
                <h1 class="text-gray-400 text-xs">{singleRating.email}</h1>
                <h1 class="text-gray-400 text-xs">{singleRating.contact}</h1>
                </div>
              </div>
              <div class="flex flex-row mt-5 items-center">
                <Rate value={parseFloat(singleRating.ratings)} disabled ></Rate>
                <h1 class="text-gray-400 text-xs p-2">{new Date(singleRating.created_date).toLocaleString()}</h1>
              </div>
              <div class="mt-3">
                <p>{singleRating.comments}</p>
              </div>
            </div>
          </Modal>
        </Space>
      )
    },
  ];

  const tableData = getAllRating.map((info , index) => ({
    sn:index+1,
    key:info.id,
    client_name: info.client.fullname, 
    employee_name : info.employee.fullname , 
    emp_rating : <RatingText rating={info.ratings} />,
  }))
  return (
    <div className="w-screen mt-8">
      {loading && <Spinner />}
      <div className="flex flex-col mt-5 p-6">  
        <div className="flex flex-row justify-between items-center w-full p-3">
          <h1 className="text-xl font-bold">Ratings</h1>
          <Breadcrumb items={[
              {
                href:"/admin-dashboard",
                title:<HomeOutlined />
              },
              {
                title:"Ratings and Services",
              },
              {
                href:"/ratings",
                title:"Ratings-Reviews"
              }
              ]}/>
        </div>
        <div class="grid grid-row">
          <Card>
            <Table columns={tableColumns} dataSource={tableData} pagination={{
                  pageSize: 15,
                  showTotal: (total) => `Total ${total} items`,
                }}>

                </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ViewRatings;
