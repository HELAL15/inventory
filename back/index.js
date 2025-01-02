
import express from "express";
import connectToMongoDB from "./config/db.js";
import roomModel from "./models/room.model.js";
import pieceModel from "./models/piece.model.js";
import { app, server } from "./socket/socket.js";
import dotenv from 'dotenv';
import Room from "./models/room.model.js";



const PORT = 3000;


dotenv.config();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World');
})


app.post('/api/room', async (req, res) => {
  try {
    const { name , branchId,
      companyKey,
      employeeId,
      groupId,
      groupName,
      inventoryId  } = await req.body; 

    if (!name) {
      return res.status(400).send({ message: 'Room name is required' });
    }

    const newRoom = new roomModel({
      name , branchId,
      companyKey,
      employeeId,
      groupId,
      groupName,
      inventoryId 
    });

    await newRoom.save();

    return res.status(201).send(newRoom);

  } catch (error) {
    console.log('Error in create room controller: ', error);
    return res.status(500).send({ message: 'Error creating room', error: error.message }); 

  }
});

app.post('/api/room/:roomId/piece', async (req, res) => {
  try {
    const { roomId } = req.params;
    const {
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
    } = req.body; 

    
    const room = await roomModel.findById(roomId);
    if (!room) {
      return res.status(404).send({ message: 'Room not found' });
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

    return res.status(201).send(newPiece);
  } catch (error) {
    console.log('Error in adding piece to room:', error);
    return res.status(500).send({ message: 'Error adding piece', error: error.message });
  }
});

app.get('/api/room/:roomId',async (req,res)=>{
  try {
    const {roomId} = req.params;
    const room = await Room.find({_id:roomId}).populate('pieces');
    if (!room) {
      return res.status(404).send({ message: 'Room not found' });
    }
    return res.status(200).send(room);
  } catch (error) {
    console.log('Error in getting room:', error);
    return res.status(500).send({ message: 'Error getting room', error: error.message });
  }
})






server.listen(PORT, () => {
  connectToMongoDB();
  console.log("server is running on port", PORT);
});

