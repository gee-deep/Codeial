const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.createComment = function(req, res){

    Post.findById(req.body.post,function(err,post){
        if(err){
            console.log("Tempered Post Id. Redirecting Back.")
            return res.redirect('back');
        }
        if(!post){
            console.log("No post");
            return res.redirect('back');
        }
        Comment.create({
            comment: req.body.comment,
            post: req.body.post,
            user: req.user._id
        },function(err,newComment){
            if(err) return console.error(err);
            console.log(newComment);
            post.comments.push(newComment);
            post.save()
            return res.redirect('back');
        });
    });    
}

module.exports.deleteComment = function(req,res){

}