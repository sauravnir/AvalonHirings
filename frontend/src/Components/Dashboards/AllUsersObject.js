import React, { useState, useEffect } from "react";
import {
  Space,
  Table,
  Tag,
  Button,
  Popconfirm,
  Modal,
  Descriptions,
  Select,
  Divider,
  message,
  Input,
  Breadcrumb,
  Card,
} from "antd";
import {
EyeOutlined,
  CheckOutlined,
  DeleteOutlined,
  SearchOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import DashboardFooter from "./DashboardFooter";
import Spinner from "../../Pages/ProfileSettings/Spinner";
import { formatDistanceToNow } from "date-fns";
import Search from "antd/es/input/Search";



function AllUsersObject() {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [openModal , setOpenModal] = useState(false);


  useEffect(() => {
    const displayUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/app/allusers/");
        const data = await response.json();
        setAllUsers(data.slice(1));
        setLoading(false);
      } catch (error) {
        message.error("Failed To Fetch User Data");
      }
    };
    displayUsers();
  }, []);

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
      render:(record) =>{
        return (
            <div>
                <Button onClick={()=>setOpenModal(true)} size="small" icon={<EyeOutlined style={{fontSize:"13px"}}/>}></Button>
                <Modal
                open={openModal}
                onCancel={()=>setOpenModal(false)}
                >
                </Modal>
            </div>
        )
      }
    },
  ];

  const tableData = allUsers.map((info, index) => ({
    sn: index + 1,
    key: info.id,
    fullname: {
      profilepic: info.profilepic,
      fullname: info.fullname,
    },
    usertype: info.user_type,
    email: info.email,
    phone: info.contact,
    last_login: formatDistanceToNow(new Date(info.last_login), {
      addSuffix: true,
    }),
  }));
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
                title:"Users & Requests"
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
                />
              </div>
              <div className="py-2">
                <Table columns={tableColumns} dataSource={tableData} pagination={{
                    pageSize : 10 , 
                    showTotal : (total) => `Total ${total} items`
                }}></Table>
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
