import "dotenv/config";
import prisma from "../db/prisma";

interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  image: string;
}

export async function getAllProjects() {
  return prisma.project.findMany();
}

export async function getOneProject(id: number) {
  return prisma.project.findFirst({ where: { projectId: id } });
}

export async function createProject(project: Project) {
  return prisma.project.create({
    data: {
      projectId: project.id,
      name: project.name,
      description: project.description,
      link: project.link,
      image: project.image,
    },
  });
}

export async function updateProject(project: Project) {
  return prisma.project.update({
    where: { projectId: project.id },
    data: {
      name: project.name,
      description: project.description,
      link: project.link,
      image: project.image,
    },
  });
}

export async function deleteProject(projectId: number) {
  return prisma.project.delete({
    where: { projectId },
  });
}
