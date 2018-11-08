const storage = require('./module.js').service;

storage.load().then();
storage.put('first','firstValue');
storage.put('second','secondValue');
storage.put('third','thirdValue');
storage.put('fourth','fourthValue');
console.log(storage.get('first'));
console.log(storage.getAll());
storage.remove('second');
storage.update('first','updatedFirst');
storage.save().then();
console.log(storage.getAll());
storage.clear().then();
storage.load().then();
console.log(storage.getAll());
storage.put('first','firstValue');
storage.put('second','secondValue');
storage.remove('second');
storage.remove('second');
storage.put(2,'someValue');
storage.put('cat','dog');
storage.put('cat','anotherDog');
console.log(storage.getAll());



