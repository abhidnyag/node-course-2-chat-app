[{
  id: '4rsdfok#kdkf4',
  name: 'Abhi',
  room: 'lobby'
}]
/* [{
  room: 'lobby'
}] */

class Users {
  constructor () {
      this.users = [];
     this.rooms=[];
  }
  
addUser (id, name, room) {
  var user = {id, name, room};
  
 //console.log(room);
this.users.push(user);
//console.log(this.users)

if(this.rooms.indexOf(room) < 0){
  this.rooms.push(room);
}
 //this.rooms.push(room);
console.log(this.rooms);

return user;
return room;
}

removeUser (id){
  var user =  this.getUser(id);

   if(user){
    this.users =  this.users.filter((user) => user.id !== id);
   }
    return user;
}

getUser (id) {
  return this.users.filter((user) => user.id === id)[0];
  
}

getUserList (room){
   var users = this.users.filter((user) =>  user.room === room);
  var namesArray = users.map((user) =>  user.name);
   return namesArray;   
}

/* getRoomList(room){
  var rooms = this.rooms.filter((room) => room.room === room);
  var namesArray = rooms.map((room) => user.room);
  return namesArray;  
} */
getAllRoomList(){
  var rooms = this.rooms;
  console.log(rooms);
  //var namesArray = rooms.map((room) => user.room);

  return rooms;  
}
}

module.exports = {Users};