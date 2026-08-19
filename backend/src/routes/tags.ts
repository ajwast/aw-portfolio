import { Router } from "express";
import * as tagController from "../controllers/tagController";
import { checkAdmin } from "../models/utils";

const router = Router();

// Public endpoints
router.get("/", tagController.getTags);
router.get("/:id", tagController.getTag);

// Admin protected endpoints
router.post("/", checkAdmin, tagController.createTag);
router.patch("/:id", checkAdmin, tagController.updateTag);
router.put("/:id", checkAdmin, tagController.updateTag);
router.delete("/:id", checkAdmin, tagController.deleteTag);

export default router;
