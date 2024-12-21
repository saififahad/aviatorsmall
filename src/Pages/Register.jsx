import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useParams, useLocation } from "react-router-dom";
import { RiMessage2Line } from "react-icons/ri";
import { postData } from "../api/ClientFunction";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InstallButton from "../InstallButton";
import { FaRegAddressCard } from "react-icons/fa";
import { TbGenderMale } from "react-icons/tb";
import { FaMobileScreen } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { CiLock, CiMobile3 } from "react-icons/ci"; CiMobile3
import { IoSettingsOutline } from "react-icons/io5";
import { } from "react-icons/ci";
// import MainInstallButton from "../MainInstallButton";


const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll !important;
  background-color: #012348;
  height: 100vh;
  @media (max-width: 992px) {
    padding-top: 230px /* your desired padding-top value here */;
    padding-bottom: 64px;
  }
`;

const Register = () => {
  const location = useLocation();
  const [ref, setRef] = useState();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const refParam = searchParams.get("ref");
    if (refParam) {
      setRef(refParam);
    }
  }, [location.search]);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [mobile, setMobile] = useState();
  const [seconds, setSeconds] = useState(120);
  const [showOtpButton, setShowOtpButton] = useState(true);

  function startTimer() {
    setShowOtpButton(false);

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        // Ensure that seconds won't go below 0
        const newSeconds = prevSeconds > 0 ? prevSeconds - 1 : 0;

        if (newSeconds === 0) {
          // Timer has reached zero, perform any necessary actions here
          setShowOtpButton(true);
          clearInterval(interval);
        }

        return newSeconds;
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };

  async function onSubmit(data) {
    const url = "/auth/register";
    data.phone = mobile;
    const res = await postData(url, data);
    if (res.status === true) {
      Swal.fire(
        "Wow!..",
        "Registration Successfull!.., Now Login your account with your credientials"
      ).then(() => navigate("/auth/login"));
    } else if (res.status === false || res.success === false) {
      toast.error(res.message ? res.message : "something went wrong");
    }
  }

  async function sendOtp() {
    const phone = mobile;
    const url = `/auth/otp/verify`;
    const res = await postData(url, { phone: phone });
    if (res.status) {
      toast.success("otp sent successfully!..");
      startTimer();
    } else {
      toast.error("API Error, please try again!");
    }
  }

  return (
    <Wrapper className="active" id="via-email">
      <form
        className="register-form row w-75"
        onSubmit={handleSubmit(onSubmit)}
        style={{ color: "white", fontFamily: "Arial", paddingBottom: "100px" }}
      >
        <div className="install-button-div" style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
          {/* <MainInstallButton /> */}
        </div>
        <div className="register-heading" >
          <h2
            style={{
              fontFamily: "monospace",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Register
          </h2>
        </div>
        {/* Name Field */}
        <div className="col-md-6 col-12">
          <div className="input-group flex-nowrap mb-3 promocode align-items-center">
            <span className="input-group-text" id="addon-wrapping">
              <span className="material-symbols-outlined bold-icon"><FaRegAddressCard />
              </span>
            </span>
            <input
              required
              type="text"
              className="form-control ps-0"
              id="name"
              placeholder="Name"
              name="name"
              pattern="[A-Za-z ]+"
              title="Only alphabetic characters and spaces are allowed"
              {...register("name")}
            />
          </div>
        </div>

        {/* Gender Field */}
        <div className="col-md-6 col-12">
          <div className="input-group flex-nowrap mb-3 promocode align-items-center">
            <span className="input-group-text" id="addon-wrapping">
              <span className="material-symbols-outlined bold-icon"><TbGenderMale />
              </span>
            </span>
            <select
              required
              className="form-select custom-select"
              id="gender"
              name="gender"
              {...register("gender")}
            >
              <option value="" style={{ color: "black" }}>
                Select Gender
              </option>
              <option value="male" style={{ color: "black" }}>
                Male
              </option>
              <option value="female" style={{ color: "black" }}>
                Female
              </option>
            </select>
          </div>
        </div>
        {/* Mobile Field */}
        <div className="col-12" >
          <div className="input-group flex-nowrap mb-3 promocode align-items-center ">
            <span className="input-group-text" id="addon-wrapping">
              <span className="material-symbols-outlined bold-icon">
                <CiMobile3 />
              </span>
            </span>
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div>
                <input
                  required
                  type="text"
                  className="form-control ps-0"
                  id="mobile"
                  placeholder="Mobile"
                  name="mobile"
                  value={mobile || ""}
                  minLength="10"
                  maxLength="10"
                  pattern="\d*"
                  title="Please enter only numeric values"
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
              </div>
              {showOtpButton && (
                <button
                  className="btn green-btn px-4 text-white"
                  onClick={() => {
                    sendOtp();
                  }}
                >
                  Send Otp
                </button>
              )}
              {!showOtpButton && (
                <button className="btn green-btn px-4 text-white ">
                  Resend Otp In: {seconds}
                </button>
              )}
            </div>
          </div>
        </div>
        {/* otp Field */}
        <div className="col-12">
          <div className="input-group flex-nowrap mb-3 promocode align-items-center">
            <span className="input-group-text" id="addon-wrapping">
              <RiMessage2Line className="material-symbols-outlined bold-icon" />
            </span>
            <input
              required
              type="text"
              className="form-control ps-0"
              id="otp"
              placeholder="OTP"
              name="otp"
              {...register("otp")}
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="col-12">
          <div className="input-group flex-nowrap mb-3 promocode align-items-center">
            <span className="input-group-text" id="addon-wrapping">
              <span className="material-symbols-outlined bold-icon"><IoMailOutline />
              </span>
            </span>
            <input
              required
              type="email"
              className="form-control ps-0"
              id="email"
              placeholder="Email"
              name="email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Please enter a valid email address"
              {...register("email")}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="col-12">
          <div className="input-group flex-nowrap mb-3 promocode align-items-center">
            <span className="input-group-text" id="addon-wrapping">
              <span className="material-symbols-outlined bold-icon"><CiLock /></span>
            </span>
            <input
              required
              type={`${isVisible ? "text" : "password"}`}
              className="form-control ps-0"
              id="password"
              placeholder="Password"
              name="password"
              {...register("password")}
            />

            {!isVisible && (
              <FaRegEyeSlash
                className="material-symbols-outlined input-ico"
                onClick={() => setIsVisible(!isVisible)}
              />
            )}
            {isVisible && (
              <IoEyeOutline
                className="material-symbols-outlined input-ico"
                onClick={() => setIsVisible(!isVisible)}
              />
            )}
          </div>
        </div>

        {/* Promocode Field */}
        <div className="col-12">
          <div className="input-group flex-nowrap mb-3 promocode align-items-center">
            <span className="input-group-text" id="addon-wrapping">
              <span className="material-symbols-outlined bold-icon">
                <IoSettingsOutline />
              </span>
            </span>
            <input
              type="text"
              className="form-control ps-0"
              id="promocode"
              name="promocode"
              defaultValue={ref}
              placeholder="Enter Invite Code"
              {...register("promocode")}
            /> 
          </div>
        </div>
        {/* login page */}
        <div className="col-12 mb-2 ">
          <div className="checks-bg">
            <div
              className="pretty p-svg"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="state">
                <label>
                  Already have an account?{" "}
                  <span
                    className="text-white"
                    style={{ cursor: "pointer", important: "true" }}
                    onClick={() => navigate("/auth/login")}
                  >
                    Login
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Email Policy Checkbox */}
        <div className="col-12">
          <div className="checks-bg">
            <div
              className="pretty"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="state"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  required
                  type="checkbox"
                  name="terms"
                  id="terms"
                  {...register("terms")}
                  checked={termsChecked}
                  onClick={handleCheckboxChange}
                  style={{ width: "16px", height: "16px" }}
                />
                <label>
                  I confirm that I am of legal age and agree with the{" "}
                  <Link href="/">site rules</Link>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn orange-btn md-btn custm-btn-2 mx-auto mt-3 mb-0 registerSubmit"
          id="register_via_email"
        >
          Register
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;
