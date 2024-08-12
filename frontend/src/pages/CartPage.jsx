import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../slices/cartSlice";

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    useSelector((state) => state.cart);

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8 ">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-10">
        Shopping Cart
      </h2>
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="flex-1">
          {/* Cart Details */}
          {cartItems.map((item) => {
            return (
              <div
                key={item._id}
                className="flex flex-row items-center gap-5 p-5 border-b"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 rounded-sm"
                />
                <div className="w-96">{item.name}</div>
                <div className="w-24">${item.price}</div>
                <select
                  className="select select-bordered  w-24"
                  value={item.qty}
                  onChange={(e) =>
                    addToCartHandler(item, Number(e.target.value))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-circle"
                  onClick={() => removeFromCartHandler(item._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
        {/* Cart Summary */}
        <div className="flex-2 border p-5 md:w-48">
          <h3 className="text-xl tracking-tight text-grey-900 mb-5">
            Subtotal:
          </h3>
          <p className="border-b py-2 mb-5">${totalPrice}</p>
          <button
            className="btn btn-block"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
