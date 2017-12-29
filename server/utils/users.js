class Users {
  constructor () {
      this.users = [];
     this.rooms=[];
  }
  
addUser (id, name, room) {
 room = room.toLowerCase();
  var user = {id, name, room};
  
  
 if(this.users.length==0){
  this.users.push(user);
 }
else{
  var con = this.users.filter((user)=> {
    var data = user.name ===name;
    return data;
  });
  if(con.length==0){
    this.users.push(user);
  }
  else
  {
    return false;
  }
  if(this.rooms.indexOf(room) < 0){
    this.rooms.push(room);
  }
}
return user;
return room;
}

 //this.rooms.push(room);
//console.log(this.rooms);




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