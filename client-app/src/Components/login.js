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
    const redirect=()=>{
        navigate("/user/signup");
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        setError({mailerror:"",perror:""});
        if(!credential.email.trim()||!validator.isEmail(credential.email.trim())){
            setError({mailerror:"Invalid Email!",perror:""});
            return;
        }
        if(credential.password.trim().length<5||!/^[0-9]*$/.test(credential.password)){
            setError({mailerror:"",perror:"Password must only include digits and be atleast 5 char long!"});
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
                 <input type="email" id="email" name="email" onChange={handleChange} value={credential.email} required></input>
                 <h4>{err.mailerror}</h4>
                </div>
                <div className="box">
                 <label htmlFor="pass"><h3>Enter Your Password:</h3></label>
                 <input type="password" id="pass" name="password" onChange={handleChange} value={credential.password} required ></input>
                 <h4>{err.perror}</h4>
                </div>
                <div>
                    <button type="button" onClick={redirect} style={{padding:"0px",backgroundColor:"rgb(228, 223, 223)",border:"0px"}}><h3 style={{color:"blue",marginTop:"0px"}}>New User?Signup</h3></button>
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