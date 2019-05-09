const express = require("express"),
  app = express(),
  http = require("http").Server(app),
  io = require("socket.io")(http),
  path = require("path");

// Serve the public directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, +"public/index.html"));
});

io.on("connection", socket => {
  console.log("a user connected...");

  socket.on("disconnect", () => {
    console.log("user disconected...");
  });

  socket.on("message", message => {
    console.log("message", message);

    // Broadcast the message to everyone
    io.emit("message", message);
  });
});

http.listen(3000, () => {
  console.log("SERVER RUNNING ON PORT 3000...");
});
