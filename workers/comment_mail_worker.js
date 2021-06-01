const queue = require('../config/kue');
const commentsMailer = require('../controller/mailers/comments_mailer');

queue.process('emails',function(job,done) {

    console.log('Email Queue is being processed');
    commentsMailer.newComment(job.data);
    done();


})