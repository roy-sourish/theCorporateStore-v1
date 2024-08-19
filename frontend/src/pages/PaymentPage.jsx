import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="card bg-base-100 p-10 shadow-2xl max-w-[80%] mx-auto mt-14 mb-[120px]">
      <div className="mx-auto">
        <CheckoutSteps step1 step2 step3 />
      </div>
      <div className="form-control mt-5 mb-5">
        <h3 className="text-2xl tracking-tight text-gray-900 m-2">
          Payment Method
        </h3>
        <form onSubmit={submitHandler}>
          <label className="label cursor-pointer justify-start">
            <input
              type="radio"
              name="radio-10"
              value="PayPal"
              className="radio checked:bg-blue-500"
              defaultChecked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="label-text px-3">PayPal or Credit Card</span>
          </label>
          <button type="submit" className="btn w-full" disabled={false}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;
