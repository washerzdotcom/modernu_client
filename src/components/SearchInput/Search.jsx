import React, { useState, useEffect } from "react";
import Layout from "./../Layout";
import { useSearch } from "../../context/search";
import loadingImg from "../../assets/loader.gif";
import { Card, Col, Row, Button, Placeholder } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const [loading, setLoading] = useState(true); // Initial loading state as true
  const navigate = useNavigate();

  useEffect(() => {
    if (values.results) {
      // Once data has loaded (empty or not), set loading to false
      setLoading(false);
    }
  }, [values.results]);

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {loading
              ? "Searching..."
              : values?.results.length < 1
              ? "Sorry, no products found."
              : `Found ${values?.results.length} products`}
          </h6>
          <Row className="mt-4 d-flex">
            {loading ? (
              <>
                {[...Array(3)].map((_, index) => (
                  <Card style={{ width: "18rem" }} key={index}>
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
              values?.results.map((p) => {
                const discountPercentage = p.oldprice
                  ? Math.round(((p.oldprice - p.price) / p.oldprice) * 100)
                  : 0;

                return (
                  <Col className="col-6 col-sm-4 col-md-3 p-1 mt-3" key={p._id}>
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
        </div>
      </div>
    </Layout>
  );
};

export default Search;
