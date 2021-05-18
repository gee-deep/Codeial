const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8080;
const app = express();
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');

app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(expressLayout);
app.use(cookieParser());

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/',require("./routes"));

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err) return console.error(`Error: ${err}`);
    return console.log(`Server is Running on Port: ${port}`);
});