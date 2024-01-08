import React, {useState , useEffect} from "react";
import {
  Card,
  Button,
  Modal,
  Table,
  Space,
  Rate,
  Input
} from "antd";
import { EyeOutlined } from "@ant-design/icons";


const RatingText = ({ rating }) => {
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
        const response = await fetch("http://127.0.0.1:8000/allratings/");
        const data = await response.json();
        setGetAllRating(data);
      } 
      catch (error) {
        console.log(error);
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
      title: "Employee Name",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "Client Name",
      dataIndex: "client_name",
      key: "client_name",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Action",
      dataIndes: "action",
      key: "action",
      render : (_,record)=>(
        <Space>
          <Button  size="small"
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
    rating : <RatingText rating={info.ratings} />,
  }))
  return (
    <div className="w-screen mt-10">
      <div className="flex flex-col mt-5 p-6">  
        <div className="flex w-full bg-white  rounded shadow p-3">
          <h1 className="text-xl font-bold">All Ratings / Reviews</h1>
        </div>
        <div class="grid grid-row mt-4">
          <Card>
            <Table columns={tableColumns} dataSource={tableData} pagination={{
                  pageSize: 15,
                  showTotal: (total) => `Total ${total} items`,
                }}></Table>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ViewRatings;
