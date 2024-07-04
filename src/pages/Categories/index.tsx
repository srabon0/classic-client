import { Button } from "antd";
import { useState } from "react";
import CTable from "../../components/ui/Table";
import { useGetCategoriesQuery } from "../../redux/api/api.categories";
import { TCategory } from "../../types/categories.type";
import Form from "./Form";

const Category = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const { data, error, isLoading } = useGetCategoriesQuery(undefined);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const { data: categories } = data;

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        Add Category
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
            title: "Subcategories",
            dataIndex: "subCategories",
            key: "subCategories",
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
        data={categories?.map((item: TCategory, index: number) => ({
          id: index + 1,
          name: item.name,
          subCategories: item?.subCategories
            ?.map((sub) => sub?.name)
            .join(", "),
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

export default Category;
