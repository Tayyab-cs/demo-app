import React, { useState } from "react";
import { Button, Flex, Table, Typography } from "antd";
import AddUser from "./AddUser.jsx";
import CarModal from "./CarModal.jsx";

const { Title } = Typography;

export default function UserDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carModalOpen, setCarModalOpen] = useState(false);
  const [viewData, setViewData] = useState({});
  const [dataSource, setDataSource] = useState([]);

  // Delete User
  const deleteUser = (record) => {
    const updatedDataSource = dataSource.filter(
      (item) => item.id !== record.id
    );
    setDataSource(updatedDataSource);
  };

  // Table Columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Car Info",
      dataIndex: "car_info",
      key: "car_info",
      align: "center",
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => {
            setCarModalOpen(true);
            setViewData(record);
          }}
        >
          View Data
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Button type="link" danger onClick={() => deleteUser(record)}>
          Delete User
        </Button>
      ),
    },
  ];

  return (
    <div style={{ margin: "30px" }}>
      <Flex justify="space-between" align="center">
        <Title level={3}>User Details</Title>
        <Button
          type="primary"
          size="large"
          onClick={() => setIsModalOpen(true)}
        >
          Add New User
        </Button>
      </Flex>
      <Table dataSource={dataSource} columns={columns} bordered />
      {isModalOpen && (
        <AddUser
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          dataSource={dataSource}
          setDataSource={setDataSource}
        />
      )}
      {carModalOpen && (
        <CarModal
          carModalOpen={carModalOpen}
          setCarModalOpen={setCarModalOpen}
          viewData={viewData}
        />
      )}
    </div>
  );
}
