import React from "react";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <div key={product._id} className="group shadow-xl p-3 rounded-md ">
      <Link to={`/product/${product._id}`}>
        <div className=" w-full overflow-hidden rounded-md bg-gray-200  group-hover:opacity-75 ">
          <img
            alt={product.name}
            src={product.image}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <div>
            <h3 className="text-base text-gray-700">{product.name}</h3>
          </div>
          <p className="text-lg font-medium text-gray-900">$ {product.price}</p>
        </div>
      </Link>
    </div>
  );
}

export default Product;
