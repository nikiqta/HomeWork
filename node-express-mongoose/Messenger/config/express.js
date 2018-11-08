const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

module.exports = app => {

    app.engine('.hbs', handlebars({
        extname: '.hbs',
        partialsDir: 'views/partials',
        layoutsDir: 'views/layouts',
        defaultLayout: 'main'
    }));

    app.set('view engine', '.hbs');

    app.use(fileUpload());
    app.use(cookieParser());
    app.use(session({
        secret: 'Azobi4aMMa4ibozA',
        resave: false,
        saveUninitialized: false
    }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/static', express.static('static'));
    app.use(passport.initialize());
    app.use(passport.session());

};