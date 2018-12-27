let moment = require('moment');
// Jan 1st 1970 00:00:00 am

let date = moment();
date.add(1, 'year');
console.log(date.format('MMM Do, YYYY'))