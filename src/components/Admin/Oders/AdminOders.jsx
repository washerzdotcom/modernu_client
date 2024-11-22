import React, { useEffect, useState } from "react";
import AdminMenu from "../../AdminMenu/AdminMenu";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Layout from "./../../Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Payment success",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [productLoading, setProductLoading] = useState(false);

  const getOrders = async (req, res) => {
    try {
      setProductLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
      setProductLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
      toast.success("Status Update Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders Date"}>
      <Container className="m-3 p-3">
        <Row>
          <Col md={3}>
            <AdminMenu />
          </Col>
          <Col md={9}>
            <h1 className="text-center">All Orders</h1>
            {productLoading ? (
              <div className="text-center w-100 my-3">
                <Spinner animation="border" variant="danger" />
              </div>
            ) : (
              orders?.map((o, i) => {
                return (
                  <div className="border shadow">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            <Select
                              bordered={false}
                              onChange={(value) => handleChange(o._id, value)}
                              defaultValue={o?.status}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td>{o?.user?.name}</td>
                          <td>{moment(o?.createAt).fromNow()}</td>
                          <td>{o?.paymentMethod}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {o?.products?.map((p, i) => (
                        <div className="row mb-2 p-3 card flex-row">
                          <div className="col-md-8">
                            <p>{p?.product?.name}</p>
                            <p>{p?.product?.description}</p>
                            <p>Price : {p?.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AdminOders;
