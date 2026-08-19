import { Request, Response } from "express";
import * as postService from "../services/postService";
import * as tagService from "../services/tagService";

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

export async function createPost(req: Request, res: Response) {
  try {
    const { title, slug, excerpt, content, published, tagIds } = req.body;
    if (!title || !slug || !content) {
      return res.status(400).json({ error: "Title, slug, and content are required." });
    }
    const newPost = await postService.createPost({
      title,
      slug,
      excerpt,
      content,
      published: published !== undefined ? Boolean(published) : true,
      tagIds: Array.isArray(tagIds) ? tagIds.map(Number) : [],
    });
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create post" });
  }
}

export async function deletePost(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await postService.deletePost(Number(id));
    res.json({ message: "Post deleted successfully", deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete post" });
  }
}

export async function getTags(req: Request, res: Response) {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
}

export async function createTag(req: Request, res: Response) {
  try {
    const { name } = req.body;
    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Tag name is required." });
    }
    const newTag = await tagService.createTag(name);
    res.status(201).json({ message: "Tag created successfully", tag: newTag });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create tag" });
  }
}

export async function deleteTag(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await tagService.deleteTag(Number(id));
    res.json({ message: "Tag deleted successfully", deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete tag" });
  }
}


