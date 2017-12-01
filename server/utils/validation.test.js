const expect = require('expect');

const {isRealString} = require('./validation.js');

describe('isRealString validation', () => {

 it('should reject non-string values', () => {
 	let string = 23;
 	let value = isRealString(string);
 	expect(value).toBe(false);
 });

 it('should reject string with only spaces', () => {
 	let string = '     ';
 	let value = isRealString(string);
 	expect(value).toBe(false);
 });

 it('should allow string with non-space characters', () => {
 	let string = 'valid string';
 	let value = isRealString(string);
 	expect(value).toBe(true);
 });

});