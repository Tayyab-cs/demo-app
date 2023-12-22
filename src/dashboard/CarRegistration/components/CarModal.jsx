import React from "react";
import { Card, Modal } from "antd";

const CarModal = ({ carModalOpen, setCarModalOpen, viewData }) => {
  const { items: carsData } = viewData.carDetail;

  return (
    <Modal
      title="Add User"
      open={carModalOpen}
      onCancel={() => setCarModalOpen(false)}
      footer={null}
    >
      {carsData.map((car, index) => (
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
