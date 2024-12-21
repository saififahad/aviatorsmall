import React from "react";
import { useAuth } from "../ContextAndHooks/AuthContext";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Referral = () => {
  const { user } = useAuth();

  const shareViaWhatsapp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${process.env.REACT_APP_CLIENT_URL}/auth/register?ref=${user?.code}`)}`;
    window.open(url, '_blank');
  };

  const shareViaTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(`${process.env.REACT_APP_CLIENT_URL}/auth/register?ref=${user?.code}`)}`;
    window.open(url, '_blank');
  };

  const shareViaInstagram = () => {
    const url = `https://www.instagram.com/?url=${encodeURIComponent(`${process.env.REACT_APP_CLIENT_URL}/auth/register?ref=${user?.code}`)}`;
    window.open(url, '_blank');
  };

  const shareViaFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.REACT_APP_CLIENT_URL}/auth/register?ref=${user?.code}`)}`;
    window.open(url, '_blank');
  };


  return (
    <div style={{ height: "75vh" }} className="container mt-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body text-center">
          <h2 style={{ fontFamily: "Arial" }} className="card-title mb-4">Your Referral Cart</h2>
          {/* CSRF token - you might need to handle this differently in React */}
          <input type="hidden" name="_token" value={"kjsdfklhasdf"} />

          <p className="card-text mb-4">Your Referral Code: {user?.code}</p>
          <p className="card-text mb-4" style={{ fontSize: "16px" }}>
            Share your Referral Link:
            <br />
            {/* <Link
              to={`${process.env.REACT_APP_CLIENT_URL}/auth/register?ref=${user?.code}`}
              style={{
                color: "#007BFF",
                textDecoration: "underline",
                fontSize: "14px",
                wordBreak: "break-all",
              }}
            >
              {`${process.env.REACT_APP_CLIENT_URL}/auth/register?ref=${user?.code}`}
            </Link> */}
            {/* {`${process.env.REACT_APP_CLIENT_URL}/auth/register?ref=${user?.code}`} */}
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
              <div onClick={shareViaWhatsapp}><FaWhatsapp size={24} style={{ color: "green", cursor: "pointer" }} /></div>
              <div onClick={shareViaTelegram}><FaTelegram size={24} style={{ color: "skyblue", cursor: "pointer" }} /></div>
              <div onClick={shareViaInstagram}><FaInstagram size={24} style={{ color: "hotpink", cursor: "pointer" }} /></div>
              <div onClick={shareViaFacebook}><FaFacebook size={24} style={{ color: "blue", cursor: "pointer" }} /></div>
            </div>
          </p>
          <small className="text-muted">Thank you for sharing!</small>
        </div>
      </div>
    </div>
  );
};

export default Referral;
