import { UploadOutlined, UserOutlined } from "@ant-design/icons";

import { createElement } from "react";
import { Link } from "react-router-dom";

import { Layout, Menu } from "antd";

const { Sider } = Layout;
const items = [
  {
    key: "4",
    icon: createElement(UserOutlined),
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: "1",
    icon: createElement(UserOutlined),
    label: <Link to="/product">Product</Link>,
  },
  {
    key: "2",
    icon: createElement(UploadOutlined),
    label: <Link to="/brand">Brand</Link>,
  },
  {
    key: "3",
    icon: createElement(UserOutlined),
    label: <Link to="/category">Category</Link>,
  },
];
const Sidebar = () => {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div>
        <h1
          style={{
            color: "white",
            textAlign: "center",
            padding: "20px",
            fontSize: "1rem",

            textTransform: "uppercase",
          }}
        >
          Classic Group
        </h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
