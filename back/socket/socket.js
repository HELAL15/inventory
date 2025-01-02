

import { Server } from "socket.io";
import http from "http";
import express from "express";


const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  maxHttpBufferSize: 1e8,
});



io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Event to create a new room
  socket.on("createRoom", async (data, callback) => {
    try {
      const { name, branchId, companyKey, employeeId, groupId, groupName, inventoryId } = data;

      if (!name) {
        return callback({ status: 400, message: "Room name is required" });
      }

      const newRoom = new roomModel({
        name,
        branchId,
        companyKey,
        employeeId,
        groupId,
        groupName,
        inventoryId,
      });

      await newRoom.save();
      callback({ status: 201, room: newRoom });
    } catch (error) {
      console.log("Error in create room:", error);
      callback({ status: 500, message: "Error creating room", error: error.message });
    }
  });

  // Event to add a piece to a room
  socket.on("addPieceToRoom", async (data, callback) => {
    try {
      const { roomId, karat, mineral, karatmineral, diamond_value, classification, category, weight, hwya, itemId, branchId, inventoryId, groupId, employeeId, companyKey, groupName } = data;

      const room = await roomModel.findById(roomId);
      if (!room) {
        return callback({ status: 404, message: "Room not found" });
      }

      const newPiece = new pieceModel({
        roomId: room._id,
        karat,
        mineral,
        karatmineral,
        diamond_value,
        classification,
        category,
        weight,
        hwya,
        itemId,
        branchId,
        inventoryId,
        groupId,
        employeeId,
        companyKey,
        groupName,
      });

      await newPiece.save();

      room.pieces.push(newPiece._id);
      await room.save();

      callback({ status: 201, piece: newPiece });
    } catch (error) {
      console.log("Error adding piece to room:", error);
      callback({ status: 500, message: "Error adding piece", error: error.message });
    }
  });

  // Event to get room details
  socket.on("getRoom", async (roomId, callback) => {
    try {
      const room = await roomModel.findById(roomId).populate("pieces");
      if (!room) {
        return callback({ status: 404, message: "Room not found" });
      }

      callback({ status: 200, room });
    } catch (error) {
      console.log("Error in getting room:", error);
      callback({ status: 500, message: "Error getting room", error: error.message });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

export { app, io, server };

