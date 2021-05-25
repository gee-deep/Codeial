const Post = require('../models/posts');
const Comments = require('../models/comments');

module.exports.create = async function(req, res){

    try {

        await Post.create({
            content: req.body.content,
            user : req.user._id,
        });
        req.flash('success','Post Created');
        return res.redirect('back');
        
    }catch (error){

        req.flash('error','Something went wrong');
        return console.log("Error creating post", error);
    }

}
module.exports.deletePost = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);            
        if(post.user==req.user.id){
            
            post.remove();
            await Comments.deleteMany({post: req.params.id});
            req.flash('success','Post deleted successfully');
            return res.redirect('/');
        }
        else{
            req.flash('error','Unauthorised Request');
            return res.redirect('back');
        }

    }catch (error){
        req.flash('error','Something went wrong');
        return console.log("Error",error);
    }
    
}