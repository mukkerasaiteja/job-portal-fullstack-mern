import express from "express";

import {
  register,
  login,
  updateUserProfile,
} from "../controllers/user.controller.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/profile/update", auth, updateUserProfile);

export default router;
