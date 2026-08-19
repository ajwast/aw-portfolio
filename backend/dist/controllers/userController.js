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
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.login = login;
const userService = __importStar(require("../services/userService"));
async function getUsers(req, res) {
    const allUsers = await userService.getUsers();
    res.json(allUsers);
}
async function createUser(req, res) {
    const { username, password } = req.body;
    const user = await userService.createUser(username, password);
    if (user) {
        res.json({ message: `User: ${user.username} created successfully` });
    }
}
async function deleteUser(req, res) {
    try {
        const { username } = req.body;
        const deleteUser = await userService.deleteUser(username);
        if (deleteUser) {
            res.json({ message: "User deleted", deleteUser });
        }
        res.json({ error: "User not found" });
    }
    catch (error) {
        res.json({ error: "Server error" });
    }
}
async function login(req, res) {
    const { username, password } = req.body;
    const token = await userService.login(username, password);
    if (token) {
        return res.json({ message: `Logging in ${username}`, token });
    }
    res.json({ error: "Incorrect username or password" });
}
//# sourceMappingURL=userController.js.map