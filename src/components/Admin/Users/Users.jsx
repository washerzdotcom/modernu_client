import React from "react";
import Layout from "../../Layout";
import AdminMenu from "../../AdminMenu/AdminMenu";
import { Col, Container, Row } from "react-bootstrap";

const Users = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
      <Container className="m-3 p-3">
        <Row>
          <Col md={3}>
            <AdminMenu />
          </Col>
          <Col md={9}>
            <h1>All users</h1>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Users;
