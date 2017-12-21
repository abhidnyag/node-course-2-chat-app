
[{
    name: 'Lobby'
}]

class Rooms{
    constructor () {
        this.rooms = [];
    }
    addUser ( name ){
        var room = {name};
      this.rooms.push(room);
      return room;
      }
    getRoomList (name){
        var room = {name};
        var rooms = this.rooms.filter((room) =>  room.name === name);
       var namesArray = rooms.map((room) =>  room.name);
        return namesArray;   
     }
}

module.exports = {Rooms};