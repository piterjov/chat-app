var socket = io();
socket.on('connect', function () {
    console.log('Connected to server')
})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})
socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm: a');

    console.log('You have new message: ', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    jQuery('#messages').append(li);

});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm: a');

    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank" href=""> My current location </a>');

    li.text(`${message.from} ${formattedTime}`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);

});


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    console.log('Form is submited');

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
        jQuery('[name=message]').val('')
    })
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function (e) {
    if (!navigator.geolocation) {
        return alert('GEOLOCATION NOT SUPPORTED BY YOUR BROWSER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    }

    locationButton.attr('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function (error) {
        alert('Unable to fetch location')
    })
})