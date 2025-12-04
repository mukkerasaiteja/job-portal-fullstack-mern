import express from "express";
import {
  postJob,
  getAllJobs,
  getJobById,
  getJobsByAdmin,
  deleteJob,
  updateJob,
} from "../controllers/job.controller.js";

import auth from "../middlewares/authMiddleware.js";
import isRecruiter from "../middlewares/isRecruiter.js";

const router = express.Router();

/**
 * PUBLIC ROUTES
 * ----------------------------
 * Anyone can view jobs or details
 */

// Get all jobs
router.get("/", getAllJobs);

/**
 * RECRUITER ROUTES
 * ----------------------------
 * Only recruiters can post jobs or view their job dashboard
 */

// Post a new job
router.post("/", auth, isRecruiter, postJob);

// Get jobs posted by logged-in recruiter (must be before /:jobId)
router.get("/my/jobs", auth, isRecruiter, getJobsByAdmin);

// Update a job
router.put("/:jobId", auth, isRecruiter, updateJob);

// Delete a job
router.delete("/:jobId", auth, isRecruiter, deleteJob);

// Get a job by ID
router.get("/:jobId", getJobById);

export default router;
