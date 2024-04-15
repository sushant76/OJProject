const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const DBConnection = async() =>{
    const MONGO_URL = process.env.MONGO_URL;
    try{
        await mongoose.connect(MONGO_URL);
        console.log("DBConnection Successful");
    }catch(error){
        console.log("Error while establishing DB Connection : "+ error.message);
    }
}

module.exports = {
    DBConnection
};