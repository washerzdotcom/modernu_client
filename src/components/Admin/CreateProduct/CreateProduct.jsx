import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import AdminMenu from "../../AdminMenu/AdminMenu";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [photos, setPhotos] = useState([]); // Allow multiple photos
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldprice, setOldprice] = useState("");
  const [category, setCategory] = useState("");
  // const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  // const [colors, setColors] = useState([]); // For product colors
  const [colorInputs, setColorInputs] = useState([{ name: "", quantity: 0 }]);

  //get all categories
  const getAllCategory = async () => {
    try {
      const productType = "women";
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category?productType=${productType}`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleColorChange = (index, field, value) => {
    const newColorInputs = [...colorInputs];
    newColorInputs[index][field] = value;
    setColorInputs(newColorInputs);
  };

  const addColorInput = () => {
    setColorInputs([...colorInputs, { name: "", quantity: 0 }]);
  };

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("oldprice", oldprice);
      productData.append("category", category);
      // productData.append("quantity", quantity);
      productData.append("shipping", shipping);

      // Add photos (multiple)
      if (photos.length > 0) {
        photos.forEach((photo, index) => {
          productData.append(`photo${index}`, photo);
        });
      }

      // Add colors with quantities
      productData.append("colors", JSON.stringify(colorInputs));
      const productType = "women";
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product?productType=${productType}`,
        productData
      );
      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Women Product"}>
      <Container className="m-3 p-3">
        <Row>
          <Col md={3}>
            <AdminMenu />
          </Col>
          <Col md={9}>
            <h1>Create Women Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-12">
                  {photos.length > 0
                    ? `${photos.length} Photos Selected`
                    : "Upload Photos"}
                  <input
                    type="file"
                    name="photos"
                    accept="image/*"
                    multiple
                    onChange={(e) => setPhotos([...e.target.files])} // Handle multiple files
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photos.length > 0 && (
                  <div className="text-center">
                    {Array.from(photos).map((photo, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(photo)}
                        alt={`product_photo_${index}`}
                        height={"200px"}
                        className="img img-responsive m-2"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  rows="4"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a selling Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={oldprice}
                  placeholder="Write a List Price"
                  className="form-control"
                  onChange={(e) => setOldprice(e.target.value)}
                />
              </div>
              {/* <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write a Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div> */}
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              {/* Color Selection */}
              {/* <div className="mb-3">
                <input
                  type="text"
                  value={colors}
                  placeholder="Enter colors separated by commas (optional)"
                  className="form-control"
                  onChange={(e) => setColors(e.target.value.split(","))}
                />
              </div> */}
              <div className="mb-3">
                <label>Colors and Quantities:</label>
                {colorInputs.map((input, index) => (
                  <div key={index} className="d-flex mb-2">
                    <input
                      type="text"
                      placeholder="Color"
                      value={input.name}
                      className="form-control me-2"
                      onChange={(e) =>
                        handleColorChange(index, "name", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={input.quantity}
                      className="form-control"
                      onChange={(e) =>
                        handleColorChange(index, "quantity", e.target.value)
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={addColorInput}
                >
                  Add Color
                </button>
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default CreateProduct;
