const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { DBConnection } = require('./configuration')

mongoose.Promise = global.Promise;
mongoose.connect(DBConnection);


const app = express();

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// router
app.use('/user', require('./routes/users'));


// start the server
const port = process.env.PORT || 3000 ;
app.listen(port);
console.log(`Server is lintening at ${port}`);