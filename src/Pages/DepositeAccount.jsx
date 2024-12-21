import React, { useEffect, useState } from "react";
import { useAuth } from "../ContextAndHooks/AuthContext";
import "./Depositeaccount.css";
import useSWR from "swr";
import { RiMessage2Line } from "react-icons/ri";
import { fetchData, postData } from "../api/ClientFunction";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CiLock } from "react-icons/ci";
import { MdOutlineBadge } from "react-icons/md";
import { CiMobile3 } from "react-icons/ci";
import { PiMoneyFill } from "react-icons/pi";



const DepositeAmount = () => {
  const [adminBank, setAdminBank] = useState({});
  const { data } = useSWR("/admin/getadminbank", fetchData);
  // const [file, setFile] = useState(null);
  useEffect(() => {
    if (data && data.data) {
      setAdminBank(data.data);
    }
  }, [data]);
  const [mwl, setMwl] = useState(250);
  const { data: newData } = useSWR("/user/minwl", fetchData);
  useEffect(() => {
    if (newData && newData.data) {
      setMwl(newData.data);
    }
  }, [newData]);
  const queryClient = useQueryClient();
  const { user, bank } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || user?.name_user || "",
      email: user?.email || "",
      phone: user?.phone || "",
      amount: "",
      txn_id: "",
      screenshot: null,
    },
  });
  const [money, setMoney] = useState();
  const [phone, setPhone] = useState();
  console.log(phone)
  useEffect(() => {
    if (user && user.money && user.phone) {
      setMoney(user.money);
      setPhone(user.phone);
    }
  }, [user]);

  const onSubmit = async (data) => {
    // Trim all data values
    if (!user?.phone) {
      return toast.error("Can't deposit!..., please login again.");
    }
    if (data.phone != phone) {
      return toast.error("Phone Number must be your registerd phone number.")
    }
    const formData = new FormData();
    if (data.amount < 100) {
      return toast.error("Minimum deposit amount is 100")
    }
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("amount", data.amount);
    formData.append("txn_id", data.txn_id);
    formData.append("screenshot", data.screenshot[0]);
    formData.append("mobile", user?.phone);
    // Convert FormData to a plain JavaScript object for logging
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    const res = await postData("/user/deposit", formData);
    if (res.status) {
      toast.success(res.message);
    } else {
      toast.error("something went wrong!...");
    }
  };

  return (
    <div>
      <div className="deposite-container mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-md-3 d-flex">
              <div className="w-100 bg-white">
                <div className="custom-accordian ">
                  <div className="accordian-header">
                    <h3>PAY BY NEFT / IMPS OR NETBANKING</h3>
                    <button className="btn btn-transparent p-0 accrodian-btn">
                      <span className="material-symbols-outlined bold-icon text-white">
                        expand_circle_down
                      </span>
                    </button>
                  </div>
                  <div className="accordian-body">
                    <div style={{ height: "60px" }} className="acc-row">
                      <div className="row-controls">
                        <div className="left">Bank Name</div>
                        <div className="right">
                          <div className="d-flex align-items-center">
                            <div>{adminBank?.bankName}</div>
                            <button className="btn btn-transparent p-0 lh-18 ms-1">
                              <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                                <CiLock />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ height: "60px" }} className="acc-row">
                      <div className="row-controls">
                        <div className="left">Account Holder Name</div>
                        <div className="right">
                          <div className="d-flex align-items-center">
                            <div>{adminBank?.accountNumber}</div>
                            <button className="btn btn-transparent p-0 lh-18 ms-1">
                              <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                                <CiLock />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ height: "60px" }} className="acc-row">
                      <div className="row-controls">
                        <div className="left">Account number</div>
                        <div className="right">
                          <div className="d-flex align-items-center">
                            <div>{adminBank?.accountHolderName}</div>
                            <button className="btn btn-transparent p-0 lh-18 ms-1">
                              <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                                <CiLock />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ height: "60px" }} className="acc-row">
                      <div className="row-controls">
                        <div className="left">IFSC Code</div>
                        <div className="right">
                          <div className="d-flex align-items-center">
                            <div>{adminBank?.ifscCode}</div>
                            <button className="btn btn-transparent p-0 lh-18 ms-1">
                              <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                                <CiLock />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ height: "60px" }} className="acc-row">
                      <div className="row-controls">
                        <div className="left">UPI</div>
                        <div className="right">
                          <div className="d-flex align-items-center">
                            <div>{adminBank?.upiId}</div>
                            <button className="btn btn-transparent p-0 lh-18 ms-1">
                              <span className="material-symbols-outlined bold-icon text-muted f-18 lh-18">
                                <CiLock />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-md-3 d-flex">
              <div className="w-100 bg-white">
                <div className="custom-accordian">
                  <div className="accordian-header">
                    <h3>PAY BY QR</h3>
                    <button className="btn btn-transparent p-0 accrodian-btn">
                      <span className="material-symbols-outlined bold-icon text-white">
                        expand_circle_down
                      </span>
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      margin: "auto",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      style={{
                        width: "250px",
                        height: "250px",
                        marginTop: "20px",
                      }}
                      src={`${process.env.REACT_APP_API_URL}${adminBank?.barCode}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="active d-flex justify-content-center  "
            id="via-email"
            style={{ marginTop: "48px  " }}
          >
            <form
              className="register-form row w-75"
              onSubmit={handleSubmit(onSubmit)}
              style={{ color: "white", marginBottom: "20px" }}
              encType="multipart/form-data"
            >
              {/* Name Field */}
              <div className="col-12">
                <div className="input-group flex-nowrap mb-3 promocode align-items-center">
                  <span className="input-group-text" id="addon-wrapping">
                    <span className="material-symbols-outlined bold-icon">
                      <MdOutlineBadge />
                    </span>
                  </span>
                  <input
                    required
                    type="text"
                    className={`form-control ps-0 ${errors.name ? "is-invalid" : ""
                      }`}
                    id="name"
                    placeholder="Your Name"
                    name="name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Email Field */}
              {/* <div className="col-12">
                <div className="input-group flex-nowrap mb-3 promocode align-items-center">
                  <span className="input-group-text" id="addon-wrapping">
                    <span className="material-symbols-outlined bold-icon">
                      badge
                    </span>
                  </span>
                  <input
                    required
                    type="email"
                    className={`form-control ps-0 ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    placeholder="Your Email"
                    name="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>
              </div> */}

              {/* Phone Field */}
              <div className="col-12">
                <div className="input-group flex-nowrap mb-3 promocode align-items-center">
                  <span className="input-group-text" id="addon-wrapping">
                    <span className="material-symbols-outlined bold-icon">
                      <CiMobile3 />
                    </span>
                  </span>
                  <input
                    required
                    type="tel"
                    className={`form-control  ps-0 ${errors.phone ? "is-invalid" : ""
                      }`}
                    style={{ width: "100%" }}
                    id="phone"
                    placeholder="Your Phone"
                    name="phone"
                    {...register("phone", {
                      required: "Phone is required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Invalid phone number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">
                      {errors.phone.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Withdraw Amount Field */}
              <div className="col-12">
                <div className="input-group flex-nowrap mb-3 promocode align-items-center">
                  <span className="input-group-text" id="addon-wrapping">
                    <span className="material-symbols-outlined bold-icon">
                      <PiMoneyFill />
                    </span>
                  </span>
                  <input
                    required
                    type="number"
                    className={`form-control ps-0 ${errors.amount ? "is-invalid" : ""
                      }`}
                    id="amount"
                    placeholder="Amount"
                    name="amount"
                    {...register("amount", {
                      required: "Amount is required",
                    })}
                  />
                  {errors.amount && (
                    <div className="invalid-feedback">
                      {errors.amount.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Transaction ID Field */}
              <div className="col-12">
                <div className="input-group flex-nowrap mb-3 promocode align-items-center">
                  <span className="input-group-text" id="addon-wrapping">
                    <span className="material-symbols-outlined bold-icon">
                    <MdOutlineBadge />
                    </span>
                  </span>
                  <input
                    required
                    type="text"
                    className={`form-control ps-0 ${errors.txn_id ? "is-invalid" : ""
                      }`}
                    id="txn_id"
                    placeholder="Transaction ID"
                    name="txn_id"
                    {...register("txn_id", {
                      required: "Transaction ID is required",
                    })}
                  />
                  {errors.txn_id && (
                    <div className="invalid-feedback">
                      {errors.txn_id.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Screenshot Field (File Input) */}
              <div className="col-12">
                <div className="input-group flex-nowrap mb-3 promocode align-items-center">
                  <span className="input-group-text" id="addon-wrapping">
                    <RiMessage2Line className="material-symbols-outlined bold-icon" />
                  </span>
                  <input
                    required
                    type="file"
                    className={`form-control ps-0 ${errors.screenshot ? "is-invalid" : ""
                      }`}
                    id="screenshot"
                    placeholder="Screenshot"
                    name="screenshot"
                    accept="image/*"
                    {...register("screenshot", {
                      required: "Screenshot is required",
                    })}
                  />
                  {errors.screenshot && (
                    <div className="invalid-feedback">
                      {errors.screenshot.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn orange-btn md-btn custm-btn-2 mx-auto mt-3 mb-0 registerSubmit"
                id="withdraw"
              >
                Deposit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositeAmount;
