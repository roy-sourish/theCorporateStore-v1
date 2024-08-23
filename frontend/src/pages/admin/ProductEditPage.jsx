import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

function ProductEditPage() {
  const navigate = useNavigate();

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

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadinUpload }] =
    useUploadProductImageMutation();

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

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };
    const result = await updateProduct(updatedProduct);
    if (result.err) {
      toast.error(result.error);
    } else {
      toast.success("Product Updated");
      navigate("/admin/productlist");
    }
  };

  const uploadFileHandler = async (e) => {
    const fd = new FormData();
    fd.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(fd).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div>
      <form
        className="max-w-md md:max-w-xl mx-auto mt-5 mb-20"
        onSubmit={submitHandler}
      >
        <div className="breadcrumbs text-sm ">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/admin/productlist">Manage Products</Link>
            </li>
            <li>Edit {name}</li>
          </ul>
        </div>
        <h1 className="text-3xl my-2 tracking-tight">Edit Product</h1>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full rounded"
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
            onChange={(e) => setPrice(e.target.value)}
            className="input input-bordered w-full rounded"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Image</span>
          </div>
          <input
            type="text"
            placeholder="Enter Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="input input-bordered w-full rounded"
          />
          <input
            type="file"
            onChange={uploadFileHandler}
            className="file-input file-input-bordered w-full rounded"
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
            onChange={(e) => setBrand(e.target.value)}
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
            onChange={(e) => setCountInStock(Number(e.target.value))}
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
            onChange={(e) => setCategory(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered textarea-md w-full rounded"
          ></textarea>
        </label>
        <button type="submit" className="btn btn-wide my-5">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProductEditPage;
