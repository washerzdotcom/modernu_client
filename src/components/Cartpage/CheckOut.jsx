import React, { useState } from "react";
import { useCart } from "../../context/cart";
import Layout from "../Layout";
import {
  Form,
  Row,
  Button,
  Col,
  Container,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");
  const [auth] = useAuth();
  const navigate = useNavigate();

  // New state variables for discount
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * (item.quantity || 1);
        total -= (total * discountPercentage) / 100;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate grand total with shipping charge
  const grandtotalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * (item.quantity || 1);
      });
      total -= (total * discountPercentage) / 100;
      total += 100; // Add shipping charge

      return total.toFixed(2); // Return plain number (without currency format)
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle discount code application
  const handleApplyDiscount = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/discount/apply`,
        { code: discountCode }
      );

      if (data.success) {
        setDiscountPercentage(data.discountPercentage);
        toast.success(`Discount applied: ${data.discountPercentage}% off`);
      }
    } catch (error) {
      setDiscountPercentage(0);
      toast.error(
        error.response?.data?.error || "Invalid or expired discount code"
      );
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      if (
        !firstName ||
        !secondName ||
        !address ||
        !city ||
        !state ||
        !pin ||
        !phone
      ) {
        toast.error("Please fill in all required details");
        setLoading(false)
        return;
      }

      const orderDetails = {
        userId: auth?.user?._id,
        cartItems: cart.map((item) => ({
          _id: item._id,
          price: item.price,
          quantity: item.quantity || 1,
          color: item.selectedColor?.name,
          productType: item.productType,
        })),
        amount: grandtotalPrice().replace(/[^\d.-]/g, ""),
        firstName,
        secondName,
        address,
        city,
        state,
        pin,
        phone,
      };
      setCart([]);
      localStorage.removeItem("cart");

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/payment/pay`,
        orderDetails
      );

      const form = document.createElement("form");
      form.action = data.redirect_url;
      form.method = "POST";

      for (let key in data.formData) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data.formData[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.log("Payment error:", error);
    }
  };

  console.log(
    cart.map((item) => ({
      _id: item._id,
      productType: item.productType,
    }))
  );

  return (
    <Layout>
      <Container>
        <div className="row">
          <div className="col-md-8 mt-3">
            <h3>Delivery</h3>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Control
                    required
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridSecondName">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Second Name"
                    value={secondName}
                    onChange={(e) => setSecondName(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Control
                  required
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Control
                  placeholder="Apartment, studio, or floor (Optional)"
                  value={apartment}
                  required
                  onChange={(e) => setApartment(e.target.value)}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Control
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option>State</option>
                    <option>Uttar Pradesh</option>
                    <option>Delhi</option>
                    <option>Haryana</option>
                    <option>Punjab</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Control
                    placeholder="PIN code"
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" as={Col} controlId="formGridPhone">
                <Form.Control
                  placeholder="Phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>

              <InputGroup>
                <Form.Control
                  className="mb-3"
                  disabled
                  placeholder="Shipping Charge ₹100.00"
                />
              </InputGroup>
            </Form>
          </div>

          <div className="col-md-4">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 flex-row" key={p._id}>
                <div className="col-6">
                  <img
                    className="card-img-top"
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    style={{ height: "4rem" }}
                  />
                </div>
                <div className="col-6">
                  <p>
                    <span style={{ fontWeight: "500" }}>Color</span>:{" "}
                    {p.selectedColor?.name}
                  </p>
                  <p>
                    <span style={{ fontWeight: "500" }}>Quantity</span>:{" "}
                    {p.quantity}
                  </p>
                </div>
              </div>
            ))}

            <div className="row">
              <div className="col-9">
                <Form.Group className="mb-3" as={Col}>
                  <Form.Control
                    placeholder="Discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-3">
                <button
                  className="btn-outline-danger btn"
                  type="submit"
                  onClick={handleApplyDiscount}
                >
                  Apply
                </button>
              </div>
              <div className="col-9">Subtotal</div>
              <div className="col-3">{totalPrice()}</div>
              <div className="col-9">Shipping</div>
              <div className="col-3">₹100.00</div>

              <div
                className="col-9 mt-3"
                style={{ fontSize: "1.5rem", fontWeight: "900" }}
              >
                Total
              </div>
              <div
                className="col-3 mt-3"
                style={{ fontSize: "1.5rem", fontWeight: "400" }}
              >
                ₹{grandtotalPrice()}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          {auth?.token ? (
            <Button
              variant="primary"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                "Pay now"
              )}
            </Button>
          ) : (
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate("/login")}
            >
              Please login before payment
            </button>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default CheckOut;
