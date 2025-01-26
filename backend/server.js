import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Game } from "./gameLogic.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.ALLOWED_ORIGIN, // url of front application
    credentials: true,
  },
});

const gameInstance = new Game();

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.emit("connected", {
    action: "connected",
    message: "Connection established",
  });

  socket.on("startTurn", () => {
    console.log("Starting turn on server");
    const gameState = gameInstance.startTurn();
    socket.emit("update", { action: "update", state: gameState });
  });

  socket.on("selectCard", (data) => {
    const { index } = data;
    const gameState = gameInstance.selectCard(index);
    socket.emit("update", { action: "update", state: gameState });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT_SERVER || 3050;
const PORT_WEB = process.env.PORT_WEB || 3000;
const SERVER_URI = process.env.SERVER_URI || "http://localhost";

app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "The server is running correctly.",
    socket: `Connect via Socket.IO in ${SERVER_URI}:${PORT_WEB} to play.`,
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on ${SERVER_URI}:${PORT}`);
});
