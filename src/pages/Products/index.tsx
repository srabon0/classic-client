import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ClasssicImage from "../../components/ui/ClassicImage";
import ClassicModal from "../../components/ui/ClassicModal";
import ContentPreloader from "../../components/ui/ContentPreloader";
import ClassicTable from "../../components/ui/Table";
import { useDebounce } from "../../hooks/DebounceHook";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/features/product/productApi";
import { TProduct } from "../../types/product.type";
import { getImageUrl } from "../../utils/get-image-url";
import Form from "./Form";
const columns = [
  {
    title: "Sl No.",
    dataIndex: "id",
    key: "id",
    render: (text: any) => <>{text}</>, // Assuming direct rendering, similar to the second definition
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Name",
    dataIndex: "title",
    key: "title",
    render: (text: any) => <>{text}</>, // Placeholder render function for demonstration
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },

  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text: any) => <>{text}</>, // Placeholder render function for demonstration
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (text: any) => <>{text}</>, // Placeholder render function for demonstration
  },
];

const Product = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const [updatingData, setUpdatingData] = useState<any>(null);
  const [deletingData, setDeletingData] = useState<any>(null);
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

  useEffect(() => {
    if (debouncedSearchTerm) {
      onPaginationChange(1, size);
    }
  }, [debouncedSearchTerm, size]);

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
    setUpdatingData(null);
  };
  const onEdit = (data: any) => {
    setUpdatingData(data);
    setVisible(true);
  };

  const onDelete = (data: any) => {
    setDeletingData(data);
  };

  const onConfirmDelete = () => {
    deleteProduct(deletingData?._id).then(() => {
      setDeletingData(null);
    });
  };

  const { data, error, isLoading } = useGetProductsQuery({
    ...query,
  });

  const [deleteProduct, { isLoading: isDeleting, error: deleteError }] =
    useDeleteProductMutation();
  if (isLoading || isDeleting)
    return (
      <ContentPreloader
        loadingText={isLoading ? "Loading Products..." : "Deleting Product..."}
      />
    );
  if (error) {
    toast.error("Could not fetch the product. Please try again.!!!");
  }
  if (deleteError) {
    toast.error("Could not delete the product. Please try again.!!!");
  }

  const products = data?.data?.data;
  const meta = data?.data?.meta;

  const myProducts = products?.map((item: TProduct, index: number) => ({
    id: Number((meta?.page - 1) * meta?.limit + index + 1)
      .toString()
      .padStart(2, "0"),
    image: <ClasssicImage src={getImageUrl(item?.image[0]?.imageUrl)} />,
    title: item.title,

    brand: item.brand.name,
    category: item.category.name,
    price: item.price,
    description: item.description,

    action: (
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          onClick={() => {
            onEdit(item);
          }}
          type="primary"
        >
          <EditOutlined />
          Edit
        </Button>
        <Button
          onClick={() => {
            onDelete(item);
          }}
          type="primary"
          danger
        >
          <DeleteOutlined /> Delete
        </Button>
      </div>
    ),
  }));

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
            Add Product
          </Button>
        </Col>
      </Row>

      <>
        <ClassicTable
          loading={isLoading}
          columns={columns}
          dataSource={myProducts}
          pageSize={size}
          totalPages={meta?.totalCounts}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          // onTableChange={onTableChange}
          showPagination={true}
        />
      </>
      <Form
        updatingData={updatingData}
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
            Name : {deletingData?.title}
            <br />
            Brand : {deletingData?.brand?.name}
            <br />
            Category : {deletingData?.category?.name}
          </strong>
        </p>
      </ClassicModal>
    </div>
  );
};

export default Product;
