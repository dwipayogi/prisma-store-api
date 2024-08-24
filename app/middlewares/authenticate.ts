import { Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

// Token verification
export const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send("Token required");

  jwt.verify(token, secretKey, (err: Error, user: any) => {
    if (err) return res.status(403).send("Invalid or expired token");
    req.user = user;
    next();
  });
};
