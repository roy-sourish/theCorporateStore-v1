import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useGetMyOrdersQuery } from "../slices/ordersApiSlice.js";
import { useProfileMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import Badge from "../components/Badge.jsx";
import Loader from "../components/Loader.jsx";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading }] = useProfileMutation();
  const {
    data: orders,
    isLoading: isOrdersLoading,
    error: orderError,
  } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated");
        navigate("/");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

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

  return (
    <div className="flex flex-col gap-2 max-w-screen-xl mx-auto md:flex-row">
      {/* Update Profile */}
      <form
        className="card bg-base-100 p-10 min-w-96 mx-auto shadow-2xl mt-14 mb-[174px] flex-2"
        onSubmit={submitHandler}
      >
        <h2 className="text-2xl  tracking-tight text-gray-900 text-center p-5">
          Profile
        </h2>
        {/* Name */}
        <label className="input input-bordered flex items-center gap-2 mb-3 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>

          <input
            type="text"
            className="grow"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {/* Email */}
        <label className="input input-bordered flex items-center gap-2 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {/* Password */}
        <label className="input input-bordered flex items-center gap-2 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {/* Confirm Password */}
        <label className="input input-bordered flex items-center gap-2 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="btn w-full" disabled={isLoading}>
          {isLoading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Update"
          )}
        </button>
      </form>
      {/* Orders */}
      <div className=" flex-1 card bg-base-100 p-10 shadow-2xl mx-auto mt-14 mb-[174px]">
        <h2 className="text-2xl  tracking-tight text-gray-900 text-center p-5">
          My Orders
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
              <table className="table table-zebra text-center">
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

export default ProfilePage;
