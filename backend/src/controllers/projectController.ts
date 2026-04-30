import { Request, Response } from "express";
import * as projectService from "../services/projectService";

export async function getProjects(req: Request, res: Response) {
  try {
    const allProjects = await projectService.getAllProjects();
    res.json(allProjects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
}
{
}
