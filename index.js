const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');




const app = express();
const {Server} = require("socket.io")



const httpserver = createServer(app)
const io = new Server(httpserver)

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


io.on("connection", (socket) => {

    socket.on("message", (msg) => {

        console.log("Message:", msg);
        io.emit("send_message_to_all_users", msg);
    });

    socket.on("typing" ,()=>{
        socket.broadcast.emit("show_typing_status")
    })
    socket.on("stop_typing" ,()=>{
        socket.broadcast.emit("clear_typing_status")
    })

});


httpserver.listen(3000, () => {
     console.log('server running at ');
});
