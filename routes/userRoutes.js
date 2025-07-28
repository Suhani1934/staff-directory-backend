// routes/userRoutes.js
import express from "express";
import { register,login, getAllStaff } from "../controllers/authController.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/register", upload.single("photo"), register);
router.post("/login", login);
router.get("/staff", getAllStaff);

export default router;
