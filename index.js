const express = require("express");
const app = express();
const http = require("http");
const path = require("path")
const server = http.createServer(app);
const {Server} = require("socket.io")
const io = new Server(server)

io.on("connection",(socket)=>{
    console.log("A new connection has been made",socket.id);
    socket.on("user-message",(message)=>{
        console.log("A new user message",message)
        io.emit("message",message)
    })
})

app.use(express.static(path.resolve("./src")));
app.get("/",(req,res)=>{
    return res.sendFile("/src/index.js")
})
server.listen(3000,
    () => {
    console.log("Server is running on port 3000");
})
