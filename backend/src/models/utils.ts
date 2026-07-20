import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

export function checkAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET);
    if (user.role === 0) {
      return next();
    }
    res.json({ error: "Unauthorised" });
  }
}
