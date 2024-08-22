import React from "react";

import Loader from "../../components/Loader.jsx";
import Badge from "../../components/Badge.jsx";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice.js";
import { Link } from "react-router-dom";

/* SVG X icon */
const xIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mx-auto"
    fill="none"
    viewBox="0 0 24 24"
    stroke="red"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

function OrderListPage() {
  const {
    data: orders,
    isLoading: isOrdersLoading,
    error: orderError,
  } = useGetOrdersQuery();

  return (
    <div>
      <div className=" xl:max-w-screen-xl lg:max-w-screen-lg sm:max-w-screen-sm mx-auto mt-14 mb-[174px]">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900  p-5">
          Manage Orders
        </h2>

        {isOrdersLoading ? (
          <Loader />
        ) : orderError ? (
          <Badge
            flag={false}
            lableTextFalse={orderError?.data?.message || orderError?.error}
          />
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="table table-zebra text-center table-xs sm:table-md">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <th>1</th>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? order.paidAt.substring(0, 10) : xIcon}
                      </td>
                      <td>
                        {order.isDelivered
                          ? order.deliveredAt.substring(0, 10)
                          : xIcon}
                      </td>
                      <td>
                        <Link
                          to={`/order/${order._id}`}
                          className="btn btn-xs btn-outline"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderListPage;
