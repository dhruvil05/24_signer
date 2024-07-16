const express = require('express');
const cookieParser = require('cookie-parser');
const { connectMongoDb } = require('./connection')
const userRouter = require('./routes/user');
const {logReqRes} = require('./middlewares');
const {checkAuthenticationcookie} = require('./middlewares/auth');

const path = require('path');
const dotenv = require('dotenv');
const { type  } = require('os');
dotenv.config();
const app = express();



// Connection
connectMongoDb(process.env.DB_URL).then(()=>console.log("MongoDB Connected")).catch((err)=>console.log('MongoDB Error', err));

app.set('view engine', 'ejs');
app.set('view', path.resolve('./views'));
app.use(logReqRes('log.txt'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuthenticationcookie("token"));

app.use('/api/user', userRouter);


app.listen(process.env.PORT, ()=>{
    console.log('server started');
});
