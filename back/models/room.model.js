

import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  pieces: [
    {
      type: String,
      ref: 'Piece',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);

export default Room;