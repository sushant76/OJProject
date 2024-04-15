import axios from 'axios';
const SERVER_URL = 'http://localhost:8000';
export const uploadFile = async(data) => {
    try{
        const response = await axios.post (`${SERVER_URL}/upload`,data);
        return response.data;
    }catch(error){
        console.log(error.message);
    }
}


export const getFiles = async()=>{
    try{
        const response = await axios.get (`${SERVER_URL}/fetchFiles`);
        return response.data;
    }catch(error){
        console.log("Error in fetching files :" +error.message);
    }
}