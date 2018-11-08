const notify = require('./notify.js').notify;
const fs = require('fs');

let service =  (function () {

    let storage = {};

    function put(key, value) {
        if (typeof key !== "string"){
            notify.showError("The Key Must be of type String!");
        } else if(storage.hasOwnProperty(key)){
            notify.showError("The Key already exist!");
        } else {
            storage[key] = value;
        }

        return;
    }
    function get(key) {
        if (typeof key !== "string"){
            notify.showError("The Key Must be of type String!");
            return;
        } else if(!storage.hasOwnProperty(key)){
            notify.showError("The Key is not present in the DataBase!");
            return;
        }

        return storage[key];
    }
    function getAll() {
        if (Object.keys(storage).length === 0){
        notify.showError("The DataBase is currently empty!");
        } else {
            return storage;
        }
    }
    function update(key, newValue) {
        if (typeof key !== "string"){
            notify.showError("The Key Must be of type String!");
        } else if(!storage.hasOwnProperty(key)){
            notify.showError("The Key is not present in the DataBase!");
        } else {
            storage[key] = newValue;
        }
    }
    function remove(key) {
        if (typeof key !== "string"){
            notify.showError("The Key Must be of type String!");
        } else if(!storage.hasOwnProperty(key)){
            notify.showError("The Key is not present in the DataBase!");
        } else {
            delete storage[key];
        }
    }
    function clear() {
         storage = {};
        fs.truncate('./storage.json', 0, function(){return})
    }
    function save() {

        let fileContent = JSON.stringify(storage);
        let filePath = "./storage.json";

        fs.writeFile(filePath, fileContent, (err) => {
            if (err){
                notify.showError("The DataBase is currently empty!");
            }
        });
    }
    function load() {
        let content;
        fs.readFile('./storage.json', function read(err, data) {
            if (err) {
                return;
            } else if(data){
                console.log(data);
            }
        });
    }

    return {put, get, getAll, update, remove, clear, save, load};
})();

module.exports = {service};
