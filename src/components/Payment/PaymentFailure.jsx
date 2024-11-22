import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import Layout from "../Layout";

const PaymentFailure = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/checkout"); // Redirect to checkout for retrying payment
  };

  return (
    <Layout>
      <Container className="text-center mt-5">
        <h1>Payment Failed</h1>
        <p>Unfortunately, your payment was unsuccessful. Please try again.</p>
        <Button variant="danger" onClick={handleRetry} className="mt-3">
          Try Again
        </Button>
      </Container>
    </Layout>
  );
};

export default PaymentFailure;
