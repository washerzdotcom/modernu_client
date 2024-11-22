import React from "react";
import Layout from "../Layout";
import { Col, Container, Row, Card } from "react-bootstrap";
import AdminMenu from "../AdminMenu/AdminMenu";
import { useAuth } from "../../context/auth";

const Admindashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <Container className="m-3 p-3">
        <Row>
          <Col md={3}>
            <AdminMenu />
          </Col>
          <Col md={9} className="mt-3">
            <Card className="w-75 p-3">
              <h3>Admin Name : {auth?.user?.name}</h3>
              <h3>Admin Email : {auth?.user?.email}</h3>
              <h3>Admin Mobile No. : {auth?.user?.phone}</h3>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Admindashboard;
