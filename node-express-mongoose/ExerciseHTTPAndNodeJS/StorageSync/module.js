const notify = require('./notify.js').notify;
const fs = require('fs');

let service = (function (path, len) {

    let storage = {};

     function put(key, value) {
        if (typeof key !== "string") {
            notify.showError("The Key Must be of type String!");
        } else if (storage.hasOwnProperty(key)) {
            notify.showError("The Key already exist!");
        } else {
            storage[key] = value;
        }

        return;
    }

     function get(key) {
        if (typeof key !== "string") {
            notify.showError("The Key Must be of type String!");
            return;
        } else if (!storage.hasOwnProperty(key)) {
            notify.showError("The Key is not present in the DataBase!");
            return;
        }

        return storage[key];
    }

     function getAll() {
        if (Object.keys(storage).length === 0) {
            notify.showError("The DataBase is currently empty!");
        } else {
            return storage;
        }
    }

     function update(key, newValue) {
        if (typeof key !== "string") {
            notify.showError("The Key Must be of type String!");
        } else if (!storage.hasOwnProperty(key)) {
            notify.showError("The Key is not present in the DataBase!");
        } else {
            storage[key] = newValue;
        }
    }

     function remove(key) {
        if (typeof key !== "string") {
            notify.showError("The Key Must be of type String!");
        } else if (!storage.hasOwnProperty(key)) {
            notify.showError("The Key is not present in the DataBase!");
        } else {
            delete storage[key];
        }
    }

    async function clear() {
        try {
            storage = {};
            fs.truncateSync('./storage.json');
        } catch (err) {

        } finally {

        }
    }

    async function save() {
        let fileContent = JSON.stringify(storage);
        let filePath = "./storage.json";

        try {
            fs.writeFileSync(filePath, fileContent, (err) => {
                if (err) {
                    notify.showError("The DataBase is currently empty!");
                }
            });
        } catch (err) {

        } finally {

        }
    }

    async function load() {

        try {
         fs.readFileSync('./storage.json');
        } catch (err) {

        } finally {

        }



    }

    return {put, get, getAll, update, remove, clear, save, load};
})();

module.exports = {service};
