module.exports = {
  getHome: async (req, res) => {
    const user = req.user ? req.user : '';
    const isAdmin = user && user.isInRole('Admin');
    res.render('home/index', {
      user,
      isAdmin
    });
  }
};
