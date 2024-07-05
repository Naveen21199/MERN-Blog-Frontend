import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import logo from "../images/BLOG.png";
import { BACKEND_API_URL } from "../helper/helper";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handlSubmit = async (e) => {
    e.preventDefault();
    const validataionErrors = {};
    if (!formData.email) {
      validataionErrors.email = "Email is required";
    }
    if (!formData.password) {
      validataionErrors.password = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      validataionErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validataionErrors).length > 0) {
      setErrors(validataionErrors);
      return;
    }

    const { data } = await axios.post(`${BACKEND_API_URL}/auth/register`, {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    if (data.success) {
      toast(data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      toast(data.error);
    }
  };
  return (
    <div className="authout">
      <div className="authin">
        <div className="left">
          <img src={logo} alt="img" />
        </div>
        <div className="right">
          <form
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={handlSubmit}
          >
            <ToastContainer />
            <div className="forminput_cont">
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="formError">{errors.name}</span>}
            </div>
            <div className="forminput_cont">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="formError">{errors.email}</span>
              )}
            </div>
            <div className="forminput_cont">
              <label htmlFor="">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="formError">{errors.password}</span>
              )}
            </div>
            <div className="forminput_cont">
              <label htmlFor="">Confirm Password</label>
              <input
                type="text"
                placeholder="Confirm Your Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="formError">{errors.confirmPassword}</span>
              )}
            </div>
            <button type="submit" className="main_button">
              Register
            </button>

            <p className="authlink">
              Already have an account? <Link to="/signin">login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
