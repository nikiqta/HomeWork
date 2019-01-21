const fs = require('fs');
const defaultResponse = require('./../utils/defaultResponse.js');

module.exports = (req, res) => {

    const contentTypes = {
        css: 'text/css',
        html: 'text/html',
        png: 'image/png',
        jpg: 'image/jpg',
        js: 'application/javascript',
        fav: 'image/x-icon'
    }

    if(req.path.startsWith('/public')) {

            fs.readFile(`.${req.path}`, (err, data) => {
  
              if(err){
                  console.warn(err.message);
                  return;
              }

              if(req.path.endsWith('.css') && req.method === 'GET'){
                  
                res.writeHead(200, {
                    'content-type': contentTypes.css
                });

              } else if (req.path.endsWith('.png') && req.method === 'GET'){

                res.writeHead(200, {
                     'content-type': contentTypes.png
                });

              } else if (req.path.endsWith('.html') && req.method === 'GET'){

                res.writeHead(200, {
                     'content-type': contentTypes.html
                });

              } else if (req.path.endsWith('.jpg') && req.method === 'GET'){

                res.writeHead(200, {
                     'content-type': contentTypes.jpg
                });

              } else if (req.path.endsWith('.js') && req.method === 'GET'){

                res.writeHead(200, {
                     'content-type': contentTypes.js
                });

              }

              res.write(data);
              res.end();

            });

    } else if (req.path === './favicon.ico' && req.method === 'GET') {
          fs.readFile(`.${req.path}`, (err, data) => {
                 if(err){
                     console.warn(err.message);
                     return;
                 }

                 defaultResponse(res, data, 200, contentTypes.fav);
          });
    } else {
       fs.readFile('./views/error-404.html', (err, data) => {
        if (err) return  console.warn(err.message);


        defaultResponse(res, data, 404, 'text/html');
});
    }


};