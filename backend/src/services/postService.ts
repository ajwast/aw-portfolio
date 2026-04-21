import "dotenv/config";
import prisma from "../db/prisma";

export async function getAllPosts() {
  return prisma.post.findMany({
    where: { published: true },
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

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
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
