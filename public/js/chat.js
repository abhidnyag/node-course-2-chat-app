var socket = io(); //when we call this, we are actually initiating the request from the client to the server to open up a web socket 

function scrollToBottom() {
   var messages = jQuery('#messages');
   var newMessage = messages.children('li:last-child');
   var clientHeight = messages.prop('clientHeight');
   var scrollTop = messages.prop('scrollTop');
   var scrollHeight = messages.prop('scrollHeight');
   var newMessageHeight = newMessage.innerHeight();
   var lastMessageHeight = newMessage.prev().innerHeight();

   if(clientHeight + scrollTop +newMessageHeight + lastMessageHeight >= scrollHeight){
       //console.log('Should scroll');
       messages.scrollTop(scrollHeight);
   }
};

socket.on('connect', function (){
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function (err){
   if(err){
       alert(err);
     window.location.href = '/';
   }else{
     console.log('No error');
   }
  });
});

socket.on('disconnect', function (){
    console.log('Disconnected from server');
});



socket.on('updateUserList', function(users){
   var ol = jQuery('<ol></ol>');

   users.forEach(function(user) {
       ol.append(jQuery('<li></li>').text(user));
   });
   jQuery('#users').html(ol);
});

socket.on('newMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    var typingStatus=0; //0=Not typing: message blank, 1=typing, 2=typing: something there
    var typingStatus_timeout = undefined;
    
    //called when timeout kicks in that we've stopped typing
    function function_typingStatus_timeout(){
        //message entered
        if ($('#chat_message').val().trim()) {
            typingStatus=2;
        //message is blank
        } else {
            typingStatus=0;
        }
        //send new status
        connection.send(JSON.stringify({
            action:'typingStatus',
            typingStatus:typingStatus,
        }));
    }
    
    $(document).ready(function(){
        //TYPING
        $('#chat_message').keydown(function(e) {
            //only record typing if enter not pressed
            if(e.which!=13 && e.keyCode!=13) {
                //weren't typing before but are now
                if (typingStatus!=1) {
                    //switch to 1 for in progress
                    typingStatus=1;
                    //broadcast
                    connection.send(JSON.stringify({
                        action:'typingStatus',
                        typingStatus:typingStatus,
                    }));        
                //were typing before and still are, clear the timeout, we're going to reset it in the next step
                } else {
                    clearTimeout(typingStatus_timeout);
                }
                //either way, set the timeout to trigger after a second of not typing
                typingStatus_timeout=setTimeout(function_typingStatus_timeout,1000);
    
            //if enter was pressed we want to not have it register as a keydown at all.  there's a separate function on keyup that looks for enter being pressed and sends the message
            } else {
                e.preventDefault();
            }
        });
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    /* var formattedTime = moment(message.createdAt).format('h:mm a'); 
    console.log('newMessage', message);
   var li = jQuery('<li></li>');
   li.text(`${message.from} ${formattedTime}: ${message.text}`);
   jQuery('#messages').append(li); */
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
       from: message.from,
       url: message.url,
       createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    /* var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a); 
    jQuery('#messages').append(li);*/
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        text: messageTextbox.val()
    }, function () {
    messageTextbox.val('')
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  if(!navigator.geolocation){
      return alert('Geolocation not supported by your browser.');
  }

 locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position){
   locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
   alert('Unable to fetch location');
  });
});