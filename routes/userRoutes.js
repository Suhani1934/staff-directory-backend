// routes/userRoutes.js
import express from "express";
import {
  login,
  register,
  getAllStaff,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/register", upload.single("photo"), register);
router.post("/login", login);
router.get("/staff", getAllStaff);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, upload.single("photo"), updateProfile);

// change password
router.put("/change-password", protect, changePassword);

export default router;
