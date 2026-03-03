import axios from "axios";

export async function sendUserData(userData,endPoint){
    
        const response =  await axios.post(`${import.meta.env.VITE_BASE_URL}${endPoint}`,userData)
        return response;
    
}