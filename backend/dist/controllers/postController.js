"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = getPosts;
exports.getPost = getPost;
exports.createPost = createPost;
exports.deletePost = deletePost;
exports.getTags = getTags;
exports.createTag = createTag;
exports.deleteTag = deleteTag;
const postService = __importStar(require("../services/postService"));
async function getPosts(req, res) {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
}
async function getPost(req, res) {
    try {
        const { slug } = req.params;
        const post = await postService.getPostBySlug(slug);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch post" });
    }
}
async function createPost(req, res) {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create post" });
    }
}
async function deletePost(req, res) {
    try {
        const { id } = req.params;
        const deleted = await postService.deletePost(Number(id));
        res.json({ message: "Post deleted successfully", deleted });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete post" });
    }
}
async function getTags(req, res) {
    try {
        const tags = await postService.getAllTags();
        res.json(tags);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch tags" });
    }
}
async function createTag(req, res) {
    try {
        const { name } = req.body;
        if (!name || typeof name !== "string") {
            return res.status(400).json({ error: "Tag name is required." });
        }
        const newTag = await postService.createTag(name.trim());
        res.status(201).json({ message: "Tag created successfully", tag: newTag });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create tag" });
    }
}
async function deleteTag(req, res) {
    try {
        const { id } = req.params;
        const deleted = await postService.deleteTag(Number(id));
        res.json({ message: "Tag deleted successfully", deleted });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete tag" });
    }
}
//# sourceMappingURL=postController.js.map