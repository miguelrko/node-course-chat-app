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

	// socket.emit('newMessage', {
	// 	from: 'miguel@example.com',
	// 	text: 'this is a test emit',
	// 	createdAt: 123
	// });
	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat App',
		createdAt: new Date().getTime()
	});
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined',
		createdAt: new Date().getTime()
	});
	//socket emit from admin text: welcome to the chat app
	// socket broadcast.emit from admin text new user joined.

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});

	socket.on('createMessage', (message) => {
		console.log('Create Message: ',message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});
});

server.listen(port, () => {
	console.log(`Started on port ${port}`);
});