const Posts = require('../models/posts');


module.exports.home = function(req,res){
 
    Posts.find({}).populate('user').exec(function(err,allPosts){
        if(err){
            return console.error(err);
        }
        return res.render('home',{
            title: "HomePage",
            posts: allPosts,
        })
    });
}
