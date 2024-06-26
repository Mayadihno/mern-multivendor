const socketIO = require("socket.io");
const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const dotenv = require("dotenv");

dotenv.config({
  path: "./.env",
});
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

let users = [];

const addUsers = (userId, socketId) => {
  !users.some((user) => user?.userId === userId) &&
    users.push(userId, socketId);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user?.socketId !== socketId);
};

const getUser = (receiverId) => {
  return users.find((user) => user?.userId === receiverId);
};

//Define a message with a seen property
const createMessage = ({ senderId, recieverId, text, images }) => ({
  senderId,
  recieverId,
  text,
  images,
  seen: false,
});

io.on("connection", (socket) => {
  //when connect
  console.log("user connected");
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUsers(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  const messages = {}; //Object to track messages send to each user
  socket.on("sendMessage", ({ senderId, recieverId, text, images }) => {
    const message = createMessage({ senderId, recieverId, text, images });

    const user = getUser(recieverId);
    // Store the messages in the messages object
    if (!messages[recieverId]) {
      messages[recieverId] = [message];
    } else {
      messages[recieverId].push(message);
    }
    // send the message to the recevier
    io.to(user?.socketId).emit("getMessage", message);
  });

  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);

    // update the seen flag for the message
    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) =>
          message.receiverId === receiverId && message?.id === messageId
      );
      if (message) {
        message.seen = true;

        // send a message seen event to the sender
        io.to(user?.socketId).emit("messageSeen", {
          senderId,
          receiverId,
          messageId,
        });
      }
    }
  });
  // update and get last message
  socket.on("updateLastMessage", ({ lastMessage, lastMessagesId }) => {
    io.emit("getLastMessage", {
      lastMessage,
      lastMessagesId,
    });
  });
  //when disconnect
  socket.on("disconnect", () => {
    console.log(`a user disconnected!`);
    removeUser(socket?.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT || 4005, () => {
  console.log(`server is running on server ${process.env.PORT}`);
});
