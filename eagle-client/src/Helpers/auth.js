module.exports = {
  ensureAuthenticated: function(req, res, next){
    if(req.isAuthenticated()) {
      //console.log("emily auth.js")
      return next();
    }
    //req.flash('error_msg', "Not authorized");
    res.redirect('/login')
  }
}