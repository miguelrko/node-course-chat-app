const expect = require('expect');
var {generateMessage} = require('./message.js');

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