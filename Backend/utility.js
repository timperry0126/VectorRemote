const { FIRST_NAMES, LAST_NAMES } = require('./constants');

module.exports.getRandomListValue = (list) => {
     return list[Math.floor(Math.random() * list.length)];
}
 
module.exports.getRandomFullName = () => {
     const firstName = this.getRandomListValue(FIRST_NAMES);
     const lastName = this.getRandomListValue(LAST_NAMES);
     return `${firstName} ${lastName}`;
}

module.exports.cleanString = (str) => {
     return str.replace(/\s+/g, '').toLowerCase();
 }