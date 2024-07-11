const express = require('express');


const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const app = express();


app.set('view engine', 'ejs');
app.set('view', path.resolve('./views'));


app.get('/', (req, res)=>{
    res.send('Hello, John');
    console.log('home test');
});

app.get('/about', (req, res)=>{
    res.send('Welcome to about page');
    console.log('about test');
});

app.listen(process.env.PORT, ()=>{
    console.log('server started');
});
