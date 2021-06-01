const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const User = require('../models/users');
const env = require('./environment');


passport.use(new GoogleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_url
  },
    function(accessToken, refreshToken, profile, cb){
        
        User.findOne({ email: profile.emails[0].value}, function (err, user) {
            if(err) {
               return console.log("Error in GoogleStrategy",err);
            }
            if(user){
                return cb(null,user);
            }
            else{
                User.create({ 
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar : profile.photos[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function (err, newUser){
                    if(err) return console.error(err);
                    return cb(null,newUser); 
                })
            }
        });
      }
));

module.exports = passport;

