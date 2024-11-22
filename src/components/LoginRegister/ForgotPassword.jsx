import React, { useState } from "react";
import "./LoginRegister.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function LoginRegister() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

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

  // Function to handle password change
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password is at least 8 characters long
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/change-password`,
        { phone, password }
      );
      if (res && res.data.success) {
        toast.success("Password changed successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while changing the password");
    }
  };

  return (
    <div className="main background">
      <div
        className="content justify-content-center align-items-center d-flex shadow-lg with-blur-backdrop"
        id="content"
      >
        <div className="col-md-6 right-box none" id="right"></div>
        {/* ......................Forget.................. */}

        <div
          className="col-md-6 d-flax justify-content-center left-box"
          id="left"
        >
          <form onSubmit={handleSubmit}>
            <div className="header-text mb-4">
              <h1>Forget Password</h1>
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
                    send otp <i className="fa fa-phone" aria-hidden="true"></i>
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
            {otpVerified && (
              <>
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
                <div className="input-group mb-3">
                  <input
                    type="password"
                    value={confirmPassword} // Bind confirmPassword state
                    onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
                    placeholder="Confirm your Password"
                    className="form-control form-control-lg bg-lignt fs-6"
                    required
                  />
                </div>
              </>
            )}
            <div className="input-group mb-3 justify-content-center">
              <button
                className="btn border-white text-white"
                disabled={!otpVerified}
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
        {/* ..........................Switch panel.................... */}
        <div className="switch-content">
          <div className="switch">
            <div className="switch-panel switch-right">
              <h1>Change Password</h1>
              <p>Join Our Unique Platform, Explore a New Experience</p>
              <Link
                className="hidden btn border-white text-white w-50 fs-6"
                id="register"
                to="/login"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
