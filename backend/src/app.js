import express from "express";
import projectRoutes from "./routes/project.routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World! This is the workshop app.");
});

app.use("projects", projectRoutes);

export default app;
