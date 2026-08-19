"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProjects = getAllProjects;
exports.getOneProject = getOneProject;
exports.createProject = createProject;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;
exports.getProjectsByTag = getProjectsByTag;
exports.getTagsonProject = getTagsonProject;
require("dotenv/config");
const prisma_1 = __importDefault(require("../db/prisma"));
async function getAllProjects() {
    return prisma_1.default.project.findMany();
}
async function getOneProject(id) {
    return prisma_1.default.project.findFirst({ where: { projectId: id } });
}
async function createProject(project) {
    return prisma_1.default.project.create({
        data: {
            name: project.name,
            description: project.description,
            link: project.link,
            image: project.image,
        },
    });
}
async function updateProject(project) {
    return prisma_1.default.project.update({
        where: { projectId: project.id },
        data: {
            name: project.name,
            description: project.description,
            link: project.link,
            image: project.image,
        },
    });
}
async function deleteProject(projectId) {
    return prisma_1.default.project.delete({
        where: { projectId },
    });
}
async function getProjectsByTag(tagId) {
    return prisma_1.default.projectTag.findMany({
        where: { tagId: tagId },
        include: {
            tag: {
                select: { name: true },
            },
            project: {
                select: { name: true },
            },
        },
    });
}
async function getTagsonProject(projectId) {
    return prisma_1.default.projectTag.findMany({
        where: { projectId: projectId },
        include: {
            tag: {
                select: { name: true },
            },
            project: {
                select: { name: true },
            },
        },
    });
}
//# sourceMappingURL=projectService.js.map