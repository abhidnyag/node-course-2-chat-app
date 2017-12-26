const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
app.use(express.static(publicPath));

io.on('connection', (socket) => {
 console.log('New user connected');
 
io.emit('roomList', users.getAllRoomList());
socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required.');
      if(!isRealString(params.name) === !isRealString(params.name)){
        return callback('Different usernames are required.');
       }
   }
   
   socket.join(params.room.toLowerCase());
   users.removeUser(socket.id);
   users.addUser(socket.id, params.name, params.room);

   io.to(params.room.toLowerCase()).emit('updateUserList', users.getUserList(params.room.toLowerCase()));
   //socket.leave(params.room);
   socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
   socket.broadcast.to(params.room.toLowerCase()).emit('newMessage', generateMessage('Admin' ,`${params.name} has joined.`));
   callback();
});

socket.on('createMessage', (message, callback) => {
   var user = users.getUser(socket.id);
   if(user && isRealString(message.text)){
    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
   }
    
    callback();
});

socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if(user ){
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
});


socket.on('disconnect', () =>{
   var user = users.removeUser(socket.id);
   if(user){
      
       io.to(user.room).emit('updateUserList', users.getUserList(user.room));
       io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
     }
 });
});

server.listen(port, () => {
console.log(`Server is up on ${port}`);
});