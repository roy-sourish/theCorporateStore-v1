import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { clearCart } from "../slices/cartSlice.js";
import CheckoutSteps from "../components/CheckoutSteps.jsx";
import { useCreateOrderMutation } from "../slices/ordersApiSlice.js";

function PlaceOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = cart;

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();
      console.log(res);
      dispatch(clearCart());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <div className="max-w-fit mx-auto">
        <CheckoutSteps step1 step2 step3 step4 />
      </div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8 ">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">
          Shipping
        </h2>
        {shippingAddress && (
          <p className="border-b my-5 py-2">
            <strong>Address: </strong>
            {shippingAddress.address}, {shippingAddress.city},
            {shippingAddress.postalCode}, {shippingAddress.country}
          </p>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">
          Payment Method
        </h2>
        {paymentMethod && (
          <p className="border-b my-5 py-2">
            <strong>Method: </strong>
            {paymentMethod}
          </p>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">
          Order Items
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
                  <div className="w-96">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </div>
                  <div className="w-80">
                    {item.qty} x ${item.price} = $
                    {(item.qty * item.price).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Cart Summary */}
          <div className="flex-2 border p-5 md:w-48">
            <h3 className="text-xl tracking-tight text-grey-900 mb-5">
              Order Summary:
            </h3>

            <p className="border-b py-2 mb-5">Items: ${itemsPrice}</p>
            <p className="border-b py-2 mb-5">Shippping: ${shippingPrice}</p>
            <p className="border-b py-2 mb-5">Tax: ${taxPrice}</p>
            <p className="border-b py-2 mb-5">Total: ${totalPrice}</p>
            {error && toast.error(error)}
            <button
              className="btn btn-block"
              disabled={cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              {isLoading ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderPage;
