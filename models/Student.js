import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    course: { type: String, required: true },
    year: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    areaOfInterest: { type: [String], required: true },
    skills: { type: [String], required: true },
    address: { type: String, required: true },
    photo: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "student" },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
