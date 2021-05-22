const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = function(req, res){

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
module.exports.deletePost = function(req,res){

    Posts.findById(req.params.id, function(err,post){
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