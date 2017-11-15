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
	})
});

server.listen(port, () => {
	console.log(`Started on port ${port}`);
});