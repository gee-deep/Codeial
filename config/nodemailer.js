const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.google.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.emailUser, 
        pass: process.env.emailPass, 
    },
});

let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,"../views/mailers",relativePath),
        data,
        function(err,template){
            if(err) return console.error("Error rendering Template",err);
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}


// // send mail with defined transport object
// let info = await transporter.sendMail({
// from: '"Fred Foo 👻" <foo@example.com>', // sender address
// to: "bar@example.com, baz@example.com", // list of receivers
// subject: "Hello ✔", // Subject line
// text: "Hello world?", // plain text body
// html: "<b>Hello world?</b>", // html body
// });

// console.log("Message sent: %s", info.messageId);
// // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// // Preview only available when sending through an Ethereal account
// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
