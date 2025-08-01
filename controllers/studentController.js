import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerStudent = async (req, res) => {
  try {
    const {
      name,
      course,
      year,
      mobile,
      email,
      gender,
      areaOfInterest,
      skills,
      address,
      password,
    } = req.body;

    if (
      !name ||
      !course ||
      !year ||
      !mobile ||
      !email ||
      !gender ||
      !areaOfInterest ||
      !skills ||
      !address ||
      !password
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const photo = req.file?.path; // cloudinary full path

    const newStudent = new Student({
      name,
      course,
      year,
      mobile,
      email,
      gender,
      areaOfInterest: JSON.parse(areaOfInterest),
      skills: JSON.parse(skills),
      address,
      photo,
      password: hashedPassword,
    });

    await newStudent.save();
    res.status(201).json({
      message: "Student registered successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: student._id,
        name:student.name,
        course:student.course,
        year:student.year,
        mobile:student.mobile,
        email:student.email,
        gender:student.gender,
        areaOfInterest:student.areaOfInterest,
        skills:student.skills,
        address:student.address,
        photo:student.photo,
      },
    });
  } catch (err) {
    console.error("Student Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllStudentsCount = async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Error getting student count" });
  }
};

export const getAllStudent = async(req,res)=>{
  try {
    const studentList = await Student.find({});
    res.json(studentList);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch alumni data" });
  }
}