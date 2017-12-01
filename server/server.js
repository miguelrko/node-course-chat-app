const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	// socket.emit('newMessage', {
	// 	from: 'miguel@example.com',
	// 	text: 'this is a test emit',
	// 	createdAt: 123
	// });
	
	//socket emit from admin text: welcome to the chat app
	// socket broadcast.emit from admin text new user joined.

	socket.on('disconnect', () => {
		console.log('User disconnected');
		var user = users.removeUser(socket.id);

		if(user){
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
		}
	});

	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required.');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		//socket.leave(room name);
		//io.emit -> io.to(room name).emit = a todos en el room
		//socket.broadcast.emit -> socket.broadcast.to(room name).emit = a todos en el room menos al current user
		//socket.emit = a un usuario en especifico

		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));

		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

		callback();

		
	});

	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);

		if(user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitud));
		}
		
	});

	socket.on('createMessage', (message, callback) => {
		var user = users.getUser(socket.id);

		if (user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
		
		callback();
		
	});
});

server.listen(port, () => {
	console.log(`Started on port ${port}`);
});