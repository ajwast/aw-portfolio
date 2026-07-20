import { Router } from "express";
import * as userController from "../controllers/userController";
import { checkAdmin } from "../models/utils";
const router = Router();

router.get("/", checkAdmin, userController.getUsers);

router.post("/", userController.createUser);

router.post("/login", userController.login);

router.delete("/", checkAdmin, userController.deleteUser);

export default router;
