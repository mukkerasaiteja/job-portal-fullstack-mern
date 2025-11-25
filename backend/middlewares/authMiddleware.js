import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

async function auth(req, res, next) {
  try {
    let token;

    // Expect: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.id = decoded.id; // attach id

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User no longer exists." });
    }

    req.user = user; // attach full user

    next();
  } catch (err) {
    console.error("Auth Error:", err);

    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please login again." });
    }

    return res.status(401).json({ message: "Invalid token." });
  }
}

export default auth;
