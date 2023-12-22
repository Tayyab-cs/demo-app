import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Flex, Modal, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import RegisterColor from "./RegisterColor.jsx";
import { setCount } from "../../../../store/slices/colorSlice.js";

const { Title } = Typography;

const ColorsCounter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.colors.colorsList);
  const count = useSelector((state) => state.colors.count);

  const countLength = () => {
    const colorsList = colors;
    if (colorsList && Array.isArray(colorsList)) {
      const listLength = colorsList.filter((color) => !color.isDelete).length;
      return count === listLength;
    }
    return false;
  };

  // Modal Methods
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Flex justify="space-between">
      <Card className="card-container" title="Counter" bordered={false}>
        <Space>
          <Button
            className="decrement-btn"
            disabled={count === 0}
            onClick={() => {
              dispatch(setCount(count - 1));
            }}
          >
            -
          </Button>
          <Title className="card-title">{count}</Title>
          <Button
            className="increment-btn"
            disabled={countLength()}
            onClick={() => {
              dispatch(setCount(count + 1));
            }}
          >
            +
          </Button>
        </Space>
      </Card>
      <Button type="primary" onClick={showModal}>
        <PlusOutlined />
        New Color
      </Button>

      <Modal
        title="Create New Color"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <RegisterColor />
      </Modal>
    </Flex>
  );
};

export default ColorsCounter;
