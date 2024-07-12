import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import ClassicModal from "../../components/ui/ClassicModal";
import ContentPreloader from "../../components/ui/ContentPreloader";
import ClassicTable from "../../components/ui/Table";
import { useDebounce } from "../../hooks/DebounceHook";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../redux/features/categories/categoryApi";
import { TCategory } from "../../types/categories.type";
import Form from "./Form";

const columns = [
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
];

const Category = () => {
  const [deleteCategory, { isLoading: isDeleting, error: deleteError }] =
    useDeleteCategoryMutation();
  const [edititngData, setEditingData] = useState<any>(null);
  const [deletingData, setDeletingData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const [visible, setVisible] = useState<boolean>(false);
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  // const [sortBy, setSortBy] = useState<string>("");
  // const [sortOrder, setSortOrder] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["searchTerm"] = debouncedSearchTerm;
  // query["sortBy"] = sortBy;
  // query["sortOrder"] = sortOrder;

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  // const onTableChange = (pagination: any, filter: any, sorter: any) => {
  //   const { order, field } = sorter;
  //   // console.log(order, field);
  //   setSortBy(field as string);
  //   setSortOrder(order === "ascend" ? "asc" : "desc");
  // };

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const onEdit = (record: any) => {
    setEditingData(record);
    showDrawer();
  };

  const onDelete = (record: any) => {
    setDeletingData(record);
  };

  const onConfirmDelete = () => {
    deleteCategory(deletingData?._id);
    setDeletingData(null);
    toast.success("Category deleted successfully");
  };

  const { data, error, isLoading } = useGetCategoriesQuery({
    ...query,
  });
  if (isLoading || isDeleting)
    return (
      <ContentPreloader
        loadingText={isLoading ? "Loading Categories" : "Deleting Category..."}
      />
    );
  if (error) {
    toast.error("Could not fetch the category. Please try again.!!!");
  }
  if (deleteError) {
    toast.error("Could not delete the category. Please try again.!!!");
  }

  const categories = data?.data?.data;
  const meta = data?.data?.meta;

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={21}>
          <Input
            allowClear
            placeholder="Search"
            style={{ width: "100%", marginBottom: "20px" }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col span={3}>
          <Button type="primary" onClick={showDrawer} style={{ width: "100%" }}>
            Add Category
          </Button>
        </Col>
      </Row>

      <ClassicTable
        loading={isLoading}
        columns={columns}
        dataSource={categories?.map((item: TCategory, index: number) => ({
          id: Number((meta?.page - 1) * meta?.limit + index + 1)
            .toString()
            .padStart(2, "0"),
          name: item.name,
          subCategories: (
            <div
              style={{
                maxWidth: "250px",
              }}
            >
              {item?.subCategories?.map((sub) => sub?.name).join(", ")}
            </div>
          ),
          description: item.description,
          action: (
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Button
                icon={<EditOutlined />}
                onClick={() => onEdit(item)}
                type="primary"
              >
                Edit
              </Button>
              <Button
                icon={<DeleteOutlined />}
                onClick={() => onDelete(item)}
                type="primary"
                danger
              >
                Delete
              </Button>
            </div>
          ),
        }))}
        pageSize={size}
        totalPages={meta?.totalCounts}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        // onTableChange={onTableChange}
        showPagination={true}
      />

      <Form
        updatingData={edititngData}
        isOpen={visible}
        handleClose={onClose}
      />

      <ClassicModal
        title="Delete Confirmation"
        isOpen={!!deletingData}
        onClose={() => setDeletingData(null)}
        onConfirm={() => {
          onConfirmDelete();
        }}
        isLoading={false}
        isDeleteModal={true}
      >
        <p>Are you sure you want to delete?</p>
        <p>
          <strong>
            Category : {deletingData?.name}
            <br />
          </strong>
        </p>
      </ClassicModal>
    </div>
  );
};

export default Category;
