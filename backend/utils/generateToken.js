import jwt from "jsonwebtoken";

export default function generateToken(id) {
  const token = jwt.sign(
    {
      id: id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return token;
}
