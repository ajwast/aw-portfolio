import "dotenv/config";
import prisma from "../db/prisma";

export async function getAllProjects() {
  return prisma.project.findMany();
}
