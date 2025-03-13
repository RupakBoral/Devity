const crypto = require("crypto");

const getSecretRoomId = ({ userId, receiver }) => {
  crypto
    .createHash("sha256")
    .update([userId, receiver].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const socket = require("socket.io");
  const io = socket(server, {
    cors: {
      origin: [
        "https://devity-frontend.onrender.com",
        "http://localhost:5173",
        "http://localhost:8888",
      ],
    },
  });

  io.on("connection", (socket) => {
    // handle events
    socket.on("joinChat", ({ receiver, userId }) => {
      // unique room for every chat,
      // sorting so that 2 users can have same room Id
      const roomId = getSecretRoomId(userId, receiver);
      socket.join(roomId);
    });

    socket.on("sendMessage", ({ firstName, userId, receiver, text }) => {
      const roomId = getSecretRoomId(userId, receiver);
      io.to(roomId).emit("messageReceived", { firstName, userId, text });
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
