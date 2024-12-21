import React, { useState } from "react";
import { useAuth } from "./ContextAndHooks/AuthContext";
import HowToPlay from "./Pages/HowToPlay";
import { Link, useNavigate } from "react-router-dom";
import { GoQuestion } from "react-icons/go";

const HeaderBottom = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleHowToPlayClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="header-bottom">
      <Link to="/">
        <div className="header-left">
          <img src="images/logo.svg" alt="Logo" className="logo" />
        </div>
      </Link>
      <div className="header-right d-flex align-items-center">
        <button style={{ background: "#DC3545", color: "white", border: "transparent" }}
          onClick={handleHowToPlayClick}
          className="btn btn-warning m-font-0 rounded-pill py-1 px-2 f-14 d-flex align-items-center h-26"
        >
          <span className="material-symbols-outlined f-18 me-1">
            {/* <GoQuestion size={17} /> */}
            help
          </span> How
          to Play
        </button>
        {isModalOpen && <HowToPlay onClose={() => setIsModalOpen(false)} />}
        <div style={{ background: "#DC3545" }} className="wallet-balance h-26">
          <span style={{ color: "white" }} id="wallet_balance">
            {user?.money}₹
            {/* You may render wallet balance dynamically here */}
          </span>
        </div>
        {/* <div className="wallet-balance h-26">
          <span id="wallet_balance">
            ₹{user?.bonusMoney}W
            
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default HeaderBottom;
