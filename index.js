const express = require('express');

const { connectMongoDb } = require('./connection')
const userRouter = require('./routes/user');
const {logReqRes} = require('./middlewares');


const path = require('path');
const dotenv = require('dotenv');
const { type  } = require('os');
dotenv.config();
const app = express();



// Connection
connectMongoDb('mongodb://localhost:27017/signer-dev-1').then(()=>console.log("MongoDB Connected"));
    

app.set('view engine', 'ejs');
app.set('view', path.resolve('./views'));
app.use(logReqRes('log.txt'));

app.use('/api/user', userRouter);


app.listen(process.env.PORT, ()=>{
    console.log('server started');
});
