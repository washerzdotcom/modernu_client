import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Placeholder,
} from "react-bootstrap";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import loadingImg from "../../assets/loader.gif";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const productType = "women";
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product?productType=${productType}`
      );
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Container>
        <h1 className="mt-3">New Products</h1>
        <Row className="my-3 d-flex">
          {loading ? (
            <>
              {[...Array(4)].map((_, index) => (
                <Card style={{ width: "17rem" }} key={index}>
                  <Card.Img variant="top" src={loadingImg} />
                  <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                      <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                      <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                      <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                      <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder.Button variant="danger" xs={3} />
                  </Card.Body>
                </Card>
              ))}
            </>
          ) : (
            products?.slice(0, 4).map((p) => {
              const discountPercentage = p.oldprice
                ? Math.round(((p.oldprice - p.price) / p.oldprice) * 100)
                : null;

              return (
                <Col className="col-6 col-sm-4 col-md-3 mt-3" key={p._id}>
                  <Card>
                    {discountPercentage > 0 && (
                      <div>
                        <span
                          style={{
                            margin: "-15px",
                            position: "static",
                            marginRight: "5px",
                            height: "18px",
                            lineHeight: "18px",
                            borderRadius: "3px",
                            minWidth: "40px",
                            padding: "0 5px",
                            textAlign: "center",
                            fontWeight: "500",
                            fontSize: "12px",
                            float: "left",
                            backgroundColor: "#dc3545",
                            color: "white",
                          }}
                        >
                          {discountPercentage}% OFF
                        </span>
                      </div>
                    )}
                    <Card.Img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      style={{ height: "18rem" }}
                    />
                    <Card.Body>
                      <Card.Title className="text-dark">{p.name}</Card.Title>
                      <Card.Text>
                        <p className="text-secondary ">
                          {p.description.substring(0, 25)}...
                        </p>
                        <Row>
                          <Col>
                            ₹{p.price}
                            {p.oldprice && (
                              <div
                                className="ms-2"
                                style={{
                                  textDecoration: "line-through",
                                  color: "#999",
                                  fontSize: "14px",
                                  display: "inline-block",
                                }}
                              >
                                ₹{p.oldprice}
                              </div>
                            )}
                          </Col>
                          <Col className="my-2">
                            <Button
                              onClick={() => navigate(`/product/${p.slug}`)}
                              variant="outline-danger"
                              size="sm"
                            >
                              More Details
                            </Button>
                          </Col>
                        </Row>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </>
  );
}
