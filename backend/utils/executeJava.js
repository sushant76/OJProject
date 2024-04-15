const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');
const {error} = require('console');
const {stderr, stdout} = require('process');
const { rejects } = require('assert');


const outputPath = path.join(__dirname,'../outputs');


if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true});
}


const executeJava =  (filePath) => {
    const jobID = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath,`${jobID}.java`);


    return new Promise( (resolve,reject) =>{
        exec(`java ${filePath}`,
                (error,stdout,stderr)=>{
                    if(error){
                        reject({error,stderr});
                    }
                    if(stderr){
                        reject(stderr);
                    }
                    resolve(stdout);
                });
    });
};

module.exports = {
    executeJava
};