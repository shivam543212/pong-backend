const app = require("express")();
const httpServer = require("http").createServer(app);
const cors = require("cors");
const uniqueId = require("uuid").v4;
const PORT = 3000;
const options = {
  cors: "*",
};

let rooms = {};
let users = {};
// let roomUers = [];

const io = require("socket.io")(httpServer, options);
// const { emit } = require("process");

// basic route for testing
app.get("/", (req, res) => {
  res.send("hello world");
});

//listening on the port
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//connection
io.sockets.on("connection", function(socket) {
  console.log("Connected...");
  socket.on("iam", (name) => {
    users["id"] = socket.id;
    users["name"] = name;
    console.log("11111111111111111111", users);
  });
  socket.emit("user-added", users);
  socket.on("createRoom", (enteredUser) => {
    console.log("000000000000000000000", enteredUser);
    let id = uniqueId();
    console.log("========================", id);
    rooms[id] = enteredUser;
    rooms["member"] = users;
    socket.emit("roomId", (rooms) => {
      console.log("@@@@@@@@@@@@@@@@@@@@@@@", rooms);
    });
    socket.join("roomId", (id) => {});
    console.log("2222222222222222222222", id);
  });
  socket.on("disconnect", function() {
    console.log("disconnect", socket.id);
    // delete users[socket.id];
  });
});