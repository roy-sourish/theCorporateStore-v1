import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetProductDetailsQuery } from "../slices/productsApiSlice.js";
import Loader from "../components/Loader.jsx";
import { addToCart } from "../slices/cartSlice.js";

function ProductDetailPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="max-w-screen-xl mx-auto p-10 ">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
          {/* Breadcrumb navigation */}
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link>{product.name}</Link>
              </li>
            </ul>
          </div>

          {/* Product Details */}
          <div className="flex gap-10 mt-5 justify-center h-[32rem]">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="min-w-64 max-w-96"
              />
            </div>
            <div>
              <h2 className="text-2xl mb-2">{product.name}</h2>
              <p>{product.description}</p>

              <div className="overflow-x-auto w-fit mt-5">
                <table className="table table-auto table-zebra">
                  {/* head */}
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {/* row 2 */}
                    <tr>
                      <td>Price: $ {product.price} </td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <td>Rating: {product.rating} star</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <td>
                        Stock:
                        {product.countInStock ? " Available" : " Out of Stock"}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex gap-5 justify-around items-start mt-5">
                  <select
                    className="select select-bordered w-full max-w-xs"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  <button
                    className="btn"
                    disabled={!product.countInStock}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetailPage;
