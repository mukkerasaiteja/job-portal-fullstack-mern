import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

async function auth(req, res, next) {
  try {
    let token;

    // Expecting: Authorization: Bearer <token>
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id for controllers that rely on req.id
    req.id = decoded.id;

    // Fetch user (without password)
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "User no longer exists.",
      });
    }

    req.user = user; // attach full user object

    next();
  } catch (err) {
    console.error("Auth Error:", err);

    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
}

export default auth;
