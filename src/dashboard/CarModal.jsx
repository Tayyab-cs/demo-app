import React from "react";
import { Card, Modal } from "antd";

export default function CarModal({ carModalOpen, setCarModalOpen, viewData }) {
  const carsData = viewData.carDetail.items;

  return (
    <Modal
      title="Add User"
      open={carModalOpen}
      onCancel={() => setCarModalOpen(false)}
      footer={null}
    >
      {carsData.map((car, index) => {
        return (
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
        );
      })}
    </Modal>
  );
}
