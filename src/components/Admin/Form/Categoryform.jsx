import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const Categoryform = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control
              placeholder="Enter new category"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Col>
          <Col>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default Categoryform;
