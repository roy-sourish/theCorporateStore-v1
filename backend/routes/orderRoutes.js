import express from "express";

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/", protect, admin, getOrders);

router.get("/mine", protect, getMyOrders);

router.get("/:id", protect, getOrderById);
router.get("/:id/pay", protect, updateOrderToPaid);
router.get("/:id/deliver", protect, admin, updateOrderToDelivered);

export default router;
