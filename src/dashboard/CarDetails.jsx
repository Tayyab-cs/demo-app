import React from "react";
import { Button, Card, Flex, Form, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export default function CarDetails({ form }) {
  return (
    <>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        form={form}
        name="dynamic_form_complex"
        style={{
          maxWidth: 600,
        }}
        autoComplete="off"
        initialValues={{
          items: [{}],
        }}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{
                display: "flex",
                rowGap: 16,
                flexDirection: "column",
              }}
            >
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Item ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Flex>
                    <Form.Item
                      label="Name"
                      name={[field.name, "name"]}
                      rules={[{ required: true, message: "Name Required!" }]}
                    >
                      <Input type="text" />
                    </Form.Item>

                    <Form.Item
                      label="Model"
                      name={[field.name, "model"]}
                      rules={[{ required: true, message: "Model Required!" }]}
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Flex>

                  <Flex>
                    <Form.Item
                      label="Color"
                      name={[field.name, "color"]}
                      rules={[{ required: true, message: "Color Required!" }]}
                    >
                      <Input type="text" />
                    </Form.Item>

                    <Form.Item
                      label="Price"
                      name={[field.name, "price"]}
                      rules={[{ required: true, message: "Price Required!" }]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Flex>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                + Add Item
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    </>
  );
}
