import express from "express";

import {
  applyJob,
  getAppliedJobs,
  getApplicantsForJob,
  updateApplicationStatus,
} from "../controllers/application.controller.js";

import auth from "../middlewares/authMiddleware.js";
import isApplicant from "../middlewares/isApplicant.js";
import isRecruiter from "../middlewares/isRecruiter.js";

const router = express.Router();

/**
 * APPLICANT ROUTES
 * ----------------------------
 */

// Apply for a job
router.post("/apply/:jobId", auth, isApplicant, applyJob);

// Get all jobs user has applied to
router.get("/my", auth, isApplicant, getAppliedJobs);

/**
 * RECRUITER ROUTES
 * ----------------------------
 */

// Get applicants for a specific job
router.get("/job/:jobId/applicants", auth, isRecruiter, getApplicantsForJob);

// Update application status (accept/reject/pending)
router.patch(
  "/status/:applicationId",
  auth,
  isRecruiter,
  updateApplicationStatus
);

export default router;
