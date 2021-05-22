const Post = require('../models/posts');
const Comments = require('../models/comments');

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
module.exports.deletePost = function(req,res){

    Post.findById(req.params.id, function(err,post){
        if(err){
            console.log('Error!!!',err);
            return res.redirect('/');
        }
        if(!post || post.user != req.user.id){
            console.log('Unauthorized');
            return res.redirect('/');
        }

        post.remove();
        Comments.deleteMany({post: req.params.id}, function(err){
            console.log("Error in Deleting Comments.",err);
        });
        return res.redirect('/');

    });
}