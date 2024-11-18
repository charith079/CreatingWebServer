const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

function connectDb(){
  mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });
}
module.exports = connectDb;