const events = require('events');

const emitter = new events.EventEmitter();

emitter.on('fireAlarm', function () {
      console.log("the roof is on fire!!!");
});

module.exports = {emitter};

emitter.emit('fireAlarm');