import "dotenv/config";
import prisma from "../db/prisma";
import crypto from "crypto";

const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

function hashPassword(pw: string, salt: string) {
  return crypto.pbkdf2Sync(pw, salt, 1000, 64, "sha256").toString("hex");
}

export async function login(username: string, password: string) {
  const user = await prisma.user.findFirst({ where: { username } });
  if (user) {
    const encryptedPassword = hashPassword(password, user.salt);
    if (user?.password === encryptedPassword) {
      const payload = { username: user.username, role: user.role };
      const token = jwt.sign(payload, SECRET, { expiresIn: "1hr" });
      return token;
    }
  }
  return false;
}

export async function getUsers() {
  return prisma.user.findMany({ select: { username: true } });
}

export async function createUser(username: string, password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const encryptedPassword = hashPassword(password, salt);

  const newUser = prisma.user.create({
    data: {
      username: username,
      password: encryptedPassword,
      salt: salt,
      role: 1,
    },
  });

  if (newUser) {
    return newUser;
  }
  return false;
}

export async function deleteUser(username: any) {
  return prisma.user.delete({ where: { username } });
}
