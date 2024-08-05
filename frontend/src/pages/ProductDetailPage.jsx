import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetailPage() {
  const [product, setProduct] = useState({});
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  return (
    <div className="max-w-screen-xl mx-auto p-10 ">
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

      <div className="flex gap-10 mt-5  justify-center">
        <div className=" ">
          <img
            src={product.image}
            alt={product.name}
            className="min-w-64 max-w-96"
          />
        </div>

        <div className="">
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
                    Stock: {product.countInStock ? "Available" : "Out of Stock"}
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="btn mt-3">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
