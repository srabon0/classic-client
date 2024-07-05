import { Button, Pagination } from "antd";
import { useState } from "react";

import { useGetProductsQuery } from "../../redux/features/product/productApi";
import Form from "./Form";
import ProductTable from "./Table";

const Product = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const handlePageChange = (page: number, pageSize?: number) => {
    console.log(page, pageSize);
    setCurrentPage(page);
    setPageSize(pageSize || 20);
  };
  const [visible, setVisible] = useState<boolean>(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const { data, error, isLoading } = useGetProductsQuery({
    page: currentPage,
    limit: pageSize,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const { data: ServerData } = data;

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        Add Product
      </Button>

      <>
        <ProductTable products={ServerData.data} meta={ServerData.meta} />
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
        />
      </>
      <Form isOpen={visible} handleClose={onClose} />
    </div>
  );
};

export default Product;
