const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
const port = 8080;
const app = express();
require('./config/view-helpers')(app);
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-googleoauth2-strategy');
const session = require('express-session');
const sassMiddleware = require('node-sass-middleware');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/flash-custom-middleware');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
const env = require('./config/environment');
//Setting Up Chat Server
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat Server is Running');
const path = require('path');

app.use(sassMiddleware({
    src: path.join(__dirname,env.asset_path,'scss'),
    dest: path.join(__dirname,env.asset_path,'css'),
    prefix: '/css'

}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(env.asset_path));
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(logger(env.morgan.mode,env.morgan.options));
app.use(expressLayout);


app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({ 
    name: 'codeial',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*60*24)
    },
    store: new MongoStore({
        mongooseConnection :db,
        autoRemove: false
    },function(err){
        return console.error(err);
    })

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);












app.use('/',require("./routes"));



app.listen(process.env.PORT,function(err){
    if(err) return console.error(`Error: ${err}`);
    
    return console.log(`Server is Running on Port: ${process.env.PORT}`);


    




});