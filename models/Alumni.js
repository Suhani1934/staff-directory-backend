import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    designation: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    passedOutYear: {
      type: Number,
      required: true,
    },
    photo: {
      type: String, // Cloudinary url
      required: true,
    },
    password: { type: String, required: true },
    role: { type: String, default: "alumni" },
  },
  {
    timestamps: true,
  }
);

const Alumni = mongoose.model("Alumni", alumniSchema);

export default Alumni;
