const jerry = require('./jerry.js')

console.log(self);
console.log(jerry);

onmessage = function (message) {
  console.log(message)
}
