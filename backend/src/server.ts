import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import postRoutes from "./routes/posts";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/posts", postRoutes);

app.get("/api/status", (req: Request, res: Response) => {
  res.json({ status: "Server Running" });
});

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from the server" });
});

app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
