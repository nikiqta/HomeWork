const fs = require('fs');

module.exports = (req, res) => {
       if (req.path.startsWith('/public')){
           fs.readFile('.' + req.path, (err, data) => {

               if (err){
                   console.warn(err);
                   return;
               }

               if (req.path.endsWith('.css')){

                   res.writeHead(200, {
                       'content-type': 'text/css'
                   });

               } else if (req.path.endsWith('.js')){
                   res.writeHead(200, {
                       'content-type': 'application/javascript'
                   });
               } else if(req.path.endsWith('.png')){
                   res.writeHead(200, {
                       'content-type': 'image/png'
                   });
               } else if (req.path.endsWith('jpg')){
                   res.writeHead(200, {
                       'content-type': 'image/jpg'
                   });
               } else if (req.path.endsWith('html')){
                   res.writeHead(200, {
                       'content-type': 'text/html'
                   });
               }

               res.write(data);
               res.end();

           });

       } else {
            fs.readFile('./views/error-404.html', (err, data) => {
                if (err){
                    console.warn(err.message);
                    return;
                }

                res.writeHead(404, {
                    'content-type': "text/html"
                });

                res.write(data);
                res.end();
            });
       }
};