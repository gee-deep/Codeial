const User = require('../models/users');
module.exports.profile = function(req,res){

    console.log(res.locals.user);
    return res.render('user_profile',{
        title: 'User Profile',
    });
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated())
        return res.redirect('/user/profile');
    return res.render('user_signup',{
        title: 'Codeial | Sign Up',
    });
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated())
        return res.redirect('/user/profile');
        
    return res.render('user_signin',{
        title: 'Codeial | Sign In',
    });
}

module.exports.create = function(req,res){
    
    if(req.body.password != req.body.confirm_password){
        console.error("Password Doesn't Match");
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err) return console.error("Error!!");
        if(!user){
            User.create(req.body,function(err,newUser){
                if(err) return console.error("Error");
                console.log(`User Created ${newUser}`);
                return res.render('user_signin',{
                    title: 'Sign-in',
                });

            });
        }
        else{
            console.log("User Already Exists");
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req,res){
    return res.redirect('/user/profile');
}
module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}