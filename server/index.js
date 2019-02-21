const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.sockets.on("connection", socket => {
  // code here lives as long as the socket session is alive
  socket.on("message", message => {
    message += " | this part was appended from the server";
    socket.emit("message", message);
  });
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
