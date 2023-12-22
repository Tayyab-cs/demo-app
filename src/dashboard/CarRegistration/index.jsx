import React, { useState } from "react";
import { Button, Flex, Table, Typography } from "antd";
import AddUser from "./components/AddUser";
import CarModal from "./components/CarModal.jsx";
import columns from "./columns.js";

const { Title } = Typography;

export const CarRegistration = () => {
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
      <Table
        dataSource={dataSource}
        columns={columns({ setCarModalOpen, setViewData, deleteUser })}
        bordered
      />
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
};
