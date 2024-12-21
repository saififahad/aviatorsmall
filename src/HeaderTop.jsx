import React from "react";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "./Pages/SidebarModal";
import { useAuth } from "./ContextAndHooks/AuthContext";
import InstallButton from "./InstallButton";
const HeaderTop = () => {
  const { isLogin } = useAuth();

  return (
    <div className="header-top">
      <div className="header-left">
        {/* <InstallButton/> */}
        {/* <Link to="/" >
          <img src="images/logo.png" alt="Logo" className="logo1" />
          </Link> */}
      </div>
      {!isLogin && (
        <div className="header-right d-flex align-items-center">
          <NavLink
            to="/auth/register"
            className="register-btn rounded-pill d-flex align-items-center me-2 reg_btn"
          >
            Register
          </NavLink>
          <NavLink
            className="login-btn rounded-pill d-flex align-items-center me-2"
            id="login"
            to="/auth/Login"
          >
            Login
          </NavLink>
        </div>
      )}
      {isLogin && (
        <div className="header-right d-flex align-items-center">
          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default HeaderTop;
