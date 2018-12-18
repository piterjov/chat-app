var socket = io();
socket.on('connect', function () {
    console.log('Connected to server')
})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})
socket.on('newEmail', function (data) {
    console.log('You have new email: ', data.message);
})