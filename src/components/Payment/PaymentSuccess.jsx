import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import Layout from "../Layout";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/dashboard/user/other"); // Replace with the route for user orders page
  };

  return (
    <Layout>
      <Container className="text-center mt-5">
        <h1>Payment Successful!</h1>
        <p>
          Your order has been placed successfully. Thank you for shopping with
          us!
        </p>
        <Button variant="primary" onClick={handleRedirect} className="mt-3">
          View My Orders
        </Button>
      </Container>
    </Layout>
  );
};

export default PaymentSuccess;
