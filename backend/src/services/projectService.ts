import "dotenv/config";
import prisma from "../db/prisma";
import { Project, ProjectIn } from "../models/interfaces";

export async function getAllProjects() {
  return prisma.project.findMany();
}

export async function getOneProject(id: number) {
  return prisma.project.findFirst({ where: { projectId: id } });
}

export async function createProject(project: ProjectIn) {
  return prisma.project.create({
    data: {
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

export async function getProjectsByTag(tagId: number) {
  return prisma.projectTag.findMany({
    where: { tagId: tagId },
    include: {
      tag: {
        select: { name: true },
      },
      project: {
        select: { name: true },
      },
    },
  });
}

export async function getTagsonProject(projectId: number) {
  return prisma.projectTag.findMany({
    where: { projectId: projectId },
    include: {
      tag: {
        select: { name: true },
      },
    },
  });
}
