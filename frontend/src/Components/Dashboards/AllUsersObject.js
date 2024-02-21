import React, { useState, useEffect , useRef} from "react";
import {
  Space,
  Table,
  Tag,
  Button,
  Popconfirm,
  Modal,
  Descriptions,
  Select,
  Form,
  Divider,
  message,
  Input,
  Breadcrumb,
  Card,
  DatePicker,
} from "antd";
import { Link } from "react-router-dom";
import {
  EyeOutlined,
  SearchOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  PlusOutlined ,
  DownloadOutlined
} from "@ant-design/icons";
import DashboardFooter from "./DashboardFooter";
import Spinner from "../../Pages/ProfileSettings/Spinner";
import { formatDistanceToNow } from "date-fns";

function AllUsersObject() {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModal1 , setOpenModal1] = useState(false);
  const [singleUser, setSingleUser] = useState([]);
  const [searchQuery , setSearchQuery] = useState('');
  const [userInput , setUserInput] = useState(false);
  const onSearchChange = useRef([])
  

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
    setUserInput(true);
}

  useEffect(() => {
    const displayUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/app/allusers/");
        const data = await response.json();
        setAllUsers(data.slice(1));
        setLoading(false);
        onSearchChange.current = data.slice(1); ;
      } catch (error) {
        message.error("Failed To Fetch User Data");
      }
    };
    displayUsers();
  }, []);

  const handleSingleUser = (id) => {
    setOpenModal(true);
    getSingleUser(id);
  };


  const getSingleUser = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/app/allusers/${id}`);
      const data = await response.json();
      setSingleUser(data);
      setLoading(false);
    } catch (error) {
      message.error(error.message);
    }
  };


  // Handling search 

  useEffect(() => {
    const filterData = async () => {
        try{
            setLoading(true);
            let newData = [...onSearchChange.current]
  
            if(searchQuery.trim() !== ""){
                newData = newData.filter((item)=>
                item.fullname.toLowerCase().includes(searchQuery.toLowerCase())||
                item.user_type.toLowerCase().includes(searchQuery.toLowerCase())
                )
            }
            setAllUsers(newData);
            setLoading(false)
        }catch(error){
            message.error('Failed To Load Data');
        }
    };
  
    if(userInput){
      filterData();
    }else{
      setAllUsers([...onSearchChange.current])
      setUserInput(false);
    }
  },[userInput , searchQuery])

  const tableColumns = [
    {
      title: "S.N",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (_, record) => {
        return (
          <div className="flex flex-row items-center space-x-2">
            <img
              className="rounded-full w-8 h-8 object-cover"
              src={`http://127.0.0.1:8000${record.fullname.profilepic}`}
              alt="Profile Picture"
            />
            <span>{record.fullname.fullname}</span>
          </div>
        );
      },
    },
    {
      title: "User Type",
      dataIndex: "usertype",
      key: "usertype",
      filterMultiple: false,
      filters: [
        { text: "Client", value: "Client" },
        { text: "Employee", value: "Employee" },
      ],
      filterDropdown:({setSelectedKeys , selectedKeys , confirm}) => (
        <div class="flex flex-col space-y-2" style={{ padding: 8 }}>
          <Select
            mode="multiple"
            style={{ width: 200 }}
            placeholder="Select Status"
            onChange={(value) => setSelectedKeys(value || [])}
            onDeselect={confirm}
            value={selectedKeys}
            options={["Client", "Employee"].map((status) => ({
              value: status,
              label: status,
            }))}
          />
          <Button
            type="default"
            onClick={confirm}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
        </div>
      ),
      onFilter : (value , record) => record.usertype.includes(value),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Last Login",
      dataIndex: "last_login",
      key: "last_login",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "action",
      render: (_, record) => {
        return (
          <div>
            <Button
              onClick={() => handleSingleUser(record.key)}
              size="small"
              icon={<EyeOutlined style={{ fontSize: "13px" }} />}
            ></Button>
            <Modal
              open={openModal}
              onCancel={() => setOpenModal(false)}
              centered
              footer={null}
            >
              <Card>
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between">
                    <div>
                      <h1 className="underline">{singleUser.user_type}</h1>
                      <h1 className="text-gray-400 text-xs">
                        Last Login:{" "}
                        {singleUser.last_login ? formatDistanceToNow(new Date(singleUser.last_login)) : "N/A"}
                      </h1>
                    </div>
                    <div>
                      <Link to="/admin-payment">
                        <Button
                          size="small"
                          className="rounded bg-sky-900 hover:bg-sky-700 text-white text-sm"
                          icon={
                            <MoneyCollectOutlined
                              style={{ fontSize: "13px" }}
                            />
                          }
                        >
                          Transaction Details
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <img
                      className="w-20 h-20 object-cover rounded-full"
                      src={`http://127.0.0.1:8000${singleUser.profilepic}`}
                      alt="User Profile"
                    ></img>
                    <h1 className="text-lg font-bold">{singleUser.fullname}</h1>
                    <h1 className="text-gray-400">{singleUser.email}</h1>
                    <Divider />
                  </div>
                  <Form layout="vertical">
                    <Form.Item label="Full Name">
                      <Input value={singleUser.fullname} />
                    </Form.Item>

                    <Form.Item label="User Name">
                      <Input value={singleUser.username}></Input>
                    </Form.Item>

                    <Form.Item label="Date of Birth">
                      <Input value={singleUser.date_of_birth} />
                    </Form.Item>

                    <Form.Item label="Contact Number">
                      <Input value={singleUser.contact} />
                    </Form.Item>

                      <Form.Item label="Documents">
                      <div className="flex flex-row space-x-2 justify-between">
                        <Button onClick={()=>setOpenModal1(true)} className="text-white bg-sky-900" icon={<EyeOutlined style={{fontSize:"13px"}}/>}> 
                          Citizenship
                        </Button>
                          
                          <Modal
                          title="Citizenship:"
                          open={openModal1}
                          onCancel={() => setOpenModal1(false)}
                          centered
                          footer={null}
                          >
                            <div className="flex flex-col p-2 items-center">
                              <img className="w-15 h-15" src={`http://localhost:8000${singleUser.citizenship_front}`}></img>
                              <img src={`http://localhost:8000${singleUser.citizenship_back}`}></img>
                            </div>
                          </Modal>


                        <a href={`http://localhost:8000${singleUser.work_cv}`} download="WorkExperience.pdf" target="_blank" rel="noopener noreferrer">
                        <Button icon={<DownloadOutlined style={{fontSize:"13px"}}/>} className="text-white bg-sky-900" disabled={singleUser.user_type === "Client"}>
                          Work Experience
                        </Button>

                        </a>
                    </div>
                      </Form.Item>

                  </Form>
                </div>
              </Card>
            </Modal>
          </div>
        );
      },
    },
  ];
  const tableData = allUsers.map((info, index) => ({
    sn: allUsers.length - index,
    key: info.id,
    fullname: {
      profilepic: info.profilepic,
      fullname: info.fullname,
    },
    usertype: info.user_type,
    email: info.email,
    phone: info.contact,
    last_login: info.last_login ? formatDistanceToNow(new Date(info.last_login)) : "N/A",
    addSuffix: true,
  })).reverse();
  return (
    <div class="w-screen mt-8">
      {loading && <Spinner />}
      <div class="flex flex-col mt-2 p-6">
        <div className="flex flex-row justify-between items-center w-full p-3">
          <h1 className="text-xl font-bold">All Users</h1>
          <Breadcrumb
            items={[
              {
                href: "/admin-dashboard",
                title: <HomeOutlined />,
              },
              {
                title: "Users & Requests",
              },
              {
                href: "/all-users",
                title: "All Users",
              },
            ]}
          />
        </div>

        <div class="flex flex-col">
          <div className="w-full">
            <Card>
              <div className="flex flex-row justify-between items-center">
                <Input
                  className="w-60"
                  prefix={<SearchOutlined />}
                  placeholder="Search"
                  value = {searchQuery}
                  onChange = {handleSearchQuery}
                />

                <Link to="/add-user"><Button className="text-white bg-sky-900 hover:bg-sky-700 rounded" icon={<PlusOutlined />}>Add User</Button>
</Link>
              </div>
              <div className="py-2">
                <Table
                  loading={loading}
                  columns={tableColumns}
                  dataSource={tableData}
                  pagination={{
                    pageSize: 10,
                    showTotal: (total) => `Total ${total} items`,
                  }}
                ></Table>
              </div>
            </Card>
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default AllUsersObject;
