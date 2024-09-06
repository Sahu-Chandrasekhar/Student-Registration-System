const express = require('express'); //import Express
const fileUpload = require('express-fileupload')
const app = express();      //store express in app(app.get)
// const mongoose = require('mongoose')
const connectDB = require('./db'); //db.js connectDB import here
const port = process.env.PORT || 5000;  //running port 
const authRoute = require('./routes/authRoute'); //import autRouter
const studentRoutes = require('./routes/studentRoute');
const cors = require('cors')   //npm i cors (for backend)
const logger = require('morgan'); //npm i morgan


connectDB();  //MongoDB connected
app.use(fileUpload());
app.use(express.json()); 
app.use(cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

app.use(logger('tiny')); 
app.get('/', (req, res) => {
    res.send('Hello Welcome Backend');
})

app.use('/api/auth', authRoute);
app.use('/api/students', studentRoutes);



app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
});