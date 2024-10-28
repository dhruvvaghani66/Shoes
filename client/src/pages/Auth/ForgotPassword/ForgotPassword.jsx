import React, { useState } from "react";
import "./ForgotPassword.css";
import Layout from "../../../components/Layout/Layout/Layout";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import loginlogoimg from "../../../assets/images/www.svg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to reset password");
    }
  };

  return (
    // <div className="login-bg">
      <Layout>
        <div className="for-container">
          <div className="login-card">
            <img src={loginlogoimg} alt="Logo" className="loginlogo" />
            <div className="link-container">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
              >
                SIGN IN
              </NavLink>
              <span className="separator">|</span>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
              >
                SIGN UP
              </NavLink>
            </div>
            <form onSubmit={handleSubmit}>
              <center>
                <h4 className="resettitle">RESET PASSWORD</h4>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control1"
                    placeholder="Enter Your Email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="form-control1"
                    placeholder="What is your Favorite Sports?"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control1"
                    placeholder="Enter Your New Password"
                    required
                  />
                </div>
                <button type="submit" className="btn sign-in-btn">
                  RESET
                </button>
              </center>
            </form>
          </div>
        </div>
      </Layout>
    // </div>
  );
};

export default ForgotPassword;
