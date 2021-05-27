const passport = require('passport');
const User = require('../../../models/users');
const jwt = require('jsonwebtoken');

module.exports.createToken = async function(req,res){
    
    try{
        let user = await User.findOne({email:req.body.email});
        // console.log(user);

        if((!user) || (user.password != req.body.password)){
            
            return res.status(401).json({
                message: 'Unauthorised',
            });
        
        }else{

            return res.status(200).json({
                message: 'Authentication Successful.',
                data: {
                    message: 'Here is the Token. Keep it Safe.',
                    token: jwt.sign(user.toJSON(), 'codeial', {expiresIn : '3600000'}),
                }
            })
        }
        
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message:'Internal Server Error',
        });
    }
    
}