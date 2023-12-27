import React from "react";
import { Card, Modal } from "antd";

const CarModal = ({ showModal, resetAction, carData }) => {
  const items = carData ? carData.carDetail.items : [];

  return (
    <Modal
      title="Add User"
      open={showModal}
      onCancel={resetAction}
      footer={null}
    >
      {items.map((car, index) => (
        <Card
          title={car.name}
          key={car.name + index}
          bordered={false}
          style={{
            width: 300,
            margin: "10px",
            backgroundColor: "mintcream",
          }}
        >
          <p>{car.model}</p>
          <p>{car.color}</p>
          <p>{car.price}</p>
        </Card>
      ))}
    </Modal>
  );
};

export default CarModal;
