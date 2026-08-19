import { Request, Response } from "express";
import * as tagService from "../services/tagService";

export async function getTags(req: Request, res: Response) {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
}

export async function getTag(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params;
    const tag = await tagService.getTagById(Number(id));

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.json(tag);
  } catch (error) {
    console.error("Error fetching tag:", error);
    res.status(500).json({ error: "Failed to fetch tag" });
  }
}

export async function createTag(req: Request, res: Response) {
  try {
    const { name } = req.body;
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Tag name is required." });
    }

    const newTag = await tagService.createTag(name);
    res.status(201).json({ message: "Tag created successfully", tag: newTag });
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ error: "Failed to create tag. Tag name may already exist." });
  }
}

export async function updateTag(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Updated tag name is required." });
    }

    const updatedTag = await tagService.updateTag(Number(id), name);
    res.json({ message: "Tag updated successfully", tag: updatedTag });
  } catch (error) {
    console.error("Error updating tag:", error);
    res.status(500).json({ error: "Failed to update tag" });
  }
}

export async function deleteTag(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params;
    const deletedTag = await tagService.deleteTag(Number(id));
    res.json({ message: "Tag deleted successfully", tag: deletedTag });
  } catch (error) {
    console.error("Error deleting tag:", error);
    res.status(500).json({ error: "Failed to delete tag" });
  }
}
