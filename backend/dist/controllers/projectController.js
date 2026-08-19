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
exports.getProjects = getProjects;
exports.createProject = createProject;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;
exports.getProjectsByTag = getProjectsByTag;
exports.getTagsonProject = getTagsonProject;
const projectService = __importStar(require("../services/projectService"));
async function getProjects(req, res) {
    try {
        const allProjects = await projectService.getAllProjects();
        res.json(allProjects);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch" });
    }
}
async function createProject(req, res) {
    try {
        const { name, description, link, image } = req.body;
        const project = { name, description, link, image };
        const newProject = await projectService.createProject(project);
        if (newProject) {
            return res.json({ message: "Project created", newProject });
        }
        res.json({ message: "Project Error" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
}
async function updateProject(req, res) {
    try {
        const { id, name, description, link, image } = req.body;
        const project = { id, name, description, link, image };
        const updateProject = await projectService.updateProject(project);
        res.json({ message: "Project updated", updateProject });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}
async function deleteProject(req, res) {
    try {
        const { id } = req.params;
        const deletedProject = await projectService.deleteProject(Number(id));
        res.json({ message: "Successfully deleted", deletedProject });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}
async function getProjectsByTag(req, res) {
    try {
        const { id } = req.params;
        const result = await projectService.getProjectsByTag(Number(id));
        if (result) {
            const tag = result.map((item) => item.tag.name);
            const projects = result.map((item) => item.project.name);
            return res.json({ tag: tag[0], projects });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
}
async function getTagsonProject(req, res) {
    try {
        const { id } = req.params;
        const result = await projectService.getTagsonProject(Number(id));
        if (result) {
            const project = result.map((item) => item.project.name);
            const tags = result.map((item) => item.tag.name);
            return res.json({ project: project[0], tags });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
}
//# sourceMappingURL=projectController.js.map