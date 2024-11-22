import React, { useEffect, useState } from "react";
import AdminMenu from "../../AdminMenu/AdminMenu";
import Layout from "../../Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./AdminProduct.css";
import { Container, Spinner } from "react-bootstrap";

const KidProducts = () => {
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const navigate = useNavigate();
  //get all products
  const getAllProducts = async () => {
    try {
      setProductLoading(true);
      const productType = "kid";
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product?productType=${productType}`
      );
      setProducts(data.products);
      setProductLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <Container fluid className="m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="text-center h4">Kids All Products List</div>
            <div className="d-flex row">
              {productLoading ? (
                <div className="text-center w-100 my-3">
                  <Spinner animation="border" variant="danger" />
                </div>
              ) : (
                products?.map((p) => (
                  <>
                    <div className="col-6 col-sm-4 col-md-3">
                      <Link
                        key={p._id}
                        to={`/dashboard/admin/kid-products/${p.slug}`}
                        className="product-link"
                      >
                        <div className="card m-2">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            style={{ height: "15rem" }}
                          />
                          <div className="card-body">
                            <div className="card-title">{p.name}</div>
                            <div className="card-text description-container">
                              <p className="text-secondary description">
                                {p.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </>
                ))
              )}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default KidProducts;
