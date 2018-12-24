var socket = io();
socket.on('connect', function () {
    console.log('Connected to server')
})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})
socket.on('newMessage', function (message) {
    console.log('You have new message: ', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);

});

socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    console.log('Form is submited');

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    })
})