const Posts = require('../models/posts');
const Comments = require('../models/comments');
const User = require('../models/users');

module.exports.home = async function(req,res){
    try{
        let allPosts = await Posts.find({})
        .sort('-updatedAt')
        .populate('user')
        .populate({
            path:'comments',
            options: { sort: { updatedAt: -1 } },
            populate: {
                path: 'user',
            }
        });

        let users = await User.find({});
        
        return res.render('home',{
            title: "HomePage",
            posts: allPosts,
            all_users: users,
        })

    }catch(e){

        return console.error("Error",e);
    }
}

