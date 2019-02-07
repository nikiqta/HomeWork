const threadApi = require('./../api/threadApi.js');
const restrictions = require('./../config/auth.js');

module.exports = {
  getHome: async (req, res) => {
    const user = req.user;

    if(restrictions.hasRole('Admin')){
      try {
        const threads = await threadApi.getAllThreads();
        res.render('home/index', {
          threads
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      res.render('home/index');
    }
  }
};
