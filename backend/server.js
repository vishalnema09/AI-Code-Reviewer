import app from "./src/app.js";
import connectToDb from "./src/db/db.js";
import { Server as SocektServer } from "socket.io";
import http from "http";

connectToDb();

const server = http.createServer(app);
const io = new SocektServer(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
