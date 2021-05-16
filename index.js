const express = require('express');
const port = 8080;

app.listen(port,function(err){
    if(err) return console.error(`Error: ${err}`);
    return console.log(`Server is Running on Port: ${port}`);
});