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

socket.on('newLocationMessage', function (message) {
   var li = jQuery('<li></li>');
   var a = jQuery('<a target="_blank" href=""> My current location </a>');

   li.text(`${message.from}`);
   a.attr('href', message.url);
   li.append(a);
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
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function (e) {
    if (!navigator.geolocation) {
        return alert('GEOLOCATION NOT SUPPORTED BY YOUR BROWSER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(error) {
        alert('Unable to fetch location')
    })
})