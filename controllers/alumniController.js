import Alumni from "../models/Alumni.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerAlumni = async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      designation,
      organization,
      location,
      passedOutYear,
      password,
    } = req.body;

    const photo = req.file?.path;

    if (!name || !email || !mobile || !designation || !organization || !location || !passedOutYear || !password || !photo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAlumni = await Alumni.findOne({ email });
    if (existingAlumni) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAlumni = new Alumni({
      name,
      mobile,
      email,
      designation,
      organization,
      location,
      passedOutYear,
      photo,
      password: hashedPassword,
    });

    await newAlumni.save();

    return res
      .status(201)
      .json({ message: "Alumni registered successfully!", alumni: newAlumni });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const loginAlumni = async (req, res) => {
  try {
    const { email, password } = req.body;

    const alumni = await Alumni.findOne({ email });
    if (!alumni) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, alumni.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: alumni._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: alumni._id,
        name: alumni.name,
        mobile: alumni.mobile,
        email: alumni.email,
        designation: alumni.designation,
        organization: alumni.organization,
        location: alumni.location,
        passedOutYear: alumni.passedOutYear,
        photo: alumni.photo,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllAlumniCount = async (req, res) => {
  try {
    const total = await Alumni.countDocuments();
    res.json({ total });
  } catch (error) {
    res.status(500).json({ message: 'Error getting alumni count' });
  }
};
export const getAllAlumni = async (req, res) => {
  try {
    const alumniList = await Alumni.find({});
    res.json(alumniList);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch alumni data" });
  }
};

export const getAlumniProfile = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.user._id).select("-password");
    if (alumni) {
      res.json(alumni);
    } else {
      res.status(404).json({ message: "Alumni not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};
