const User = require('../models/users');
const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./environment');

let opts = {
jwtFromRequest :ExtractJWT.fromAuthHeaderAsBearerToken(),
secretOrKey : env.jwt_key,
};

passport.use(new JWTstrategy(opts, function(jwt_payload, done){
    User.findById(jwt_payload._id,function(err, user){
        if(err){
            return done(err,false);
        
        }if(user){
            return done(null,user);
        
        }else{
            return done(null,false);
        }
    });
}));

module.exports = passport;