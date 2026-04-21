import { Request, Response } from "express";
import * as postService from "../services/postService";

export async function getPosts(req: Request, res: Response) {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

export async function getPost(req: Request<{ slug: string }>, res: Response) {
  try {
    const { slug } = req.params;

    const post = await postService.getPostBySlug(slug);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
}

export async function createPost(req: Request, res: Response) {}
