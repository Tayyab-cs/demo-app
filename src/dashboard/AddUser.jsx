import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form, Modal, Button, message, Steps, theme } from "antd";
import UserInfo from "./UserInfo.jsx";
import CarDetails from "./CarDetails.jsx";
import ResultComponent from "./ResultComponent.jsx";

export default function AddUser({
  isModalOpen,
  setIsModalOpen,
  dataSource,
  setDataSource,
}) {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [result, setResult] = useState({});

  const steps = [
    {
      title: "User Info",
      content: <UserInfo form={form} />,
    },
    {
      title: "Car Details",
      content: <CarDetails form={form} />,
    },
    {
      title: "Finish",
      content: <ResultComponent result={result} setResult={setResult} />,
    },
  ];

  // Saving data
  const saveData = (data) => {
    try {
      let id = uuidv4();
      setDataSource([
        ...dataSource,
        {
          id,
          name: userInfo.name,
          email: userInfo.email,
          carDetail: data,
        },
      ]);
      setResult({
        status: "success",
        title: "Congratulations!",
        subTitle: "You have successfully registered a new user in to system",
      });
    } catch (error) {
      setResult({
        status: "error",
        title: "Error!",
        subTitle:
          "Sorry, we are unable to process your request. Please try again.",
      });
    }
  };

  // Handling Actions
  const next = async () => {
    try {
      await form.validateFields();

      if (current === 0) {
        setUserInfo(form.getFieldsValue());
      } else if (current === 1) {
        const carData = form.getFieldsValue();
        saveData(carData);
      } else {
        message.success("User Added Successfully!");
        setIsModalOpen(false);
      }

      setCurrent(current + 1);
    } catch (error) {
      console.error("Validation Error: ", error);
    }
  };

  // Mapping Step items
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  // Styling Steps Content
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <Modal
      title="Add User"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(false);
              setResult([]);
            }}
          >
            Done
          </Button>
        )}
      </div>
    </Modal>
  );
}
