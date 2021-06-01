const nodemailer = require('../../config/nodemailer');

module.exports.newComment = (comment) =>{
    console.log(comment);
    let htmlContent =nodemailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');
    nodemailer.transporter.sendMail({
        from:'gauravdeep2151@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published!',
        html : htmlContent
    },(err,info) =>{
        if(err) return console.error('Error in Sending Mail');
        return console.log('Message sent',info);
    })
}