import { Button } from "antd";
import { useState } from "react";
import Form from "./Form";
import CTable from "../../components/ui/Table";

const Category = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        Add Category
      </Button>

      <CTable
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: () => (
              <a
                onClick={() => {
                  setVisible(true);
                }}
              >
                {"Edit"}
              </a>
            ),
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
        ]}
        data={[
          {
            id: "1",
            name: "John Brown",
            description: (
              <span
                style={{
                  color: "red",
                }}
              >
                {"heasjdf"}
              </span>
            ),
          },
          {
            id: "2",
            name: "Jim Green",
            description: "London No. 1 Lake Park",
          },
          {
            id: "3",
            name: "Joe Black",
            description: "Sidney No. 1 Lake Park",
          },
        ]}
      />
      <Form isOpen={visible} handleClose={onClose} />
    </div>
  );
};

export default Category;
