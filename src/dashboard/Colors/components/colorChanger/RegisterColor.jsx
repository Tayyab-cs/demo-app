import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Form, Input } from "antd";
import validateColor from "validate-color";
import { setColorsList } from "../../../../store/slices/colorSlice.js";
import axiosInstance from "../../../../api/AxiosConfig.js";

const RegisterColor = () => {
  const [form] = Form.useForm();
  const [alert, setAlert] = useState(null);
  const colorsList = useSelector((state) => state.colors.colorsList);
  const dispatch = useDispatch();

  // Handling form submittion
  const onFinish = async (values) => {
    console.log("Form Finished Triggered");
    let RESPONSE;

    try {
      const validColor =
        values && validateColor(values.name) && validateColor(values.hex);
      if (!validColor) {
        setAlert({
          type: "error",
          message: "Invalid color name or hex code",
        });
      } else {
        RESPONSE = await axiosInstance.post("/register-color", values);
        if (RESPONSE.status === 200 && RESPONSE.statusText === "OK") {
          setAlert({
            type: "success",
            message: RESPONSE.data.message,
          });
          dispatch(
            setColorsList([
              ...colorsList,
              { name: values.name, hex: values.hex },
            ])
          );
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
};

export default RegisterColor;
