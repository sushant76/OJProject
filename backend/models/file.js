const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    path:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    downloadcount:{
        type:Number,
        required:true,
        default:0
    }
});
const File = mongoose.model('file',FileSchema);
module.exports = {
    File
};