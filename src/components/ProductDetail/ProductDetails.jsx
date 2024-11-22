import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Row, Spinner, Placeholder } from "react-bootstrap";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import loadingImg from "../../assets/loader.gif";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedColor, setSelectedColor] = useState(""); // New state for color
  const [quantity, setQuantity] = useState(1); // New state for quantity
  const [productLoading, setProductLoading] = useState(false); // Loading state for product details
  const [relatedLoading, setRelatedLoading] = useState(false); // Loading state for related products
  const [productType, setProductType] = useState("Products");

  // Initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product
  const getProduct = async () => {
    try {
      setProductLoading(true); // Start loading
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      setSelectedColor(data?.product.colors[0]); // Set default color
      getSimilarProduct(data?.product._id, data?.product.category._id);
      setProductLoading(false); // End loading
    } catch (error) {
      setProductLoading(false); // End loading on error
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      setRelatedLoading(true); // Start loading
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
      setRelatedLoading(false); // End loading
    } catch (error) {
      setRelatedLoading(false); // End loading on error
      console.log(error);
    }
  };

  // Fetch photos for the product
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/v1/product/product-photos/${product._id}`
        );
        const data = await response.json();

        if (data.success) {
          setPhotos(data.photos);
          setSelectedPhoto(data.photos[0]); // Set the first photo as default main photo
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    if (product._id) {
      fetchPhotos();
    }
  }, [product._id]);

  // Quantity increment and decrement
  const handleQuantityChange = (type) => {
    if (type === "increase") {
      if (selectedColor.quantity > quantity) {
        setQuantity((prev) => prev + 1);
      } else {
        toast.error("Product is not available in the selected quantity");
      }
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Function to select color and reset quantity
  const handleColorSelect = (color) => {
    if (color.quantity > 0) {
      setSelectedColor(color);
      setQuantity(1); // Reset quantity when a new color is selected
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row mt-2">
          {productLoading ? (
            <>
              {[...Array(1)].map((_, index) => (
                <Card key={index}>
                  <Card.Img
                    variant="top"
                    style={{ height: "20rem" }}
                    src={loadingImg}
                  />
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
            <>
              <div className="col-md-4">
                {/* Main Photo */}
                {selectedPhoto && (
                  <img
                    src={`data:${selectedPhoto.contentType};base64,${selectedPhoto.data}`}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "18rem" }}
                  />
                )}

                {/* Thumbnail Photos */}
                <div className="row mt-4">
                  {photos.map((photo, index) => (
                    <div className="col-3 me-4" key={index}>
                      <img
                        src={`data:${photo.contentType};base64,${photo.data}`}
                        alt={`${product.name} photo ${index + 1}`}
                        className="card-img-top me-4"
                        style={{
                          height: "6rem",
                          width: "6rem",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedPhoto(photo)} // Change main photo on click
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-8">
                <h3 className="text-secondary">{product.name}</h3>
                <span className="text-secondary">{product.description}</span>
                <h4 className="text-secondary">Rs. {product.price}.00</h4>

                {/* Colors */}
                <div>
                  <h6 className="mb-3">Colors: </h6>
                  {product.colors?.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorSelect(color)}
                      style={{
                        cursor: color.quantity > 0 ? "pointer" : "not-allowed",
                        padding: "10px 30px",
                        margin: "5px",
                        border:
                          selectedColor.name === color.name
                            ? "2px solid black"
                            : "1px solid #ccc",
                        borderRadius: "3px",
                        backgroundColor:
                          color.quantity === 0 ? "#f8d7da" : "#fff", // Highlight out-of-stock colors
                        opacity: color.quantity === 0 ? 0.6 : 1, // Slightly fade out-of-stock colors
                      }}
                    >
                      {color.name} {color.quantity === 0 && "(Out of stock)"}
                    </button>
                  ))}
                </div>

                {/* Quantity */}
                <div className="my-3">
                  <h6>Quantity: </h6>
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    style={{
                      padding: "10px 30px",
                      margin: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "2px",
                    }}
                  >
                    -
                  </button>
                  <span className="mx-2">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    style={{
                      padding: "10px 30px",
                      margin: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "2px",
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-secondary ms-1"
                  onClick={() => {
                    if (selectedColor.quantity > 0) {
                      setCart([
                        ...cart,
                        { ...product, selectedColor, quantity },
                      ]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([
                          ...cart,
                          { ...product, selectedColor, quantity, productType },
                        ])
                      );
                      toast.success("Item Added to cart");
                    } else {
                      toast.error("Selected color is out of stock");
                    }
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <hr />
      <div className="container">
        <Row className="my-3 d-flex">
          <h1 className="mt-3">Similar Products</h1>
          {relatedLoading ? (
            <div className="text-center w-100 my-3">
              <Spinner animation="border" variant="danger" />
            </div>
          ) : (
            <>
              {relatedProduct.length < 1 && (
                <p className="text-center">No Similar products found</p>
              )}
              {relatedProduct?.map((p) => (
                <Col className="col-sm-6 col-md-3 mt-2" key={p._id}>
                  <Card>
                    <Card.Img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      style={{ height: "9rem" }}
                    />
                    <Card.Body>
                      <Card.Title className="text-dark">{p.name}</Card.Title>
                      <Card.Text>
                        <p className="text-secondary">
                          {p.description.substring(0, 25)}...
                        </p>
                        <Row>
                          <Col>{p.price}</Col>
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
              ))}
            </>
          )}
        </Row>
      </div>
    </Layout>
  );
};

export default ProductDetails;
