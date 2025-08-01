import express from "express";
import {
  registerAlumni,
  loginAlumni,
  getAllAlumniCount,
  getAllAlumni,
  // getAlumniProfile,
} from "../controllers/alumniController.js";
import { protectAlumni } from "../middlewares/authMiddleware.js";

import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/register",upload.single("photo"), registerAlumni);
router.post("/login", loginAlumni);

router.get("/count",getAllAlumniCount);
router.get("/profiles",getAllAlumni);
// router.get("/profile", protectAlumni, getAlumniProfile);

export default router;
