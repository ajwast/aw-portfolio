"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.get("/api/status", (req, res) => {
    res.json({ status: "Server Running" });
});
app.listen(PORT, () => {
    console.log(`Serving on ${PORT}`);
});
//# sourceMappingURL=server.js.map