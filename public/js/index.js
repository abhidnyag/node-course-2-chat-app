 var socket = io();

socket.on('roomList', function(rooms){
   console.log('Hii',rooms)
    var ol = jQuery('<select></select>');
     console.log(ol)
    rooms.forEach(function(room) {
        console.log('inside foreach loop',rooms)
        console.log('inside index.js',room)
        ol.append(jQuery('<option></option>').text(room));
    });
    jQuery('#rooms').html(ol);
 }); 

 