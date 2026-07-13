import "dotenv/config";
import prisma from "../db/prisma";
import crypto from "crypto";

export async function login(username: string, password: string) {
  const user = await prisma.user.findFirst({ where: { username } });
  if (user?.password === password) {
    return user;
  }
}

export async function getUsers() {
  return prisma.user.findMany();
}
