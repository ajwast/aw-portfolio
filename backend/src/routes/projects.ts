import { Router } from "express";
import * as projectController from "../controllers/projectController";
import { checkAdmin } from "../models/utils";
const router = Router();

router.get("/", projectController.getProjects);

router.post("/", checkAdmin, projectController.createProject);

router.patch("/", checkAdmin, projectController.updateProject);

router.delete("/:id", checkAdmin, projectController.deleteProject);

export default router;
