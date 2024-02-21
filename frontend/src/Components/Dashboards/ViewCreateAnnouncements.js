import React, { useState, useEffect , useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  message,
  Modal,
  Form,
  Input,
  Space,
  Divider,
  Popconfirm,
  Breadcrumb
} from "antd";
import {HomeOutlined, EyeOutlined, EditOutlined, DeleteOutlined , PlusOutlined , SearchOutlined } from "@ant-design/icons";
import DashboardFooter from "./DashboardFooter";
import Spinner from "../../Pages/ProfileSettings/Spinner";
function ViewCreateAnnouncements() {
  const rules = [
    {
      required: true,
      message: "required",
    },
  ];
  const [loading, setLoading] = useState(false);
  const [getAnnouncement, setGetAnnouncement] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementDescription, setAnnouncementDescription] = useState("");
  const [singleAnnouncement, setSingleAnnouncement] = useState([]);
  const [changedDescription, setChangedDescription] = useState("");
  const [searchQuery , setSearchQuery] = useState("");
  const [userInput , setUserInput] = useState(false);
  const originalAnnouncementDetails = useRef([]);
  const navigate = useNavigate();
  const localdata = localStorage.getItem("userData");
  const userType = JSON.parse(localdata);
  const setViewAnnouncement = (report) => {
    getSingleAnnouncements(report);
    setOpenModal1(true);
  };

  const setEditAnnouncement = (report) => {
    getSingleAnnouncements(report);
    setOpenModal2(true);
  };

  // getting all the announcements in the table
  useEffect(() => {
    const announcement = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/app/getannouncement/"
        );
        const data = await response.json();
        setGetAnnouncement(data);
        originalAnnouncementDetails.current = data
        setLoading(false);
      } catch (error) {
        message.error(error.message);
      }
    };

    announcement();
  }, []);

  //  Creating announcements

  const createAnnouncement = async () => {
    try {
      setLoading(true);
      const postData = {
        title: announcementTitle,
        description: announcementDescription,
      };
      const response = await fetch(
        "http://127.0.0.1:8000/app/postannouncement/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        }
      );
      setLoading(false);
      if (response.status === 200) {
        const data = await response.json();
        message.success(data.message);
        navigate("/admin-dashboard");
      }
    } catch (error) {
      message.error(message.error);
    }
  };

  //   Getting single announcements
  const getSingleAnnouncements = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8000/app/getannouncement/${id}`
      );
      const data = await response.json();
      setSingleAnnouncement(data);
      setLoading(false);
    } catch (error) {
      message.error(error.message);
    }
  };

  const updateAnnouncements = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/app/updateannouncement/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: changedDescription }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        message.success(data.message);
        navigate("/admin-dashboard");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const deleteAnnouncements = async(id) => {
    try{
        const response = await fetch(`http://127.0.0.1:8000/app/deleteannouncement/${id}`,{
            method: "DELETE"
        })

        if(response.ok){
            const data = await response.json();
            message.success(data.message);
            navigate('/admin-dashboard');
        }
    }catch(error){
        message.error(error.message);
    }
  }

const handleSearchChange =(e) => {
  setSearchQuery(e.target.value);
  setUserInput(true);
}

// handling search filter

