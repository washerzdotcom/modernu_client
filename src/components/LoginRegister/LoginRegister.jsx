import React, { useState } from "react";
import "./LoginRegister.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";

export default function LoginRegister() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  function SwitchContent() {
    const content = document.getElementById("content");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    registerBtn.addEventListener("click", () => {
      content.classList.add("active");
    });

    loginBtn.addEventListener("click", () => {
      content.classList.remove("active");
    });
  }

  const signinhandle = () => {
    const signin = document.getElementById("left");
    const register = document.getElementById("right");

    signin.classList.remove("none");
    signin.classList.add("block");
    register.classList.add("none");
  };

  const registerhandle = () => {
    const signin = document.getElementById("left");
    const register = document.getElementById("right");

    register.classList.remove("none");
    register.classList.add("block");
    signin.classList.add("none");
  };

  // Function to send OTP via SMS
  const sendOtpViaSms = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/send-otp-sms`,
        { phone }
      );
      if (res && res.data.success) {
        toast.success("OTP sent successfully via SMS");
        setOtpSent(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while sending OTP via SMS");
    }
  };

  // Function to send OTP via WhatsApp
  const sendOtpViaWhatsapp = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/send-otp-whatsapp`,
        { phone }
      );
      if (res && res.data.success) {
        toast.success("OTP sent successfully via WhatsApp");
        setOtpSent(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while sending OTP via WhatsApp");
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/verify-otp`,
        { phone, otp }
      );
      if (res && res.data.success) {
        toast.success("OTP verified successfully");
        setOtpVerified(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid OTP");
    }
  };

  // Register form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      toast.error("Please verify OTP first");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, phone, password, address, pincode }
      );
      // Check if password is at least 8 characters long
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long");
        return;
      }
      if (res && res.data.success) {
        const content = document.getElementById("content");
        toast.success(res.data.message);
        content.classList.remove("active");
        setName("");
        setPhone("");
        setAddress("");
        setPassword("");
        setPincode("");
        setOtp("");
        setOtpSent(false);
        setOtpVerified(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Login form function
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { phone, password }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setPhone("");
        setPassword("");
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="main background">
      <div
        className="content justify-content-center align-items-center d-flex shadow-lg with-blur-backdrop"
        id="content"
      >
        {/* ......................Register form.................. */}
        <div
          className="col-md-6 d-flax justify-content-center left-box none"
          id="left"
        >
          <form onSubmit={handleSubmit}>
            <div className="header-text mb-4">
              <h1>Create Account</h1>
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                className="form-control form-control-lg bg-lignt fs-6"
                required
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="number"
                value={phone}
                onChange={(e) => {
                  if (!otpSent && !otpVerified) {
                    setPhone(e.target.value);
                  }
                }}
                placeholder="Enter Mobile Number"
                className="form-control form-control-lg bg-lignt fs-6"
                disabled={otpSent || otpVerified}
                required
              />
            </div>
            {phone.length === 10 && !otpSent && (
              <>
                <h6>Send OTP</h6>
                <div className="input-group mb-3">
                  <button
                    type="button"
                    className="btn border-white text-white me-2"
                    onClick={sendOtpViaSms}
                  >
                    send otp <i class="fa fa-phone" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    className="btn border-white text-white"
                    onClick={sendOtpViaWhatsapp}
                  >
                    send otp <i className="fab fa-whatsapp" />
                  </button>
                </div>
              </>
            )}
            {otpSent && !otpVerified && (
              <div className="input-group mb-3">
                <input
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="form-control form-control-lg bg-lignt fs-6"
                  required
                />
                <button
                  type="button"
                  className="btn border-white text-white"
                  onClick={verifyOtp}
                >
                  Verify
                </button>
              </div>
            )}
            <div className="input-group mb-3">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Your Address"
                className="form-control form-control-lg bg-lignt fs-6"
                required
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Your pincode"
                className="form-control form-control-lg bg-lignt fs-6"
                required
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="form-control form-control-lg bg-lignt fs-6"
                required
              />
            </div>
            <div className="input-group mb-3 justify-content-center">
              <button
                className="btn border-white text-white"
                disabled={!otpVerified}
              >
                Register
              </button>
            </div>
            <div className="signin" id="singIn">
              <small>
                <a onClick={registerhandle}>Sign In</a>
              </small>
            </div>
          </form>
        </div>
        {/* ......................Login form.................. */}
        <div className="col-md-6 right-box" id="right">
          <form onSubmit={handleSubmitLogin}>
            <div className="header-text mb-4">
              <h1>Sign In</h1>
            </div>
            <div className="input-group mb-3">
              <input
                type="phone"
                placeholder="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control form-control-lg bg-lignt fs-6"
                required
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control form-control-lg bg-lignt fs-6"
                required
              />
            </div>
            <div className="input-group mb-5 d-flex justify-content-between">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" />
                <label
                  htmlFor="formcheck"
                  className="form-check-label text-secondary"
                >
                  <small>Remember me</small>
                </label>
              </div>
              <div className="forgot">
                <small>
                  <Link to="/forgotpassword">Forgot password?</Link>
                </small>
              </div>
            </div>
            <div className="input-group mb-3 justify-content-center">
              <button className="btn border-white text-white">Login</button>
            </div>
            <div className="newUser" id="newUser">
              <small>
                <a onClick={signinhandle}>Create Account</a>
              </small>
            </div>
          </form>
        </div>

        {/* ..........................Switch panel.................... */}
        <div className="switch-content">
          <div className="switch">
            <div className="switch-panel switch-left">
              <h1>Hello, Again</h1>
              <p>We are happy to see you back</p>
              <button
                className="hidden btn border-white text-white w-50 fs-6"
                id="login"
                onClick={SwitchContent}
              >
                Login
              </button>
            </div>
            <div className="switch-panel switch-right">
              <h1>Welcome</h1>
              <p>Join Our Unique Platform, Explore a New Experience</p>
              <button
                className="hidden btn border-white text-white w-50 fs-6"
                id="register"
                onClick={SwitchContent}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
