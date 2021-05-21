const Post = require('../models/posts');

module.exports.create = function(req, res){

    Post.create({
        content: req.body.content,
        user : req.user._id,
    },function(err,newPost){
        if(err){
            return console.error(err);
        }
        return res.redirect('back');

    });

}