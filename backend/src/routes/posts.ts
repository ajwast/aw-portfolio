import { Router } from "express";
import * as postController from "../controllers/postController";
import { checkAdmin } from "../models/utils";

const router = Router();

// Public post endpoints
router.get("/", postController.getPosts);
router.get("/tags", postController.getTags);
router.get("/:slug", postController.getPost);

// Admin protected endpoints
router.post("/", checkAdmin, postController.createPost);
router.delete("/:id", checkAdmin, postController.deletePost);

// Tag management
router.post("/tags", checkAdmin, postController.createTag);
router.delete("/tags/:id", checkAdmin, postController.deleteTag);

export default router;

