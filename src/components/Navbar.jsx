import React, { useEffect, useState } from "react";
import { BiPlus, BiSolidUserCircle, BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "./Navbar.css";
import { BACKEND_API_URL } from "../helper/helper";
import { deleteCookie } from "cookies-next";
import axios from "axios";

function Navbar() {
  const [auth, setAuth] = useState(false);

  //check login
  const checkLogin = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_API_URL}/auth/checklogin`, {
        withCredentials: true,
      });
      if (data.ok) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Not authorized");
      } else {
        console.error("An error occurred: ", error);
      }
    }
  };

  const handlelogout = async () => {
    await deleteCookie("authToken");
    await deleteCookie("refreshToken");
    window.location.href = "/signin";
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/profile">
          <BiSolidUserCircle className="icon" />
        </Link>
        <Link to="/addblog">
          <BiPlus className="icon" />
        </Link>
        <Link to="/search">
          <BiSearchAlt className="icon" />
        </Link>
      </div>
      <div className="navbar-middle">
        <Link to="/">
          <img className="logo" src={logo} alt="logo not found" />
        </Link>
      </div>
      {auth ? (
        <div className="navbar-right">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          <button onClick={handlelogout}>Logout</button>
        </div>
      ) : (
        <div className="navbar-right">
          <Link to="/signin">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
