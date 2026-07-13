import { Request, Response } from "express";
import * as userService from "../services/userService";
import assert from "assert";

export async function getUsers(req: Request, res: Response) {
  const allUsers = await userService.getUsers();
  res.json(allUsers);
}

export async function createUser(req: Request, res: Response) {}

export async function deleteUser(req: Request, res: Response) {}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await userService.login(username, password);
  res.json(user);
}
