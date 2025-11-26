import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js";

// REGISTER
async function register(req, res) {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;

    if (!fullName || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists. Please login." });
    }

    const validRoles = ["applicant", "recruiter"];

    if (!validRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role. Allowed roles are applicant or recruiter only.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully.Please Login" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// LOGIN
async function login(req, res) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password, and role are required.",
      });
    }

    let user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "No such user exists. Please register.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid password. Please try again." });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: `User is not registered as 
        ${
          role === "applicant" ? "an" : "a"
        } ${role}. Please use the correct role to login.`,
      });
    }

    const token = generateToken(user._id);

    const cleanUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Login successful",
      token,
      user: cleanUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// UPDATE PROFILE
async function updateUserProfile(req, res) {
  try {
    const userId = req.user._id;

    const { fullName, email, phoneNumber, bio, skills } = req.body;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    //Update basic fields
    if (fullName !== undefined) user.fullName = fullName;
    if (email !== undefined) user.email = email;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (bio !== undefined) user.profile.bio = bio;

    if (skills !== undefined) {
      user.profile.skills = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // Handle resume upload
    if (req.file) {
      const originalName = req.file.originalname.replace(/\s+/g, "_");

      const cloudResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "jobportal_resumes",
              public_id: originalName,
              use_filename: true,
              unique_filename: false,
              overwrite: true,
              resource_type: "raw",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(req.file.buffer);
      });

      user.profile.resumeURL = cloudResult.secure_url;
      user.profile.resumeOriginalName = req.file.originalname;
    }

    //Save the user
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Update profile error" });
  }
}

export { register, login, updateUserProfile };
