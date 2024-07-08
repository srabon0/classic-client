// // Assuming CTable is your table component
// import { Button } from "antd";
// import TableComponent from "../../components/ui/Table";
// import { TProduct } from "../../types/product.type";
// type Props = {
//   products: TProduct[];
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   meta: any;
// };

// const ProductTable: React.FC<Props> = ({ products, meta }) => {
//   const columns = [
//     {
//       title: "Sl No.",
//       dataIndex: "id",
//       key: "id",
//     },
//     {
//       title: "Name",
//       dataIndex: "title",
//       key: "title",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       key: "action",
//     },
//   ];

//   const data = products?.map((item: TProduct, index: number) => ({
//     id: Number((meta.page - 1) * meta.limit + index + 1)
//       .toString()
//       .padStart(2, "0"),
//     title: item.title,
//     description: item.description,
//     action: (
//       <div style={{ display: "flex", gap: "10px" }}>
//         <Button type="primary">Edit</Button>
//         <Button type="primary" danger>
//           Delete
//         </Button>
//       </div>
//     ),
//   }));

//   return (
//     <>
//       {" "}
//       <TableComponent pagination={false} columns={columns} data={data} />
//     </>
//   );
// };

// export default ProductTable;
