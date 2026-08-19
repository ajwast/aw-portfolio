import prisma from "../db/prisma";

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

export async function getTagById(id: number) {
  return prisma.tag.findUnique({
    where: { id },
    include: {
      posts: {
        include: {
          post: true,
        },
      },
      projectTags: {
        include: {
          project: true,
        },
      },
      _count: {
        select: { posts: true, projectTags: true },
      },
    },
  });
}

export async function createTag(name: string) {
  return prisma.tag.create({
    data: { name: name.trim() },
  });
}

export async function updateTag(id: number, name: string) {
  return prisma.tag.update({
    where: { id },
    data: { name: name.trim() },
  });
}

export async function deleteTag(id: number) {
  await prisma.postTag.deleteMany({ where: { tagId: id } });
  await prisma.projectTag.deleteMany({ where: { tagId: id } });
  return prisma.tag.delete({ where: { id } });
}
