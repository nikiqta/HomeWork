const storage = require('./module.js').service;

storage.load();
storage.put('first','firstValue');
storage.put('second','secondValue');
storage.put('third','thirdValue');
storage.put('fourth','fourthValue');
console.log(storage.get('first'));
console.log(storage.getAll());
storage.remove('second');
storage.update('first','updatedFirst');
storage.save();
console.log(storage.getAll());
storage.clear();
storage.load();
console.log(storage.getAll());
storage.put('first','firstValue');
storage.put('second','secondValue');
storage.remove('second');
storage.remove('second');
storage.put(2,'someValue');
storage.put('cat','dog');
storage.put('cat','anotherDog');
console.log(storage.getAll());



