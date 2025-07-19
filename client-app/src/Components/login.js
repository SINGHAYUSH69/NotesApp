import "../Styles/login.css";
import {useState} from "react";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./api";
import { useNavigate } from "react-router-dom";
const Login=()=>{
    const [credential,setCredential]=useState({email:"",password:""});
    const [err,setError]=useState({mailerror:"",perror:""});
    const navigate=useNavigate();
    const handleChange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value});
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        setError({mailerror:"",perror:""});
        if(!credential.email.trim()||!validator.isEmail(credential.email.trim())){
            setError((prev)=>({...prev,mailerror:"Invalid Email!"}));
            return;
        }
        if(credential.password.trim().length<5||!/^[0-9]*$/.test(credential.password)){
            setError((prev)=>({...prev,perror:"Password must only include digits and be atleast 5 char long!"}));
            return;
        }
        const email=credential.email;
        const password=credential.password;
        try{
            const response=await api.post("/user/login",{email,password});
            if(response){
                toast.success("Login Successful");
                localStorage.setItem('token',response.data["Successful Login"]);
                setCredential({email:"",password:""});
                navigate("/dashboard");
            }
        }catch(error){
            toast.error("Failed to Login! Please try Again");
        }
    }
    return(
        <div className="body-wrapper">
        <div className="outer">
            <h1 style={{textAlign:"center"}}>Login</h1>
            <form method="post">
                <div className="box">
                 <label htmlFor="email"><h3>Enter Your Email:</h3></label>
                 <input type="email" id="email" name="email" placeholder="johndoe@gmail.com" onChange={handleChange} value={credential.email} required></input>
                 <h4>{err.mailerror}</h4>
                </div>
                <div className="box">
                 <label htmlFor="pass"><h3>Enter Your Password:</h3></label>
                 <input type="password" id="pass" name="password" onChange={handleChange} value={credential.password} required placeholder="12345"></input>
                 <h4>{err.perror}</h4>
                </div>
                <div className="butn">
                    <button type="submit" onClick={handleSubmit} className="butn1">Submit</button>
                </div>
                <ToastContainer />
            </form>
        </div>
        </div>
    );
}
export default Login;