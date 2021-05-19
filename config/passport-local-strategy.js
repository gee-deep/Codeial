const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

//authentication using passport

passport.use(new LocalStrategy({
    usernameField: 'email',
    },
    function(email,password,done) {
        User.findOne({email: email},function(err,user){
            if(err) return done(err);
            if(!user){
                console.log("No user found");
                return done(null,false);
            }
            if(user.password!=password){
                console.log("Authentication Failed");
                return done(null,false);} 
            return done(null,user);

        });
    })
);

passport.serializeUser(function(user,done){
    return done(null,user.id);
});


passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user) {
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
      });
    
})

passport.checkAuthentication  =function(req,res,next){
    if(req.isAuthenticated())
        return next();
    else
        return res.redirect('/users/sign-in');
};
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated())
        res.locals.user = req.user;
    next();
}


module.exports = passport
