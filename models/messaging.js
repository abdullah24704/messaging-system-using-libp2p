import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  topic: String,
  peerId: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

export  {Message}