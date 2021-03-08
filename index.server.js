
const express = require('express')
const env = require("dotenv");
const mongoose = require('mongoose')
const bodyparser=require('body-parser')
const port=process.env.PORT || 9000;

const url='mongodb+srv://test_node:Manojan28@cluster0.wz01l.mongodb.net/test_node?retryWrites=true&w=majority'
const app = express()

//environment variable or you can say constants
env.config();
app.use(bodyparser());

const routes = require('./routes/auth');
const adminroutes = require('./routes/admin/auth');

app.use('/api',routes)
app.use('/api',adminroutes)
mongoose.connect(url, 
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    })
const con = mongoose.connection

con.on('open', () => {
  console.log('database connected...')
})


app.listen(port, () => {
    console.log(`Server started ${process.env.PORT}`)
})