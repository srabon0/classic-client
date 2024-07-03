import type { TableColumnsType } from "antd";
import { Table } from "antd";
import { useState } from "react";

type TableProps<T extends object> = {
  columns: TableColumnsType<T>;
  data: T[];
};
const TableComponent = <T extends object>({ columns, data }: TableProps<T>) => {
  // State for current page and page size
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Handle pagination change
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTableChange = (pagination: any) => {
    setCurrent(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        current,
        pageSize,
      }}
      onChange={handleTableChange}
      scroll={{ y: 240 }}
    />
  );
};

export default TableComponent;
