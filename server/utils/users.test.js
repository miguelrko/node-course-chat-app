const expect = require('expect');
const {Users} = require('./users.js');

describe('Users', () => {

	var users;

	beforeEach( () => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'mike',
			room: 'Node course'
		}, {
			id: '2',
			name: 'jen',
			room: 'React course'
		}, {
			id: '3',
			name: 'caleb',
			room: 'Node course'
		}];
	});

	it('should add new user', () => {
		let users = new Users();
		let user = {
			id: '123',
			name: 'Miguel',
			room: 'The Office'
		};
		let resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]); 
	});

	it('should remove a user', () => {
		var user = users.removeUser('1');
		
		expect(user.id).toEqual('1');
		expect(users.users.length).toBe(2);

	});

	it('should not remove a user', () => {
		var user = users.removeUser('4');

		expect(user).toBeFalsy(); 
		expect(users.users.length).toBe(3);
	});

	it('should find user', () => {
		var user = users.getUser('1');

		expect(user.name).toEqual('mike');
	});

	 it('should not find user', () => {
	 	var user = users.getUser('4');

	 	expect(user).toBeFalsy(); 
	 });

	it('should return names for node course', () => {
		var userList = users.getUserList('Node course');

		expect(userList).toEqual(['mike', 'caleb']);
	});

	it('should return names for react course', () => {
		var userList = users.getUserList('React course');

		expect(userList).toEqual(['jen']);
	});

});