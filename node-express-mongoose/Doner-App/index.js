const env = process.env.NODE_ENV || 'development';

const config = require('./config/config.js')[env];
require('./config/db.js')(config);
const app = require('express')();
require('./config/express.js')(app);
require('./config/routes.js')(app);
require('./config/passport.js')();
app.listen(config.port);
console.log(`Server is listening on port ${config.port}...`);



