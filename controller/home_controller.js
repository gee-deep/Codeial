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

