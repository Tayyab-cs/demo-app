import { Button } from "antd";

const columns = ({ setCarModalOpen, setViewData, deleteUser }) => {
  return [
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
          onClick={() => {
            setCarModalOpen(true);
            setViewData(record);
          }}
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
};

export default columns;
