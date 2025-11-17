export default function isApplicant(req, res, next) {
  if (req.user.role !== "applicant") {
    return res.status(403).json({ message: "Access denied. Applicant only." });
  }
  next();
}
