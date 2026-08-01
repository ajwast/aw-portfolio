import { Router } from "express";
import * as projectController from "../controllers/projectController";
import { checkAdmin } from "../models/utils";
const router = Router();

//CRUD endpoints
router.get("/", projectController.getProjects);

router.post("/", checkAdmin, projectController.createProject);

router.patch("/", checkAdmin, projectController.updateProject);

router.delete("/:id", checkAdmin, projectController.deleteProject);

//Tag filtering

//Get all projects associated with a tag
router.get("/tag/:id", projectController.getProjectsByTag);
//Get all tags associated with a project
router.get("/project-tags/:id", projectController.getTagsonProject);

export default router;
