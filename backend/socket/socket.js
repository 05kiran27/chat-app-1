const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['https://chat-app-1-ulyf.onrender.com'], // Update this if your frontend is hosted elsewhere
        methods: ["GET", "POST"]
    }
});

const userSocketMap = {}; // userId: socketId

// Function to get the socket ID of a receiver
const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

// Listening for connections
io.on('connection', (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId && userId !== 'undefined') {
        userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    // Listening for disconnections
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);

        // Find and remove the disconnected user
        for (const [id, socketId] of Object.entries(userSocketMap)) {
            if (socketId === socket.id) {
                delete userSocketMap[id];
                break;
            }
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Export the app, io, and server for use elsewhere in your application
module.exports = { app, io, server, getReceiverSocketId };
