import { Request, Response } from "express";
import * as projectService from "../services/projectService";
import { Project, ProjectIn } from "../models/interfaces";

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
    const { name, description, link, image } = req.body;
    const project: ProjectIn = { name, description, link, image };
    const newProject = await projectService.createProject(project);
    if (newProject) {
      return res.json({ message: "Project created", newProject });
    }
    res.json({ message: "Project Error" });
  } catch (error) {
    console.log(error);
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
    const { id } = req.params;
    const deletedProject = await projectService.deleteProject(Number(id));
    res.json({ message: "Successfully deleted", deletedProject });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
