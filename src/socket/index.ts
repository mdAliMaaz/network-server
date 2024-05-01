import { Server } from "socket.io";
import http from "http";
import { app } from "../app";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap: any = {};

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId: any = socket.handshake.query.userId;

  if (userId !== "undefined") userSocketMap[userId] = socket.id;

 
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnected", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
