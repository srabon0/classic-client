import { Button, Col, Input, Row } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import ClassicModal from "../../components/ui/ClassicModal";
import ContentPreloader from "../../components/ui/ContentPreloader";
import ClassicTable from "../../components/ui/Table";
import { useDebounce } from "../../hooks/DebounceHook";
import {
  useDeleteBrandMutation,
  useGetBrandsQuery,
} from "../../redux/features/brand/brandApi";
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

const Brand = () => {
  const [deleteBrand, { isLoading: isDeleting, error: deleteError }] =
    useDeleteBrandMutation();
  const [editingData, setEditingData] = useState<any>(null);
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

  const onEdit = (data: any) => {
    setEditingData(data);
    showDrawer();
  };

  const onDelete = (data: any) => {
    setDeletingData(data);
  };

  const onConfirmDelete = async () => {
    try {
      await deleteBrand(deletingData._id).unwrap();
      setDeletingData(null);
    } catch (error) {
      console.log("error", error);
      toast.error("Error deleting category");
    }
  };

  const { data, error, isLoading } = useGetBrandsQuery({
    ...query,
  });
  if (isLoading || isDeleting)
    return (
      <ContentPreloader
        loadingText={isLoading ? "Loading Brands..." : "Deleting Brand..."}
      />
    );
  if (error) {
    toast.error("Could not fetch the Brand. Please try again.!!!");
  }
  if (deleteError) {
    toast.error("Could not delete the Brand. Please try again.!!!");
  }

  const brands = data?.data?.data;
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
            Add Brand
          </Button>
        </Col>
      </Row>

      <ClassicTable
        loading={isLoading}
        columns={columns}
        dataSource={brands?.map((item: TCategory, index: number) => ({
          id: Number((meta?.page - 1) * meta?.limit + index + 1)
            .toString()
            .padStart(2, "0"),
          name: item.name,
          description: item.description,
          action: (
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Button onClick={() => onEdit(item)} type="primary">
                Edit
              </Button>
              <Button onClick={() => onDelete(item)} type="primary" danger>
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

      <Form updatingData={editingData} isOpen={visible} handleClose={onClose} />

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
            Brand : {deletingData?.name}
            <br />
          </strong>
        </p>
      </ClassicModal>
    </div>
  );
};

export default Brand;
