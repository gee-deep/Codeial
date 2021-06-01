const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path: logDirectory
});


const development = {

    name: 'development',
    asset_path : './assets',
    session_cookie_key : 'blahsomething',
    db : 'codeial_development',
    smtp :{
        service: 'gmail',
        host: "smtp.google.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.emailUser, 
            pass: process.env.emailPass, 
            }
        },
    google_client_id: process.env.clientID,
    google_client_secret: process.env.clientSecret,
    google_callback_url: "http://localhost:8080/user/oauth/google/callback",
    jwt_key: 'codeial',
    morgan: { 
        mode: 'dev',
        options: {stream: accessLogStream}
    }


}

const production = {
    name : 'production',    
    asset_path : process.env.assetPath,
    session_cookie_key : process.env.sessionCookie,
    db :process.env.db,
    smtp :{
        service: 'gmail',
        host: "smtp.google.com",
        port: process.env.smtpPort,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.emailUser, 
            pass: process.env.emailPass, 
            }
        },
    google_client_id: process.env.clientID,
    google_client_secret: process.env.clientSecret,
    google_callback_url: process.env.googleCallbackUrl,
    jwt_key: process.env.JWTSecretKey,
    morgan: { 
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT)