import axios from "axios";
import {toast} from "react-toastify";
const api=axios.create({
    baseURL:"http://localhost:80",
    headers:{
        "Content-Type":"application/json",
    },
});
api.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem('token');
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }
        return config;
    },
    (error)=>Promise.reject(error),
);
api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response){
            const status=error.response.status;
            switch (status) {
                case 400:
                    toast.error("Bad Request!");
                    break;
                case 401:
                    alert("Unauthorized. Please login again.");
                    break;
                case 403:
                    toast.error("Forbidden: You dont have permission.");
                    break;
                case 404:
                    toast.error("Resource not found.");
                    break;
                case 409:
                    toast.error("Conflict. User may already exist.");
                    break;
                case 500:
                    toast.error("Server error. Try again later.");
                    break;
            }
        }else{
            toast.error("Network Issue!");
        }
        return Promise.reject(error);
    }
);
export default api;
