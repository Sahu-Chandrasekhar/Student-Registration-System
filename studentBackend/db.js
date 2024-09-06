const mongoose = require('mongoose');  //import
require('dotenv').config();     // npm install dotenv(import here)



const connectDB = async () => {
    try {
        //process.env.MONGODB_URI (.env call here line no 9)
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('DB connection successful');
    } catch (error) {
        console.error(`DB connection error:${error}`);
        process.exit(1);
    }
}
module.exports = connectDB;
