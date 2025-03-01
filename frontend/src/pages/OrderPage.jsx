import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
} from "../slices/ordersApiSlice";

import Loader from "../components/Loader";
import { toast } from "react-toastify";
import Badge from "../components/Badge";

function OrderPage() {
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Delivered");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    toast.error(error)
  ) : (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8 ">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">
            Order ID: {order._id}
          </h1>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">
            Shipping
          </h2>

          <div className="border-b mb-5 py-2">
            <div className="mb-3">
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
            </div>
            <Badge
              flag={order.isDelivered}
              lableTextFalse="Not Delivered"
              lableTextTrue="Order Delivered"
            />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">
            Payment Method
          </h2>

          <div className="border-b my-5 py-2">
            <p className="mb-5">
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            <Badge
              flag={order.isPaid}
              lableTextFalse="Not Paid"
              lableTextTrue="Paid"
            />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">
            Order Items
          </h2>
          <div className="">
            {/* Cart Details */}
            {order.orderItems.map((item) => {
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
        </div>

        {/* Cart Summary */}
        <div className="flex-2 border p-5 md:w-64 lg:w-96 h-fit">
          <h3 className="text-xl tracking-tight text-grey-900 mb-5">
            Order Summary:
          </h3>

          <p className="border-b py-2 mb-5">Items: ${order.itemsPrice}</p>
          <p className="border-b py-2 mb-5">
            Shippping: ${order.shippingPrice}
          </p>
          <p className="border-b py-2 mb-5">Tax: ${order.taxPrice}</p>
          <p className="border-b py-2 mb-5">Total: ${order.totalPrice}</p>
          {error && toast.error(error)}
          {/* Mark as delivered */}
          {userInfo && userInfo.isAdmin && order && (
            <button
              type="button"
              className="btn w-full"
              disabled={order.isPaid ? "true" : "false"}
              onClick={deliverOrderHandler}
            >
              {loadingDeliver ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                "Mark as Delivered"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
