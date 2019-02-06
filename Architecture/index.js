const env = process.env.Node_ENV || 'development';

const config = require('./config/config.js')[env];
require('./config/database.js')(config);
const app = require('express')();
require('./config/express.js')(app);
require('./config/routes.js')(app);
require('./config/passport.js')();
app.listen(config.port);