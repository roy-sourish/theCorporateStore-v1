import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

/**
 * @desc   Create New Order
 * @route  POST => api/orders
 * @access Private
 */
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

/**
 * @desc   Get logged in user orders
 * @route  GET => api/orders/myorders
 * @access Private
 */
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

/**
 * @desc   Get order by id
 * @route  GET => api/orders/:id
 * @access Private
 */
export const getOrderById = asyncHandler(async (req, res) => {
  /* const order = await Order.find({ _id: req.params.id }).populate(
    "user",
    "name",
    "email"
  ); */
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @desc   update order to paid
 * @route  PUT => api/orders/:id/pay
 * @access Private
 */
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @desc   update order to delivered
 * @route  PUT => api/orders/:id/deliver
 * @access Private/Admin
 */
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

/**
 * @desc   get all orders
 * @route  GET => api/orders
 * @access Private/Admin
 */
export const getOrders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});
