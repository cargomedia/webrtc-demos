function Demo() {
}

Demo.prototype.run = function() {
};

Demo.prototype.log = function(message, context) {
  message = this.constructor.name + ':: ' + message;
  if (context) {
    console.log(message, context);
  } else {
    console.log(message);
  }
};

module.exports = Demo;

