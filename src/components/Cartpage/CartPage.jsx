import React from "react";
import Layout from "../Layout";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * (item.quantity || 1); // Multiply price by quantity
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center mb-1 g-light p-2">{`Hello ${
              auth?.token && auth?.user?.name
            }`}</h1>
            <h4 className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : "Your cart is empty. Please add items to your cart first."}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {cart?.map((p) => (
                <div key={p._id} className="row mb-2 p-3 card flex-row">
                  <div className="col-md-4">
                    <img
                      className="card-img-top"
                      src={`${process.env.REACT_APP_API}/api/v1/${
                        p.kid
                          ? "kid-product/kid-product-photo"
                          : "product/product-photo"
                      }/${p._id}`}
                      alt={p.name}
                      style={{ height: "9rem" }}
                    />
                  </div>
                  {/* <div className="col-md-8">
                    <p>{p.name}</p>
                    <p>{p.selectedColor}</p>
                    <p>{p.quantity}</p>
                    <p>Price: {p.price}</p>
                    <p>{p.productType}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div> */}
                  <div className="col-md-8">
                    <p>{p.name}</p>
                    <p>Color: {p.selectedColor?.name || "N/A"}</p>{" "}
                    {/* Display the color name */}
                    <p>Quantity: {p.quantity}</p>
                    <p>Price: {p.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3 text-center">
            <h4>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {cart?.length > 0 ? (
              auth?.user?.address && auth?.user?.pincode ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <h5>{auth?.user?.pincode}</h5>
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => navigate("/checkout")}
                    >
                      Checkout
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => navigate("/checkout")}
                  >
                    Checkout
                  </button>
                </div>
              )
            ) : (
              <div className="mb-3">
                <p>
                  Please add items to your cart before proceeding to checkout.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
