import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import postRoutes from "./routes/posts";
import projectRouter from "./routes/projects";
import userRouter from "./routes/users";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/api/posts", postRoutes);
app.use("/api/projects", projectRouter);
app.use("/api/user", userRouter);

app.get("/api/status", (req: Request, res: Response) => {
  res.json({ status: "Server Running" });
});

app.listen(PORT, () => {
  console.log(`Serving on http://localhost:${PORT}`);
});
