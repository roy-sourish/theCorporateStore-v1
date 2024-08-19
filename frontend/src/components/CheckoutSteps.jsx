import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div>
      <ul className="steps">
        {step1 ? (
          <li className="step step-primary">
            <Link to="/login">Sign In</Link>
          </li>
        ) : (
          <li className="step">Sign In</li>
        )}
        {step2 ? (
          <li className="step step-primary">
            <Link to="/shipping">Shipping</Link>
          </li>
        ) : (
          <li className="step">Shipping</li>
        )}
        {step3 ? (
          <li className="step step-primary">
            <Link to="/payment">Payment</Link>
          </li>
        ) : (
          <li className="step">Payment</li>
        )}
        {step4 ? (
          <li className="step step-primary">
            <Link to="/placeorder">Place Order</Link>
          </li>
        ) : (
          <li className="step">Place Order</li>
        )}
      </ul>
    </div>
  );
};

export default CheckoutSteps;
