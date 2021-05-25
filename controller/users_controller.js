const User = require('../models/users');

module.exports.profile = async function(req,res){
    try {
            
        let user = await User.findById(req.params.id);
        return res.render('user_profile',{
            title: 'User Profile',
            requested_user: user
        });

    } catch (error) {
        return console.error("Error",error);
    }
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated())
        return res.redirect('/');
    return res.render('user_signup',{
        title: 'Codeial | Sign Up',
    });
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated())
        return res.redirect('/');
        
    return res.render('user_signin',{
        title: 'Codeial | Sign In',
    });
}

module.exports.create = function(req,res){
    
    if(req.body.password != req.body.confirm_password){
        req.flash('error','Password doesn\'t match')
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err) return console.error("Error!!");
        if(!user){
            User.create(req.body,function(err,newUser){
                if(err) {
                    req.flash('error','Something went wrong');
                    return console.error("Error");
                }
                req.flash('success','Account Created. Sign in to continue.');
                return res.redirect('/user/sign-in');
            });
        }
        else{
            req.flash('error','User Already Registered');
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req,res){

    req.flash('success','Logged In Successfully');
    return res.redirect('/');

}

module.exports.destroySession = function(req,res){
    
    req.logout();
    req.flash('success','You Have been Logged Out');
    return res.redirect('/');

}

module.exports.updateProfile = function(req,res){
    if(req.params.id === req.user.id){
        User.findOne({email: req.body.email}, function(err,user){
            if(err) return console.error(err);
            if(!user || user.id===req.user.id){
                User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
                    if(err) return console.error(err);
                    console.log(user);
                    req.flash('success','User Details Updated');
                    return res.redirect('back');
                });            
            }else{
                req.flash('error','Email Already in use');
                return res.redirect('back');
            }
            
        })
    }
    else{
        req.flash('error','Unauthorised Request');
        return res.redirect('back');
    }
}