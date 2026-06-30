import { Request, Response } from "express";
import * as projectService from "../services/projectService";

interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  image: string;
}

export async function getProjects(req: Request, res: Response) {
  try {
    const allProjects = await projectService.getAllProjects();
    res.json(allProjects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
}

export async function createProject(req: Request, res: Response) {
  try {
    const { id, name, description, link, image } = req.body;
    const project: Project = { id, name, description, link, image };
    const newProject = await projectService.createProject(project);
    res.json({ message: "Project created", newProject });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const { id, name, description, link, image } = req.body;
    const project: Project = { id, name, description, link, image };
    const updateProject = await projectService.updateProject(project);
    res.json({ message: "Project updated", updateProject });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const deletedProject = await projectService.deleteProject(id);
    res.json({ message: "Successfully deleted", deletedProject });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