useEffect(()=>{
  const applySearchAndFilter = async () => {
    try {
      let newData = [...originalAnnouncementDetails.current];

      if (searchQuery.trim() !== "") {
        newData = newData.filter(
          (item) =>
            item.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) 
          );
      }

      setGetAnnouncement(newData);
    } catch (error) {
      message.error(error.message)
    } 
  };

  if(userInput) {
    applySearchAndFilter();
  }else { 
    setGetAnnouncement([...originalAnnouncementDetails.current]);
    setUserInput(false);
    }
},[searchQuery , userInput]);

  const announcementTable = [
    {
      title: "S.N",
      dataIndex: "sn",
      key: "sn",
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "created_date",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            onClick={() => setViewAnnouncement(record.key)}
            icon={<EyeOutlined style={{ fontSize: "13px" }} />}
          ></Button>
          <Modal
            open={openModal1}
            onCancel={() => setOpenModal1(false)}
            footer={null}
            centered
          >
            <div class="flex flex-col justify-start p-2">
              <h1 class="text-lg font-bold">{singleAnnouncement.title}</h1>
              <h1 class="text-xs mt-2">
                <span class="font-bold">Posted On: </span>
                {new Date(singleAnnouncement.created_date).toLocaleDateString()}
              </h1>
              <div class="space-y-2 mt-5">
                <h1>Dear Users,</h1>
                <h1>{singleAnnouncement.description}</h1>
              </div>

              <div class="space-y-2 mt-5 text-xs">
                <Divider />
                <div class="grid grid-cols-2">
                  <div>
                    <h1>Regards,</h1>
                    <h1>Avalon Hirings</h1>
                    <h1>Budhanilkantha , Kathmandu</h1>
                    <h1>Contact: +977 9815977947</h1>
                  </div>
                  <div class="flex flex-row justify-end items-center">
                    <img
                      class="w-16 h-16"
                      src={require(`../../images/A.png`)}
                    ></img>
                    <h1 class="text-lg">Avalon Hirings</h1>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          {userType.user_type === "Admin" ? (
            <div class="space-x-2">
              <Button
                onClick={() => setEditAnnouncement(record.key)}
                size="small"
                icon={<EditOutlined style={{ fontSize: "13px" }} />}
              ></Button>
              <Popconfirm
                title="Delete This Announcement?"
                placement="topRight"
                okText="Delete"
                okType="default"
                danger
                onConfirm={() => deleteAnnouncements(record.key)}
              >
                <Button
                  size="small"
                  
                  icon={<DeleteOutlined style={{ fontSize: "13px" }} />}
                ></Button>
              </Popconfirm>
            </div>
          ) : null}

          <Modal
            title="Edit Announcement"
            onCancel={() => setOpenModal2(false)}
            open={openModal2}
            footer={null}
            centered
          >
            <Form
              layout="vertical"
              onFinish={() => updateAnnouncements(singleAnnouncement.id)}
            >
              <Form.Item label="Title">
                <Input
                  value={singleAnnouncement.title}
                  defaultValue={singleAnnouncement.title}
                  disabled
                />
              </Form.Item>
              <Form.Item label="Description" name="Description" rules={rules}>
                <Input.TextArea
                  placeholder={singleAnnouncement.description}
                  onChange={(e) => setChangedDescription(e.target.value)}
                />
              </Form.Item>
              <div class="flex space-x-2">
                <Button htmlType="submit" className="text-white bg-sky-900 hover:bg-sky-700">Update</Button>
                <Button className="text-white bg-red-900 hover:bg-red-700" onClick={() => setOpenModal2(false)}>Discard</Button>
              </div>
            </Form>
          </Modal>
        </Space>
      ),
    },
  ];

  const announcementData = getAnnouncement.map((info, index) => ({
    sn: index + 1,
    key: info.id,
    title: info.title,
    created_date: new Date(info.created_date).toLocaleDateString(),
  }));

  return (
    <div class="w-screen mt-8">
      {loading && <Spinner />}
      <div class="flex flex-col mt-2 p-6">
        <div class="flex flex-row justify-between items-center py-3">
          <h1 class="text-xl font-bold">Announcements</h1>
          <Breadcrumb items={[
              {
                href:userType.user_type === "Admin" ? '/admin-dashboard' : userType.user_type === "Client" ? '/client-dashboard' : '/employee-dashboard',
                title:<HomeOutlined />
              },
              {
                href:userType.user_type === "Admin" ? '/announcements' : userType.user_type === "Client" ? '/client-announcement' : '/employee-announcement',
                title:"Announcements"
              }
              ]}/>
        </div>
        
        <div class="grid p-3 mt-2 bg-white rounded shadow-xl shadow-gray-350">
          <div className="grid grid-cols-2 p-2">

        <div class="flex flex-row justify-start w-60">
          <Input 
            prefix={<SearchOutlined />}
            width ={50}
            placeholder="Search Title"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          </div>
          <div className="flex flex-row justify-end">

          {userType.user_type === "Admin" ? (<div><Button icon={<PlusOutlined/>} className="bg-sky-900 text-white hover:bg-sky-700 rounded" onClick={() => setOpenModal(true)}>
                  Create Announcement
                </Button></div>) : null}
          </div>
            
        
          </div>
          <div class="flex flex-row justify-end p-2 items-center">
            {userType.user_type === "Admin" ? (
              <div>
                <Modal
                  title="Create Announcement"
                  open={openModal}
                  centered
                  onCancel={() => setOpenModal(false)}
                  footer={null}
                >
                  <Form layout="vertical" onFinish={createAnnouncement}>
                    <Form.Item label="Title" name="Title" rules={rules}>
                      <Input
                        onChange={(e) => setAnnouncementTitle(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Description"
                      name="Description"
                      rules={rules}
                    >
                      <Input.TextArea
                        onChange={(e) =>
                          setAnnouncementDescription(e.target.value)
                        }
                      />
                    </Form.Item>
                    <div class="flex space-x-2">
                      <Button htmlType="submit">Submit</Button>
                      <Button onClick={() => setOpenModal(false)}>
                        Discard
                      </Button>
                    </div>
                  </Form>
                </Modal>
              </div>
            ) : null}
          </div>
          <div class="m-1">
            <Table
              columns={announcementTable}
              dataSource={announcementData}
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

export default ViewCreateAnnouncements;
