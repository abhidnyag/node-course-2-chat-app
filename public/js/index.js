var socket = io(); //when we call this, we are actually initiating the request from the client to the server to open up a web socket 

socket.on('connect', function (){
   console.log('Connected to server');

 /*   socket.emit('createMessage', {
       to: 'Kr',
       text: 'Yeah, sure. We will talk later.'
   }); */
});

socket.on('disconnect', function (){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('newMessage', message);
   var li = jQuery('<li></li>');
   li.text(`${message.from}: ${message.text}`);

   jQuery('#messages').append(li);
});

/* socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
}, function(data) {
  console.log('Got it', data);
}); */

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
     
    });
});