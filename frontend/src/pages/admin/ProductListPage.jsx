import React from "react";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Badge from "../../components/Badge";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

function ProductListPage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const deleteHandler = (productId) => {
    console.log("delete" + productId);
  };
  return (
    <div>
      <div className=" xl:max-w-screen-xl lg:max-w-screen-lg sm:max-w-screen-sm mx-auto mt-14 mb-[174px]">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight  p-5">
            Manage Products
          </h2>
          <button className="btn btn-wide">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.2"
                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
              />
            </svg>
            Create Product
          </button>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Badge
            flag={false}
            lableTextFalse={error?.data?.message || error?.error}
          />
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="table table-zebra table-xs sm:table-md">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <th></th>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>$ {product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <>
                          <Link
                            to={`/admin/product/${product._id}/edit`}
                            className="btn btn-xs btn-warning mx-3"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-xs btn-error"
                            onClick={() => deleteHandler(product._id)}
                          >
                            Delete
                          </button>
                        </>
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

export default ProductListPage;
