const express = require('express');
const {router} = require('./routes/router.js');
const cors = require('cors');
const {DBConnection} = require('./database/db.js');
const PORT = process.env.port || 8000;

const app = express();


//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



DBConnection();
app.use("/",router);


app.listen(PORT, () =>{
    console.log("Server is listening to port 8000!");
})