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
});