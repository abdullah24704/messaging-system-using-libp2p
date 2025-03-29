import mongoose from "mongoose";
import cors from "cors"
import express from "express"
import { Message } from "./models/messaging.js";
const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());

mongoose.connect('mongodb://localhost/p2p');

app.post('/messages', async (req, res) => {
  try {
    const { topic, peerId, message } = req.body;
    const newMessage = new Message({ topic, peerId, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message' });
    console.log(error)
  }
});

app.get('/messages/:topic', async (req, res) => {
  try {
    const messages = await Message.find({ topic: req.params.topic });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
