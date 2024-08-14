import express from "express";

import { protect, admin } from "../middleware/authMiddleware.js";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, admin, getUsers);
router.post("/", registerUser);

router.post("/logout", logoutUser);
router.post("/login", authUser);

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);

export default router;
