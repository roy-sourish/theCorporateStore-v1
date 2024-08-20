import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function OrderPage() {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  console.log(order);

  return isLoading ? (
    <Loader />
  ) : error ? (
    toast.error(error)
  ) : (
    <div>
      <h1>{order._id}</h1>
    </div>
  );
}

export default OrderPage;
