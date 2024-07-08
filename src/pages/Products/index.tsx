import { Button, Input } from "antd";
import { useState } from "react";

import ClassicTable from "../../components/ui/Table";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import Form from "./Form";
import { TProduct } from "../../types/product.type";
const columns = [
  {
    title: "Sl No.",
    dataIndex: "id",
    key: "id",
    render: (text: any) => <>{text}</>, // Assuming direct rendering, similar to the second definition
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
  const [visible, setVisible] = useState<boolean>(false);
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  // const [sortBy, setSortBy] = useState<string>("");
  // const [sortOrder, setSortOrder] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
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
  const { data, error, isLoading } = useGetProductsQuery({
    ...query,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const products = data?.data?.data;
  const meta = data?.data?.meta;

  const myProducts = products?.map((item: TProduct, index: number) => ({
    id: Number((meta?.page - 1) * meta?.limit + index + 1)
      .toString()
      .padStart(2, "0"),
    title: item.title,
    brand: item.brand.name,
    category: item.category.name,
    price: item.price,
    description: item.description,

    action: (
      <div style={{ display: "flex", gap: "10px" }}>
        <Button type="primary">Edit</Button>
        <Button type="primary" danger>
          Delete
        </Button>
      </div>
    ),
  }));

  return (
    <div>
      <Input
        placeholder="Search"
        style={{ width: "75vw", marginBottom: "20px" }}
      />

      <Button type="primary" onClick={showDrawer}>
        Add Product
      </Button>

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

        {/* <ProductTable products={ServerData.data} meta={ServerData.meta} />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={ServerData?.meta?.totalCounts}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={["10", "20", "50", "100"]}
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        /> */}
      </>
      <Form isOpen={visible} handleClose={onClose} />
    </div>
  );
};

export default Product;
