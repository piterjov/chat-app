const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('newEmail', { message: 'Hello there!!!' });
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })

    socket.on('newEmail', () => {
        console.log('New email');
    })

    socket.on('createEmail', () => {
        console.log('New email');
    })

});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});