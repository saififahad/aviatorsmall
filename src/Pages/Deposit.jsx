import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../ContextAndHooks/AuthContext";
import {
  fetchData,
  generateRandomEmail,
  generateTransactionId,
  postData,
} from "../api/ClientFunction";
import { useLocation } from "react-router-dom";
import DepositeAmount from "./DepositeAccount";
import useSWR from "swr";
const Deposit = () => {
  const [show, setShow] = useState();
  const { data, loading } = useSWR("/admin/getgatewaykey", fetchData);
  console.log("🚀 ~ Deposit ~ data:", data)
  useEffect(() => {
    if (data && data.data) {
      setShow(data.data.keyenable);
    }
  }, [data]);
  const location = useLocation();
  const [message, setMessage] = useState();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setMessage(errorParam);
    }
  }, [location.search]);

  useEffect(() => {
    if (
      message ===
      "Transection Sucessfull, Amount Has been added to your account!..."
    ) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }, [message]);

  const { user, gateWayKey } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      depositAmount: "",
    },
  });
  const onSubmit = async (data) => {

    if (data.depositAmount < 100) {
      toast.error("Minimum deposit amount is 100");
      return;
    }

    const depositData = {
      key: String(gateWayKey),
      p_info: "avaitor",
      customer_mobile: user?.phone,
      customer_email: user?.email || generateRandomEmail(),
      customer_name: user?.name || user?.name_user,
      amount: data.depositAmount,
      client_txn_id: generateTransactionId(user?.phone),
      redirect_url: `${process.env.REACT_APP_API_URL}/admin/getpaymentdetails`,
    };
    const res = await postData(
      // "https://api.ekqr.in/api/create_order",
      "/user/proxy/create_order",
      depositData
    );
    if (res.data.status) {
      toast.success(res.data.msg);
      window.open(res.data.data.payment_url);
    } else {
      toast.error(res.data.msg ? res.data.msg : res.msg);
    }
  };

  return (
    <div>
      {show === 1 && (
        <div
          className="active d-flex justify-content-center"
          style={{ marginTop: "48px", marginBottom: "50vh" }}
        >
          <form
            className="register-form w-75"
            onSubmit={handleSubmit(onSubmit)}
            style={{
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontFamily: "cursive",
              marginBottom: "20px",
            }}
          >
            <h2>Deposit</h2>

            {/* Deposit Amount Field */}
            <div className="mb-3 col-md-6 mt-2">
              <div className="input-group">
                <span className="input-group-text">
                  <span className="material-symbols-outlined bold-icon">
                    badge
                  </span>
                </span>
                <input
                  required
                  type="number"
                  style={{ color: "white", width: "max-contant" }}
                  className={`form-control ${errors.depositAmount ? "is-invalid" : ""
                    }`}
                  placeholder="Deposit Amount"
                  {...register("depositAmount", {
                    required: "Deposit amount is required",
                  })}
                />
                {errors.depositAmount && (
                  <div className="invalid-feedback">
                    {errors.depositAmount.message}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn orange-btn md-btn custm-btn-2 mx-auto mt-3 mb-0 registerSubmit"
              id="deposit"
            >
              DEPOSIT
            </button>
          </form>
        </div>
      )}
      {show === 0 && (
        <div>
          <DepositeAmount />
        </div>
      )}
    </div>
  );
};

export default Deposit;
