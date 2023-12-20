import React from "react";
import { Flex, Form, Input } from "antd";

export const UserInfo = ({ form }) => {
  return (
    <Flex justify="center">
      <Form form={form} layout="vertical" style={{ marginTop: "15px" }}>
        <Form.Item
          name="name"
          key="name"
          label="Name"
          rules={[{ required: true, message: "Name is Required!" }]}
          style={{ width: "300px" }}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          name="email"
          key="email"
          label="Email"
          rules={[{ required: true, message: "Email is Required!" }]}
        >
          <Input type="email" />
        </Form.Item>
      </Form>
    </Flex>
  );
};
