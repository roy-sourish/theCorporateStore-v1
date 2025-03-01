import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useLogoutMutation } from "../slices/usersApiSlice.js";
import { logout } from "../slices/authSlice.js";
import { toast } from "react-toastify";

function Navbar() {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-base-100 max-w-screen-xl mx-auto p-3">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          theCorporate
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cartItems.length && cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">
                {cartItems.length && cartItems.reduce((a, c) => a + c.qty, 0)}
                {cartItems.length > 1 ? " Items" : " Item"}
              </span>
              <span className="text-info">Subtotal: ${totalPrice}</span>
              <div className="card-actions">
                <Link to="/cart" className="btn btn-primary btn-block">
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        {!userInfo && (
          <Link to="/login" className="btn">
            Sign In
          </Link>
        )}
        {userInfo && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Link></Link>
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">{userInfo.name}</span>
                </Link>
              </li>
              {userInfo && userInfo.isAdmin && (
                <>
                  <li>
                    <Link to="/admin/productlist" className="justify-between">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/userlist" className="justify-between">
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/orderlist" className="justify-between">
                      Orders
                    </Link>
                  </li>
                </>
              )}
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
