const {EventEmitter} = require('events');

let emitter = new EventEmitter();

function emitEvent(){
    let counter = 0;
    let t = setInterval(() => {
        counter++;

        if (counter > 10) {
            clearInterval(t);
            emitter.emit('end');
        }


        emitter.emit('tick', counter);
    }, 400);
}

emitter.on('tick', (data) => {
   console.log('Event received!' + data);
});

emitter.on('end', () => {
    console.log('Timer ended!');
});

emitEvent();