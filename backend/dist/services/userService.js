"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
require("dotenv/config");
const prisma_1 = __importDefault(require("../db/prisma"));
const crypto_1 = __importDefault(require("crypto"));
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
function hashPassword(pw, salt) {
    return crypto_1.default.pbkdf2Sync(pw, salt, 1000, 64, "sha256").toString("hex");
}
async function login(username, password) {
    const user = await prisma_1.default.user.findFirst({ where: { username } });
    if (user) {
        const encryptedPassword = hashPassword(password, user.salt);
        if (user?.password === encryptedPassword) {
            const payload = { username: user.username, role: user.role };
            const token = jwt.sign(payload, SECRET, { expiresIn: "1hr" });
            return token;
        }
    }
    return false;
}
async function getUsers() {
    return prisma_1.default.user.findMany({ select: { username: true } });
}
async function createUser(username, password) {
    const salt = crypto_1.default.randomBytes(16).toString("hex");
    const encryptedPassword = hashPassword(password, salt);
    const newUser = prisma_1.default.user.create({
        data: {
            username: username,
            password: encryptedPassword,
            salt: salt,
            role: 1,
        },
    });
    if (newUser) {
        return newUser;
    }
    return false;
}
async function deleteUser(username) {
    return prisma_1.default.user.delete({ where: { username } });
}
//# sourceMappingURL=userService.js.map