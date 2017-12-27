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
 room = room.toLowerCase();
  var user = {id, name, room};
  
  this.users.push(user);
  /* if(this.users.length==0)
  {
      this.users.push(user);
  }
  else
  {
   for(var i in this.users)
   {
     if(this.users[i].name == user.name)
      {
       return false;
      }
       else
      {
       this.users.push(user);
      }
    }
  } */
if(this.rooms.indexOf(room) < 0){
  this.rooms.push(room);
}
 //this.rooms.push(room);
//console.log(this.rooms);

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


getAllRoomList(){
  var rooms = this.rooms;
  //console.log(rooms);
  //var namesArray = rooms.map((room) => user.room);

  return rooms;  
}
}

module.exports = {Users};