import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_URL } from "../helper/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  //handle change
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handle submit
  const handlSubmit = async (e) => {
    e.preventDefault();
    const validataionErrors = {};
    if (!formData.email) {
      validataionErrors.email = "Email is required";
    }
    if (!formData.password) {
      validataionErrors.password = "Password is required";
    }

    if (Object.keys(validataionErrors).length > 0) {
      setErrors(validataionErrors);
      return;
    }

    try {
      const { data } = await axios.post(
        `${BACKEND_API_URL}/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.success) {
        toast(data.message);
        setFormData({
          email: "",
          password: "",
        });
        checkLogin();
      } else {
        toast(data.error);
      }
    } catch (error) {
      console.log(error);
      toast("Login failed. Please try again.");
    }
  };

  //check login
  // const checkLogin = async () => {
  //   try {
  //     const { data } = await axios.get(`${BACKEND_API_URL}/auth/checklogin`, {
  //       withCredentials: true,
  //     });
  //     if (data.ok) {
  //       window.location.href = "/";
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       console.log("Not authorized");
  //     } else {
  //       console.error("An error occurred: ", error);
  //     }
  //   }
  // };

   const checkLogin = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_API_URL}/auth/checklogin`, {
        withCredentials: true,
      });
      if (data.ok) {
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Not authorized");
      } else {
        console.error("An error occurred: ", error);
      }
    }
  };
  return (
    <div className="authout">
      <div className="authin">
        <div className="left">{/* {ala } */}</div>
        <div className="right">
          <form
            action=""
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={handlSubmit}
          >
            <ToastContainer />
            <div className="forminput_cont">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <span className="formError">{errors.email}</span>}
            <div className="forminput_cont">
              <label htmlFor="">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && (
              <span className="formError">{errors.password}</span>
            )}
            <button type="submit" className="main_button">
              Login
            </button>
            <p className="authlink">
              Don't have an account? <Link to="/signup">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
