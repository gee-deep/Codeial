const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8080;
const app = express();
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
const sassMiddleware = require('node-sass-middleware');
const MongoStore = require('connect-mongo')(session);




app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    prefix: '/css'

}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayout);


app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({ 
    name: 'codeial',
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (100*60*100)
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

app.use('/',require("./routes"));



app.listen(port,function(err){
    if(err) return console.error(`Error: ${err}`);
    return console.log(`Server is Running on Port: ${port}`);
});