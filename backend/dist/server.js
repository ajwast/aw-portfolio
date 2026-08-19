"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const posts_1 = __importDefault(require("./routes/posts"));
const projects_1 = __importDefault(require("./routes/projects"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
const serverLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 150,
    message: "Too many requests, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
});
const PORT = process.env.PORT || 3001;
app.use(serverLimiter);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/posts", posts_1.default);
app.use("/api/projects", projects_1.default);
app.use("/api/user", users_1.default);
app.get("/api/status", (req, res) => {
    res.json({ status: "Server Running" });
});
app.listen(PORT, () => {
    console.log(`Serving on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map