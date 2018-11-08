const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

app.use(express.static(path.join(__dirname, 'content')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/content/form.html'));
});

app.post('/save-form', (req, res) => {
    console.log(req.body);
    console.log(req.body.firstName);
    console.log(req.body.age);
    res.redirect('/');
});

app.listen(port, () => console.log(`Server is listening on post ${port}...`));
