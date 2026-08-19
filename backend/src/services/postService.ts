import "dotenv/config";
import prisma from "../db/prisma";

export async function getAllPosts() {
  return prisma.post.findMany({
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

export async function createPost(data: {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  published?: boolean;
  tagIds?: number[];
}) {
  const { title, slug, excerpt, content, published = true, tagIds = [] } = data;
  return prisma.post.create({
    data: {
      title,
      slug,
      excerpt: excerpt || null,
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

export async function deletePost(id: number) {
  // First delete associated PostTag entries
  await prisma.postTag.deleteMany({
    where: { postId: id },
  });
  return prisma.post.delete({
    where: { id },
  });
}

export async function getAllTags() {
  return prisma.tag.findMany({
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

export async function createTag(name: string) {
  return prisma.tag.create({
    data: { name },
  });
}

export async function deleteTag(id: number) {
  await prisma.postTag.deleteMany({ where: { tagId: id } });
  await prisma.projectTag.deleteMany({ where: { tagId: id } });
  return prisma.tag.delete({ where: { id } });
}

