const Post = require('../models/posts');
const Comments = require('../models/comments');

module.exports.create = async function(req, res){

    try {

        await Post.create({
            content: req.body.content,
            user : req.user._id,
        });
        return res.redirect('back');
        
    }catch (error){

        return console.log("Error creating post", error);
    }

}
module.exports.deletePost = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);            
        if(post.user==req.user.id){
            
            post.remove();
            await Comments.deleteMany({post: req.params.id});
            return res.redirect('/');
        }
        else{
            console.log("UnAuthorised Request");
            return res.redirect('back');
        }

    }catch (error){
        return console.log("Error",error);
    }
    
}