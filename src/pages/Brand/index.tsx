import { Button, Col, Input, Row } from "antd";
import { useState } from "react";
import ClassicTable from "../../components/ui/Table";
import { useDebounce } from "../../hooks/DebounceHook";
import { useGetBrandsQuery } from "../../redux/features/brand/brandApi";
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

const Category = () => {
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
  const { data, error, isLoading } = useGetBrandsQuery({
    ...query,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

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
              <Button type="primary">Edit</Button>
              <Button type="primary" danger>
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

      <Form isOpen={visible} handleClose={onClose} />
    </div>
  );
};

export default Category;
