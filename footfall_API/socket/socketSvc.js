import { Server } from "socket.io";

let io = null;

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

export function emitFootfallUpdate(data) {
  if (io) {
    io.emit("footfallUpdate", data);
  }
}
