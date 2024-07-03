import { Button } from "antd";
import { useState } from "react";
import Form from "./Form";
import CTable from "../../components/ui/Table";

const Brand = () => {
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
        Add Brand
      </Button>
      <CTable
        data={[
          {
            id: "1",
            name: "John Brown",
            description: "New York No. 1 Lake Park",
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
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
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
      />
      <Form isOpen={visible} handleClose={onClose} />
    </div>
  );
};

export default Brand;
