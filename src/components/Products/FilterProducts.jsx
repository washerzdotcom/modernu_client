import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Placeholder,
} from "react-bootstrap";
import axios from "axios";
import { Checkbox, Slider } from "antd";
import { useNavigate } from "react-router-dom";
import loadingImg from "../../assets/loader.gif";

const FilterProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [priceRange, setPriceRange] = useState([500, 10000]);
  const [debouncedPriceRange, setDebouncedPriceRange] = useState(priceRange);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const navigate = useNavigate();

  // Debounce Timer
  const DEBOUNCE_DELAY = 500; // Delay in ms (0.5 seconds)

  // get all category
  const getAllCategory = async () => {
    try {
      setCategoryLoading(true); // Start loading
      const productType = "women";
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category?productType=${productType}`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
      setCategoryLoading(false); // End loading
    } catch (error) {
      setCategoryLoading(false); // End loading in case of error
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true); // Start loading
      const productType = "women";
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product?productType=${productType}`
      );
      setLoading(false); // End loading
      setProducts(data.products);
    } catch (error) {
      setLoading(false); // End loading in case of error
      console.log(error);
    }
  };

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // loading more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checked.length && priceRange[0] === 0 && priceRange[1] === 10000) {
      getAllProducts();
    }
  }, [checked.length, priceRange]);

  useEffect(() => {
    if (
      checked.length ||
      debouncedPriceRange[0] > 0 ||
      debouncedPriceRange[1] < 10000
    ) {
      filterProductByPrice(); // No need to pass priceRange directly
    }
  }, [checked, debouncedPriceRange]);

  // Debounce Price Range
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceRange(priceRange); // Update the debounced value after delay
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer); // Cleanup the previous timer if value changes
  }, [priceRange]);

  // filter
  const filterProductByPrice = async () => {
    try {
      setLoading(true);
      const productType = "women";
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters?productType=${productType}`,
        { checked, priceRange: debouncedPriceRange } // Send both category and price filters
      );
      setProducts(data?.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Layout>
      <Container fluid className="m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <h4 className="text-center">Category</h4>
            <div className="d-flex flex-column">
              {categoryLoading ? (
                <div className="text-center my-3">
                  <Spinner animation="border" variant="danger" />
                </div>
              ) : (
                categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) =>
                      setChecked(
                        e.target.checked
                          ? [...checked, c._id]
                          : checked.filter((id) => id !== c._id)
                      )
                    }
                  >
                    {c.name}
                  </Checkbox>
                ))
              )}
            </div>

            {/* price filter */}
            <h4 className="text-center mt-4">Price</h4>
            <div className="row my-4">
              <div className="col-6">
                <span
                  style={{
                    padding: "10px 30px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "2px",
                  }}
                >
                  {priceRange[0]} {/* Minimum Price */}
                </span>
              </div>
              <div className="col-6">
                <span
                  style={{
                    padding: "10px 30px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "2px",
                  }}
                >
                  {priceRange[1]} {/* Maximum Price */}
                </span>
              </div>
            </div>

            <div className="d-flex flex-column">
              {/* <Slider
                range
                defaultValue={[0, 10000]}
                max={10625}
                onChange={(value) => setPriceRange(value)}
                trackStyle={{ backgroundColor: "black" }} // Track color
                handleStyle={[
                  { backgroundColor: "black", borderColor: "black" }, // Handle color
                  { backgroundColor: "black", borderColor: "black" },
                ]}
              /> */}
              <Slider
                range
                defaultValue={[500, 10000]}
                max={10600} // Ensure max is a multiple of 100
                step={100} // Snap to increments of 100
                value={priceRange}
                onChange={(value) => setPriceRange(value)} // Update the price range dynamically
                trackStyle={{ backgroundColor: "black" }} // Customize track color
                handleStyle={[
                  { backgroundColor: "black", borderColor: "black" }, // Customize handle color
                  { backgroundColor: "black", borderColor: "black" },
                ]}
              />
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="row">
              <div className="d-flex flex-wrap">
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
                  products?.map((p) => {
                    const discount =
                      p.oldprice && p.price
                        ? Math.round(
                            ((p.oldprice - p.price) / p.oldprice) * 100
                          )
                        : 0;
                    return (
                      <Col
                        className="col-6 col-sm-4 col-md-3 p-1 mt-3"
                        key={p._id}
                      >
                        <Card>
                          {discount > 0 && (
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
                                {discount}% OFF
                              </span>
                            </div>
                          )}
                          <Card.Img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                            style={{ height: "18rem" }}
                          />
                          <Card.Body>
                            <Card.Title className="text-dark">
                              {p.name}
                            </Card.Title>
                            <Card.Text>
                              <p className="text-secondary ">
                                {p.description.substring(0, 25)}...
                              </p>
                              <Row>
                                <Col>
                                  {p.price}
                                  <div
                                    style={{
                                      textDecoration: "line-through",
                                      color: "#999",
                                      fontSize: "14px",
                                      display: "inline-blockS",
                                    }}
                                  >
                                    {p.oldprice}
                                  </div>
                                </Col>
                                <Col className="my-2">
                                  <Button
                                    onClick={() =>
                                      navigate(`/product/${p.slug}`)
                                    }
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
              </div>
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default FilterProducts;
