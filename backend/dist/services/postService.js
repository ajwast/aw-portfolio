"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = getAllPosts;
exports.getPostBySlug = getPostBySlug;
exports.createPost = createPost;
exports.deletePost = deletePost;
exports.getAllTags = getAllTags;
exports.createTag = createTag;
exports.deleteTag = deleteTag;
require("dotenv/config");
const prisma_1 = __importDefault(require("../db/prisma"));
async function getAllPosts() {
    return prisma_1.default.post.findMany({
        include: {
            tags: {
                include: {
                    tag: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}
async function getPostBySlug(slug) {
    return prisma_1.default.post.findUnique({
        where: { slug },
        include: {
            tags: {
                include: {
                    tag: true,
                },
            },
        },
    });
}
async function createPost(data) {
    const { title, slug, excerpt, content, published = true, tagIds = [] } = data;
    return prisma_1.default.post.create({
        data: {
            title,
            slug,
            excerpt,
            content,
            published,
            tags: {
                create: tagIds.map((tagId) => ({
                    tag: { connect: { id: tagId } },
                })),
            },
        },
        include: {
            tags: {
                include: {
                    tag: true,
                },
            },
        },
    });
}
async function deletePost(id) {
    await prisma_1.default.postTag.deleteMany({
        where: { postId: id },
    });
    return prisma_1.default.post.delete({
        where: { id },
    });
}
async function getAllTags() {
    return prisma_1.default.tag.findMany({
        include: {
            _count: {
                select: { posts: true, projectTags: true },
            },
        },
        orderBy: {
            name: "asc",
        },
    });
}
async function createTag(name) {
    return prisma_1.default.tag.create({
        data: { name },
    });
}
async function deleteTag(id) {
    await prisma_1.default.postTag.deleteMany({ where: { tagId: id } });
    await prisma_1.default.projectTag.deleteMany({ where: { tagId: id } });
    return prisma_1.default.tag.delete({ where: { id } });
}
//# sourceMappingURL=postService.js.map