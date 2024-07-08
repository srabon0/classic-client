import { Button, Layout, theme } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { useGetBrandsQuery } from "../../redux/features/brand/brandApi";
import { setBrands } from "../../redux/features/brand/brandSlice";
import { useGetCategoriesQuery } from "../../redux/features/categories/categoryApi";
import { setCategories } from "../../redux/features/categories/categorySlice";
import { useAppDispatch } from "../../redux/hook";
import Sidebar from "./Sidebar";

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const { data: CategoryData } = useGetCategoriesQuery({
    limit: 100,
    page: 1,
  });
  const { data: BrandData } = useGetBrandsQuery({
    limit: 100,
    page: 1,
  });

  if (CategoryData) {
    console.log("CategoryData", CategoryData);
    dispatch(setCategories(CategoryData?.data?.data as any));
  }

  if (BrandData) {
    console.log("BrandData", BrandData);
    dispatch(setBrands(BrandData?.data?.data as any));
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sidebar />
      <Layout>
        <Header>
          <Button onClick={handleLogout}>Logout</Button>{" "}
        </Header>

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
