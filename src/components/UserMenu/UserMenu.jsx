import React, { useState } from "react";
import { ListGroup, Offcanvas, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <h1>Dashboard</h1>
      <Button variant="danger" className="d-lg-none" onClick={handleShow}>
        Click me
      </Button>
      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ display: "block" }}>
          <div className="text-center">
            <ListGroup>
              <Link to="/dashboard/user/profile" class="text-decoration-none">
                <ListGroup.Item action>Profile</ListGroup.Item>
              </Link>
              <Link to="/dashboard/user/other" class="text-decoration-none">
                <ListGroup.Item action>Your Orders</ListGroup.Item>
              </Link>
            </ListGroup>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UserMenu;
