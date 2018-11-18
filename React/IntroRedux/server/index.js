const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 4444;
let app = express();

let contacts = require('./db/contacts.js');
let existContacts = contacts.getContacts();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/contacts',(req,res)=>{
    res.send(existContacts);
});

app.get('/contacts/:id',(req,res)=>{
    let details;
    const contact = existContacts.map(c => {
        if(Number(c.id) == req.params.id){
            details = c;
        }
        });
    res.send(details);
});

app.post('/contacts',(req,res)=>{
    console.log("Received data");
    console.log(req.body);
 //   contacts.addContact((req.body));
    res.end();
});

app.post('/contacts/:id',(req,res)=>{
    console.log('Received data for contact ' + req.params.id);
    console.log(req.body);
   // contacts.updateContact((req.body), req.params.id);
    res.end();
});

app.listen(port);
console.log(port);