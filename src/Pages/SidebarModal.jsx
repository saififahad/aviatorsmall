import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserInfo } from "../api/query/useUserInfo";
import { useAuth } from "../ContextAndHooks/AuthContext";
import { useSettingContext } from "../ContextAndHooks/SettingContext";
import { PiMoneyFill } from "react-icons/pi";
import { IoMenuSharp } from "react-icons/io5";
import { IoMdVolumeMute } from "react-icons/io";
import { MdFlightTakeoff } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";

export default function Sidebar() {
  const { dispatch } = useSettingContext();
  const [sound, setSound] = useState(true);
  const handleSound = () => {
    dispatch({ type: "sound", payload: !sound });
    setSound(!sound)
  };
  const { setUser, user, setBank, setGateWayKey } = useAuth();

  const { userData, error, isLoading } = useUserInfo();
  const { setIsLogin } = useAuth();
  useEffect(() => {
    if (userData && userData?.user && userData.status === true) {
      setUser(userData.user);
      setBank(userData.bank);
      setGateWayKey(userData.key);
    }
  }, [userData]);
  function logout() {
    setIsLogin(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    setUser(null);
  }
  return (
    <div className="header-right d-flex align-items-center">
      <Link to="/deposit" >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className="deposite-btn rounded-pill d-flex align-items-center me-2 link-styles">
          <span className="material-symbols-outlined me-2"><PiMoneyFill />
          </span>
          <span className="me-2" id="header_wallet_balance">
            {/* ₹{wallet(user("id"))} */}
          </span>
          DEPOSIT

        </div>
      </Link>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-transparent dropdown-toggle p-0 d-flex align-items-center justify-content-center caret-none"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="material-symbols-outlined f-24 menu-icon text-white">
            <IoMenuSharp size={30} />
          </span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark profile-dropdown p-0">
          <li className="profile-head d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              {/* Assuming user image, email, and id are available in your context */}
              {/* <img
                // src={user("image")}
                className="avtar-ico"
                id="avatar_img"
                alt="avatar"
              /> */}
              <span>{user?.name}</span>
              <div>
                {/* <div className="profile-name mb-1">{user("email")}</div> */}
                <div className="profile-name" id="username">
                  {/* {user("id")} */}
                </div>
              </div>
            </div>
          </li>
          <li>
            <a className="f-12 justify-content-between link-style">
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico">
                  <IoMdVolumeMute />
                </span>
                SOUND
              </div>
              <div>
                <div className="form-check form-switch lg-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="sound"
                    checked={sound}
                    onChange={handleSound}
                  />
                  <label className="form-check-label" htmlFor="sound" />
                </div>
              </div>
            </a>
          </li>
          <li className="divider" />
          <li>
            <Link to="/" className="f-12 justify-content-between link-style">
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico f-20">
                  <MdFlightTakeoff />
                </span>
                <img
                  src="../../images/logo.svg"
                  className="side_logo"
                  alt="logo"
                />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/deposit" className="f-12 justify-content-between link-style">
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico f-20">
                  <PiMoneyFill />
                </span>
                DEPOSIT FUNDS
              </div>
            </Link>
          </li>
          <li>
            <Link to="/withdraw" className="f-12 justify-content-between link-style">
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico f-20">
                  <PiMoneyFill />
                </span>
                WITHDRAW FUNDS FROM THE ACCOUNT
              </div>
            </Link>
          </li>
          {/* <li>
            <Link
              to="/amount-transfer"
              className="f-12 justify-content-between link-style"
            >
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico f-20">
                  payments
                </span>
                AMOUNT TRANSFER
              </div>
            </Link>
          </li> */}
          <li>
            <Link to="/profile" className="f-12 justify-content-between link-style">
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico f-20">
                  account_circle
                </span>
                PERSONAL DETAILS
              </div>
            </Link>
          </li>
          {/* <li>
            <Link
              to="/deposit_withdrawals"
              className="f-12 justify-content-between"
            >
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico f-20">
                  payments
                </span>
                TRANSACTION HISTORY
              </div>
            </Link>
          </li> */}
          {/* <li>
            <Link
              to="/level-management"
              className="f-12 justify-content-between"
            >
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico f-20">
                  payments
                </span>
                LEVEL MANAGEMENT
              </div>
            </Link>
          </li> */}
          <li>
            <Link to="/referal" className="f-12 justify-content-between link-style">
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico f-20">
                  <PiMoneyFill />
                </span>
                REFERRAL
              </div>
            </Link>
          </li> 
          <li>
            <Link
              to="/auth/login"
              onClick={() => logout()}
              className="f-12 justify-content-between link-style"
            >
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico f-20">
                  <PiSignOutBold />
                </span>
                SIGN OUT
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
