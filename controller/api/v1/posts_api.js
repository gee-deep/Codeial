const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');
module.exports.index = async function(req,res){
    try{
        let post = await Post.find({});
        return res.status(200).json({
            message:'Success',
            data:{ 
                posts: post
            }
        });

    }catch(err){
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
    

}
module.exports.deletePost = async function(req,res){
    try {

        let post = await Post.findById(req.params.id);
        
        if(!post){

            return res.status(404).json({
                message:'Undefined',
                data:{ 
                    message: 'Requested Post Doen\'t Exist',
                }
            })
        }
        
        
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            
            return res.status(200).json({
                message: 'Success',
                data: { 
                    message: 'Post and Related Comment deleted successfully',
                }
            });
        }else{
            return res.status(401).json({
                message: 'Unauthorised Request',
            })
        }
        
    }catch(err){

        console.error(err);
        return res.status(500).json({
            message:"Internal Server Error"
        });
        
    }

}