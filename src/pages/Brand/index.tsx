import { Button } from "antd";
import { useState } from "react";
import CTable from "../../components/ui/Table";
import { useGetBrandsQuery } from "../../redux/api/api.brands";
import Form from "./Form";
import { TBrand } from "../../types/brand.type";

const Brand = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const { data, error, isLoading } = useGetBrandsQuery(undefined);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const { data: brands } = data;
  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        Add Brand
      </Button>
      <CTable
        columns={[
          {
            title: "Sl No.",
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
          {
            title: "Action",
            dataIndex: "action",
            key: "action",
          },
        ]}
        data={brands?.map((item: TBrand, index: number) => ({
          id: index + 1,
          name: item.name,
          description: item.description,
          action: (
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Button type="primary">Edit</Button>
              <Button type="primary" danger>
                Delete
              </Button>
            </div>
          ),
        }))}
      />
      <Form isOpen={visible} handleClose={onClose} />
    </div>
  );
};

export default Brand;
