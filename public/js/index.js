var socket = io();


function scrollToBottom() {
	// Selectors
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child');
	// Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	console.log("clientheight : ", clientHeight);
	console.log("scrollTop : ", scrollTop);
	console.log("scrollHeight : ", scrollHeight);

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
		console.log(" OUT OF SEE clientheight : ", clientHeight);
		console.log(" OUT OF SEE scrollTop : ", scrollTop);
		console.log(" OUT OF SEE scrollHeight : ", scrollHeight);
		console.log("full msg : ", messages.scrollTop);
	}
}

socket.on('connect', function () {
	console.log('Connected to server');

	// socket.emit('createMessage', {
	// 	from: 'gzn@example.com',
	// 	text: 'whats up from the client'
	// });
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {

	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});
	jQuery('#messages').append(html);
	scrollToBottom();
	// var formattedTime = moment(message.createdAt).format('h:mm a');
	// var li = jQuery('<li></li>');
	// li.text(`${message.from} ${formattedTime} : ${message.text}`);

	// jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#location-message-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	})

	jQuery('#messages').append(html);
	scrollToBottom();
	// var li = jQuery('<li></li>');
	// var a = jQuery('<a target="_blank">My current location</a>');

	// li.text(`${message.from} ${formattedTime} : `);
	// a.attr('href', message.url);
	// li.append(a);

	// jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
// 	from: 'Me',
// 	text: 'hello'
// }, function(data) {
// 	console.log('Got it ' + data);
// });

jQuery('#message-form').on('submit', function(e) {
	
	e.preventDefault();

	var messageTextbox = jQuery('[name=message]');

	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, function () {
		messageTextbox.val('');
	});
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser.');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function (position){
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitud: position.coords.longitude
		})
	}, function() {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location.');
	});
});