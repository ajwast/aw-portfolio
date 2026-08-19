"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = checkAdmin;
const jwt = require("jsonwebtoken");
function checkAdmin(req, res, next) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.SECRET);
        if (user.role === 0) {
            return next();
        }
        res.json({ error: "Unauthorised" });
    }
}
//# sourceMappingURL=utils.js.map