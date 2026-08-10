import { Router } from "express";
import * as userController from "../controllers/userController";
import { checkAdmin } from "../models/utils";
import rateLimit from "express-rate-limit";
const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: "You have tried to log in too many times. Try again later.",
});

router.get("/", checkAdmin, userController.getUsers);

router.post("/", userController.createUser);

router.post("/login", loginLimiter, userController.login);

router.delete("/", checkAdmin, userController.deleteUser);

export default router;
