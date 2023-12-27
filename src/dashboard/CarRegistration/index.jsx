import React, { useState } from "react";
import { Button, Flex, Table, Typography } from "antd";
import AddUser from "./components/AddUser";
import CarModal from "./components/CarModal.jsx";
import useCarData from "../../hooks/customHooks.js";

const { Title } = Typography;

const CarRegistration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [columns, action, setAction] = useCarData(dataSource, setDataSource);

  const resetAction = () => {
    setAction({ actionType: null, carData: null });
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
      <Table dataSource={dataSource} columns={columns} bordered />
      {isModalOpen && (
        <AddUser
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          dataSource={dataSource}
          setDataSource={setDataSource}
        />
      )}

      <CarModal
        showModal={action.actionType === "CAR_INFO"}
        resetAction={resetAction}
        carData={action.carData}
      />
    </div>
  );
};

export default CarRegistration;
