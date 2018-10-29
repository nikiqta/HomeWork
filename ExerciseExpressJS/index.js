const express = require('express');
const server = require('express-static');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


const port = 3000;
const homeController = require('./controllers/home-controller.js');
const userController = require('./controllers/user-controller.js');
const memeController = require('./controllers/meme-controller.js');
const isAuthenticated = require('./utils/isAuthenticated.js');

require('./config/db')
    .then(() => {
        console.log('Database ready!');

        app.engine('.hbs', handlebars({
            extname: '.hbs',
            partialsDir: [
                path.join(__dirname, 'partials'),
                path.join(__dirname, 'common')
            ],
            layoutsDir:  'views',
            defaultLayout: 'layout'
        }));

        app.set('view engine', '.hbs');

        app.use(fileUpload());
        app.use(cookieParser());
        app.use(session({
            secret: 'Azobi4aMMa4ibozA',
            resave: false,
            saveUninitialized: false
        }));
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use('/public', express.static(path.join(__dirname, 'public')));
        app.use(passport.initialize());
        app.use(passport.session());

        app.get('/', homeController.getHome);
        app.get('/addMeme', isAuthenticated, memeController.getAddMeme);
        app.get('/allMemes/:page', isAuthenticated, memeController.viewAllMemes);
        app.get('/details/:id', isAuthenticated, memeController.getDetails);
        app.get('/delete/:id', isAuthenticated, memeController.removeMeme);
        app.get('/edit/:id', isAuthenticated, memeController.getEditPage );
        app.get('/myMemes/:page', isAuthenticated, memeController.getMyMemes);
        app.get('/login', userController.getLogin);
        app.get('/register', userController.getRegister);
        app.get('/logout', userController.logout);
        app.get('/download/:id', isAuthenticated, memeController.downLoadMeme);
        app.get('/readSession', (req, res) => {
            res.json(req.session);
        });

        app.post('/login', passport.authenticate('local'), userController.postLogin);
        app.post('/register', userController.postRegister);
        app.post('/addMeme', isAuthenticated, memeController.createAddMeme);
        app.post('/edit/:id', isAuthenticated, memeController.editDetails);

        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    })
    .catch(err => console.log('Database Error!'));
