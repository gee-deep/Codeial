const User = require('../models/users');
const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

console.log('Creating');
let opts = {
jwtFromRequest :ExtractJWT.fromAuthHeaderAsBearerToken(),
secretOrKey : 'codeial',
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