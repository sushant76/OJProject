const express = require('express');
const { generateFile } = require('../utils/generateFile.js');
const { executeJava } = require("../utils/executeJava.js");
const {upload} = require('../utils/upload.js');
//const {getImage,uploadImage,fetchFiles} = require('../controller/image-controller.js');
const {User} = require('../models/user.js');
const {File} = require('../models/file.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello there");
});

router.post("/register", async (req, res) => {
    try {
        //get all data from frontend
        const { firstname, lastname, email, password } = req.body;

        //check all data should exist
        if (!(firstname && lastname && email && password)) {
            return res.status(400).json({message : " please enter all the information"});
        }

        // check if user already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({message :"User already exists!"});
        }

        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //save the user in the database
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        //generate the token for the user and send it
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, { expiresIn: "1h" });
        user.token = token;
        user.password = undefined;
        res.status(200).json({
            message: "You have successfully registered!",
            user,
            success:true
        });
    } catch (error) {
        console.log("Error in registering user : " + error.message);
        return res.status(400).json({message : "Error in registering user : " + error.message});
    }
});

router.post("/login", async (req, res) => {
    try {
        //get all the user data
        const { email, password } = req.body;

        // check all the data should exists
        if(!(email && password)){
            return res.status(400).json({
                message: "Please check email and password",
                success: false
            });
        }

        //find the user in the db
        const user = await User.findOne({email});
        if(!user){
            return req.statusCode(404).json({
                message: "User not found",
                success: false
            });
        }

        //match the password
        const enteredPassword = await bcrypt.compare(password, user.password);
        if(!enteredPassword){
            return res.status(400).json({
                message: "Password is incorrect",
                success: false
            });
        }

        //generate the token for the user and send it 
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn:"1h"});
        user.token = token;
        user.password = undefined;


        //store cookies
        const options = {
            expiresIn: Date(Date.now() + 1*24*60*60*1000),
            httpOnly: true,//can be maniputed only by server and not by user/frontend
        };


        //send the token
        res.status(200).cookie("token",token,options).json({
            message:"you have successfully logged in!",
            success:true,
            token
        })
    } catch (error) {
        console.log("Error while login : " + error.message);
    }
})

router.post("/submit", async (req, res) => {
    const { language = 'java', code } = req.body;
    if (code == undefined) {
        return res.status(400).json({ success: false, error: "empty code body" });
    }
    try {
        const filePath = await generateFile(language, code);
        const output = await executeJava(filePath);
        console.log(output);
        res.json({ filePath, output,success:true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.stderr});
    }
});

const uploadImage = async (req,res) =>{
    const fileObj = {
        path:req.file.path,
        name:req.file.originalname
    }

    try{
        const file = await File.create(fileObj);
        res.status(200).json({
            path:`http://localhost:8000/file/${file._id}`
        })
    }catch(error){
        console.log("Error in uploadImage : " + error.message);
    }
};
router.post('/upload',upload.single('file'),uploadImage);




const getImage = async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);
        file.downloadcount++;
        await file.save();

        res.download(file.path, file.name);
    } catch (error) {
        console.log(error.message);
    }
};
router.get('/file/:fileId',getImage);

const fetchFiles = async (req, res) => {
    try {
        const fileNames = await File.find({},{name:1,_id:0});
        if(!fileNames){
            return res.status(404).json({
                message: "No files found",
                success: false
            });
        } 
        return res.status(200).json({
            fileNames,
            success:true
        })
    } catch (error) {
        console.log(error.message);
    }
};
router.get('/fetchFiles',fetchFiles);

module.exports = {
    router
};