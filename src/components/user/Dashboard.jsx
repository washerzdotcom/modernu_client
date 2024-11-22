import React from "react";
import Layout from "../Layout";
import { Card, Col, Container, Row } from "react-bootstrap";
import UserMenu from "../UserMenu/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - ModernU"}>
      <Container className="p-3 m-3">
        <Row>
          <Col md={3}>
            <UserMenu />
          </Col>
          <Col md={9}>
            <Card className="w-75 p-3">
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Dashboard;
