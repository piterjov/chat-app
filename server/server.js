const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.on('join', (params, callback) => {
        users.removeUser(socket.id)
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        socket.join(params.room)
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room))


        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback();
    });


    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);
        console.log(user)

        if (user[0] && isRealString(message.text)) {
            io.to(user[0].room).emit('newMessage', generateMessage(user[0].name, message.text));


        }
        callback()

    });

    socket.on('createLocationMessage', (coords) => {
       let user = users.getUser(socket.id)

        if (user[0]) {
            io.to(user[0].room).emit('newLocationMessage', generateMessage(user[0].name, coords.latitude ,  coords.longitude));
        }
    });
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            console.log(user[0].room);
            console.log(user[0].name);

            io.to(user[0].room).emit('updateUserList', users.getUserList(user[0].room));
            io.to(user[0].room).emit('newMessage', generateMessage('Admin', `${user[0].name} left`))

        }
        console.log('User was disconnected');
    });

});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});