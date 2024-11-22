import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Col, Container, Row } from "react-bootstrap";
import UserMenu from "../../UserMenu/UserMenu";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false); // New state for password visibility

  //get user data
  useEffect(() => {
    const { name, email, phone, address, pincode } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
    setPincode(pincode);
  }, [auth?.user]);

  //Register form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, phone, password, address, pincode }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <Container className="p-3 m-3">
        <Row>
          <Col md={3}>
            <UserMenu />
          </Col>
          <Col md={9}>
            <form onSubmit={handleSubmit}>
              <div className="header-text mb-4">
                <h1>User Profile</h1>
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                  className="form-control form-control-lg bg-lignt fs-6"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="form-control form-control-lg bg-lignt fs-6"
                  disabled
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Mobile Number"
                  className="form-control form-control-lg bg-lignt fs-6"
                  disabled
                />
              </div>

              {/* Change Password Button */}
              <div className="input-group mb-3">
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={() => setShowPasswordInput(!showPasswordInput)}
                >
                  {showPasswordInput ? "Cancel" : "Change Password"}
                </button>
              </div>

              {/* Conditionally Render Password Input */}
              {showPasswordInput && (
                <div className="input-group mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a new Password"
                    className="form-control form-control-lg bg-lignt fs-6"
                  />
                </div>
              )}

              <div className="input-group mb-3">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Please Enter Complete Address"
                  className="form-control form-control-lg bg-lignt fs-6"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="number"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter Your Pincode"
                  className="form-control form-control-lg bg-lignt fs-6"
                  required
                />
              </div>
              <div className="input-group mb-3 justify-content-center">
                <button className="btn btn-danger">UPDATE</button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Profile;
