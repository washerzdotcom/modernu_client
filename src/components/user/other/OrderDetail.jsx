import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import Layout from "../../Layout";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const { orderId } = useParams(); // Get order ID from URL
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const [orderLoading, setOrderLoading] = useState(true);

  const getOrderDetails = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/order/${orderId}`
      );
      setOrder(data);
      setOrderLoading(false);
    } catch (error) {
      console.error("Error fetching order details:", error);
      setOrderLoading(false);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [orderId]);

  return (
    <Layout>
      <div className="container">
        <h1>Order Details</h1>
        {orderLoading ? (
          <div className="text-center my-3">
            <Spinner animation="border" variant="danger" />
          </div>
        ) : order ? (
          <>
            <div className="row">
              <div className="col-md-8">
                <h4>Status: {order.status}</h4>
                <p>
                  {order.firstName} {order.secondName}
                </p>
                <p>
                  {order.address}, {order.city}, {order.state}, {order.pin}
                </p>
                <p>₹ {order.totalAmount}</p>
                <p>{order.paymentMethod}</p>
                <p> {moment(order.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>
              </div>
              <div className="col-md-4">
                <h5>Products:</h5>
                <ul>
                  {order?.products?.map((product) => (
                    <li
                      key={product?.product?._id}
                      onClick={() =>
                        navigate(`/product/${product?.product?.slug}`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <div className="row mb-2 p-3 flex-row">
                        <div className="col-6">
                          <img
                            className="card-img-top"
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?.product?._id}`}
                            // alt={p.name}
                            style={{ height: "4rem" }}
                          />
                        </div>
                        <div className="col-6">
                          <p>
                            <span style={{ fontWeight: "500" }}>Color</span>:{" "}
                            {product?.color}
                          </p>
                          <p>
                            <span style={{ fontWeight: "500" }}>Quantity</span>:{" "}
                            {product?.quantity}
                          </p>
                        </div>
                      </div>
                      {/* {product?.product?.name} - {product?.quantity} - Price:{" "}
                      {product?.price} */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <p>Order not found</p>
        )}
      </div>
    </Layout>
  );
};

export default OrderDetail;
