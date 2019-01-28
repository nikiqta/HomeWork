const fs = require('fs');

let db = [];

let load = () =>{
  return new Promise ((res,rej)=>{
    fs.readFile('./db/db.json',(err,data)=>{
      if(err){
        console.log(err);
        return
      }  
      console.log('loading...');

      db = JSON.parse(data);
      res(db.sort((a, b) => {
          return Number(b.dateStamp) - Number(a.dateStamp);
      })
          .filter(m => m));
    });
  });
};

let save = () =>{
  return new Promise((res,rej)=>{
    fs.writeFile('./db/db.json',JSON.stringify(db),(err)=>{
      if(err){
        console.log(err);
        return
      }
      res()
    })
  })
};

let add = (movie) =>{
  db.push(movie);
};

let dbCopy = () =>{
  return  db.sort((a, b) => {
        return Number(b.dateStamp) - Number(a.dateStamp);
    })
        .filter(m => m)
  .slice(0);
};

module.exports = {
  load:load,
  save:save,
  getDb:dbCopy,
  add:add
};
