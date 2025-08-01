import express from 'express';
import {
  registerStudent,
  loginStudent,
  getAllStudentsCount,
  getAllStudent,
} from '../controllers/studentController.js';

// image store on cloudinary
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.post('/register', upload.single('photo'), registerStudent);
router.post('/login',loginStudent)
router.get('/count', getAllStudentsCount);
router.get("/profiles",getAllStudent);

export default router;
