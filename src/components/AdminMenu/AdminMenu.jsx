import React, { useState } from "react";
import { ListGroup, Offcanvas, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <h1>Admin Panel</h1>
      <Button variant="danger" className="d-lg-none" onClick={handleShow}>
        ⇒
      </Button>
      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Panel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ display: "block" }}>
          <div className="text-center">
            <ListGroup>
              <Link
                to="/dashboard/admin/create-category"
                class="text-decoration-none"
              >
                <ListGroup.Item action>Create Women Category</ListGroup.Item>
              </Link>
              <Link
                to="/dashboard/admin/kid-create-category"
                class="text-decoration-none"
              >
                <ListGroup.Item action>Create Kid Category</ListGroup.Item>
              </Link>
              <Link
                to="/dashboard/admin/create-product"
                class="text-decoration-none"
              >
                <ListGroup.Item action>Create Women Product</ListGroup.Item>
              </Link>
              <Link
                to="/dashboard/admin/kid-create-product"
                class="text-decoration-none"
              >
                <ListGroup.Item action>Create Kid Product</ListGroup.Item>
              </Link>
              <Link to="/dashboard/admin/products" class="text-decoration-none">
                <ListGroup.Item action>Women All Products</ListGroup.Item>
              </Link>
              <Link
                to="/dashboard/admin/kid-products"
                class="text-decoration-none"
              >
                <ListGroup.Item action>Kids All Products</ListGroup.Item>
              </Link>
              <Link to="/dashboard/admin/discount" class="text-decoration-none">
                <ListGroup.Item action>Create Discount</ListGroup.Item>
              </Link>
              <Link to="/dashboard/admin/orders" class="text-decoration-none">
                <ListGroup.Item action>All Orders</ListGroup.Item>
              </Link>
              <Link
                to="/dashboard/admin/addNewAdmin"
                class="text-decoration-none"
              >
                <ListGroup.Item action>Admin</ListGroup.Item>
              </Link>
            </ListGroup>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AdminMenu;
