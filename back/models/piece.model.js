import mongoose from "mongoose";

const pieceSchema = new mongoose.Schema({
  roomId:{
   type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  karat: {
    type: Number,
    required: true,
  },
  mineral: {
    type: String,
    required: true,
  },
  karatmineral: {
    type: String,
    required: true,
  },
  diamond_value: {
    type: Number,
    required: true,
  },
  classification: {
    type: String,
    enum: ['high', 'medium', 'low'],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  hwya: {
    type: String,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
    unique: true, 
  },
  branchId: {
    type: String,
    required: true,
  },
  inventoryId: {
    type: String,
    required: true,
  },
  groupId: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  companyKey: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Piece = mongoose.models.Piece || mongoose.model('Piece', pieceSchema);

export default Piece;