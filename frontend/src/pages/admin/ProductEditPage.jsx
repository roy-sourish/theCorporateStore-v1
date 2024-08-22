import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../slices/productsApiSlice";
import { useDispatch } from "react-redux";

function ProductEditPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  console.log(product);
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  return (
    <form className="max-w-md md:max-w-xl mx-auto mt-5 mb-20">
      <h1 className="text-3xl my-2 tracking-tight">Edit Product</h1>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          value={name}
          className="input input-bordered w-full  rounded"
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Price</span>
        </div>
        <input
          type="Number"
          placeholder="Price"
          value={price}
          className="input input-bordered w-full  rounded"
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Brand</span>
        </div>
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          className="input input-bordered w-full  rounded"
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Count In Stock</span>
        </div>
        <input
          type="Number"
          placeholder="Count In Stock"
          value={countInStock}
          className="input input-bordered w-full  rounded"
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Category</span>
        </div>
        <input
          type="text"
          placeholder="Category"
          value={category}
          className="input input-bordered w-full rounded"
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Description</span>
        </div>
        <textarea
          placeholder="Description"
          value={description}
          className="textarea textarea-bordered textarea-md w-full rounded"
        ></textarea>
      </label>
      <button type="submit" className="btn btn-wide my-5">
        Submit
      </button>
    </form>
  );
}

export default ProductEditPage;
