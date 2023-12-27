import { useState } from "react";
import { Button } from "antd";

const useCarData = (dataSource, setDataSource) => {
  const [action, setAction] = useState({
    carData: undefined,
    actionType: undefined,
  });

  // Delete User
  const deleteUser = (record) => {
    const updatedDataSource = dataSource.filter(
      (item) => item.id !== record.id
    );
    setDataSource(updatedDataSource);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Car Info",
      dataIndex: "car_info",
      key: "car_info",
      align: "center",
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => setAction({ carData: record, actionType: "CAR_INFO" })}
        >
          View Data
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Button type="link" danger onClick={() => deleteUser(record)}>
          Delete User
        </Button>
      ),
    },
  ];

  return [columns, action, setAction];
};

export default useCarData;
