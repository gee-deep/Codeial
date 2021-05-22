const Posts = require('../models/posts');
const Comments = require('../models/comments');

module.exports.home = function(req,res){
    Posts.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate: {
            path: 'user',
        }
    })
    .exec(function(err,allPosts){
        if(err){
            return console.error(err);
        }
        return res.render('home',{
            title: "HomePage",
            posts: allPosts,
        })
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