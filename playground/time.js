//Jan 1st 1970 00:00:00 am


const moment = require('moment');


// var date = new Date();
// console.log(date.getMonth());

// var date = moment();
//date.add(5, 'year').subtract(2,'months');

// console.log(date.format('MMM Do YYYY'));

//10:35 am
//unpadded version for hours, padded version for minutes
//you can pass an argument to moment to get a specific date.

var someTime = moment().valueOf();
console.log(someTime);

var newdate = moment();

console.log(newdate.format('h:mm a'));