const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {

	it('should generate correct message object', () => {
		var from = 'Me';
		var text = 'Test case #1';
		message = generateMessage(from, text);
		//expect(message.from).toBe(from);
		//expect(message.text).toBe(text);
		expect(message).toMatchObject({from, text});
		expect(typeof message.createdAt).toBe('number');
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var from = 'Admin';
		var lat = 1;
		var lng = 2;
		var url = `https://www.google.com/maps?q=${lat},${lng}`;

		message = generateLocationMessage(from , lat , lng);
		expect(message).toMatchObject({from, url});
		expect(typeof message.createdAt).toBe('number');
	});
})