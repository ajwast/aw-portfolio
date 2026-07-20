import { Request, Response } from "express";
import * as userService from "../services/userService";

export async function getUsers(req: Request, res: Response) {
  const allUsers = await userService.getUsers();
  res.json(allUsers);
}

export async function createUser(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await userService.createUser(username, password);
  if (user) {
    res.json({ message: `User: ${user.username} created successfully` });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { username } = req.body;
    const deleteUser = await userService.deleteUser(username);
    if (deleteUser) {
      res.json({ message: "User deleted", deleteUser });
    }
    res.json({ error: "User not found" });
  } catch (error) {
    res.json({ error: "Server error" });
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const token = await userService.login(username, password);
  if (token) {
    return res.json({ message: `Logging in ${username}`, token });
  }
  res.json({ error: "Incorrect username or password" });
}
