import { Router } from "express";
import * as postController from "../controllers/postController";
import { checkAdmin } from "../models/utils";

const router = Router();

router.get("/", postController.getPosts);
router.get("/:slug", postController.getPost);

router.post("/", (req, res) => {});
router.delete("/", (req, res) => {});

export default router;
