const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
 console.log('New user connected');

 /* socket.emit('newEmail', {
     from: 'mike@example.com',
     text: 'Hey. What is going on?',
     createdAt: 123
 }); */

 /* socket.emit('newMessage', {
     from: 'Abhi',
     text: 'Hi. Can we chat at 6?',
     createdAt: 12
     }); */

 /* socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
 }); */
socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
    });
});

socket.on('disconnect', () =>{
   console.log('User disconnected from the server');
 });
});

server.listen(port, (err,res) => {
    if(err){
        console.log(err);
    }
console.log(`Server is up on ${port}`);
});
