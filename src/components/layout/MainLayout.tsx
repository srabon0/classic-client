import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { createElement } from "react";
import { Link, Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

// const items = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   UserOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: createElement(icon),
//   label: `nav ${index + 1}`,
// }));

const items = [
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

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
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
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Classic Group ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
