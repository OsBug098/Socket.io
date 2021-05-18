const express = require("express");
const socket = require("socket.io");
const PORT = 9876;
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "../client")));

const server = app.listen(PORT, () => {
    console.log(`Listening to to port ${PORT}...`);
});

const io = socket(server);

io.on("connection", (socket) => {
    console.log("Socket connected.");

    socket.on("chat", (data) => {
        io.sockets.emit("chat", data);
    });

    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data);
    });
});