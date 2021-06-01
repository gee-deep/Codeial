const mongoose = require('mongoose');

const commentSchema  = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps : true
});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;