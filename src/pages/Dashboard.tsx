import { Card, Col, Row, Skeleton, Statistic } from "antd";
import React, { useEffect, useState } from "react";
import LineChart from "../components/charts/LineChart";

const DashboardCard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({
    products: 0,
    categories: 0,
    brands: 0,
  });

  useEffect(() => {
    const base =
      import.meta.env.MODE === "development"
        ? import.meta.env.VITE_LOCAL_BACKEND_URL
        : import.meta.env.VITE_PROD_BACKEND_URL;
    fetch(base + "/dashboard/get-all-counts")
      .then((response) => response.json())
      .then((data) => {
        setData(data?.data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Card
            style={{
              borderRadius: 10,
              backgroundColor: "#e0aaff", // Soft background color
            }}
            loading={loading}
          >
            <Skeleton loading={loading} active>
              <Statistic
                style={{ color: "#0d3b66" }}
                title="Products"
                value={data?.products}
              />
            </Skeleton>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{
              borderRadius: 10,
              backgroundColor: "#4895ef", // Soft background color
            }}
            loading={loading}
          >
            <Skeleton loading={loading} active>
              <Statistic title="Categories" value={data?.categories} />
            </Skeleton>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{
              borderRadius: 10,
              backgroundColor: "#ff6b6b", // Soft background color
            }}
            loading={loading}
          >
            <Skeleton loading={loading} active>
              <Statistic title="Brands" value={data?.brands} />
            </Skeleton>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <LineChart />
      </Row>
    </>
  );
};

export default DashboardCard;
