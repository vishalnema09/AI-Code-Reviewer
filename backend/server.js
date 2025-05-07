import app from "./src/app.js";
import connectToDb from "./src/db/db.js";
import { Server as SocektServer } from "socket.io";
import messageModel from "./src/models/message.model.js";
import http from "http";
import projectModel from "./src/models/project.model.js";
import { getReview } from "./src/services/ai.service.js";

connectToDb();

const server = http.createServer(app);
const io = new SocektServer(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  const project = socket.handshake.query.project;
  socket.join(project);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("chat-history", async () => {
    const messages = await messageModel.find({ project: project });
    socket.emit("chat-history", messages);
  });

  socket.on("get-project-code", async () => {
    const projectData = await projectModel.findById(project).select("code");
    socket.emit("project-code", projectData.code);
  });

  socket.on("chat-message", async (message) => {
    socket.broadcast.to(project).emit("chat-message", message);
    await messageModel.create({
      project: project,
      text: message,
    });
  });

  socket.on("code-change", async (code) => {
    socket.broadcast.to(project).emit("code-change", code);
    await projectModel.findOneAndUpdate({ _id: project }, { code: code });
  });

  socket.on("get-review", async (code) => {
    const review = await getReview(code);
    socket.emit("code-review", review);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
