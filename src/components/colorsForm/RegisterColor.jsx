import React, { useState } from "react";
import axios from "axios";
import validateColor from "validate-color";
import { Alert, Button, Form, Input, Typography } from "antd";
import { REGISTER_COLOR_URI } from "../../api/endPoints.js";

const { Title } = Typography;

export default function RegisterColor() {
  const [form] = Form.useForm();
  const [alert, setAlert] = useState(null);

  // Handling form submittion
  const onFinish = async (values) => {
    console.log("Form Finished Triggered");
    let RESPONSE;

    try {
      console.log("Form Values:", values);
      const validColor =
        values && validateColor(values.name) && validateColor(values.hex);
      if (!validColor) {
        setAlert({
          type: "error",
          message: "Invalid color name or hex code",
        });
      } else {
        RESPONSE = await axios.post(REGISTER_COLOR_URI, values);
        console.log(RESPONSE.data);
        if (RESPONSE.status === 200 && RESPONSE.statusText === "OK") {
          setAlert({
            type: "success",
            message: RESPONSE.data.message,
          });
        }
        form.resetFields();
      }
    } catch (error) {
      console.error("Failed to register color: ", error.response.data.message);
      setAlert({
        type: "error",
        message: error.response.data.message,
      });
    }
  };

  return (
    <>
      {alert && (
        <Alert
          message={alert.type === "success" ? "Success" : "Error"}
          description={alert.message}
          type={alert.type}
          showIcon
          closable
          onClose={() => setAlert(null)}
          style={{ marginBottom: "20px" }}
          banner
        />
      )}
      <Form
        name="basic"
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Title>COLORS</Title>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Color name is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Hex"
          name="hex"
          rules={[
            {
              required: true,
              message: "Hex code is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
