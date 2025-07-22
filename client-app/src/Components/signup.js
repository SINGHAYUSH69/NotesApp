import { useState } from "react";
import api from "./api";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Signup=()=>{
    const [data,setData]=useState({name:"",email:"",password:""});
    const [err,setError]=useState({nerr:"",merr:"",perr:""});
    const navigate=useNavigate();
    const handleChange=(e)=>{
        setData((prev)=>({...prev,[e.target.name]:e.target.value}));
    }
    const redirect=()=>{
        navigate("/user/login");
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(data.name.trim().length===0||!/^[a-zA-Z\s]+$/.test(data.name.trim())){
            setError({nerr:"Name cannot be empty or contain digits/special characters",merr:"",perr:""});
            return;
        }
        if(data.email.trim().length===0||!validator.isEmail(data.email.trim())){
            setError((prev)=>({nerr:"",merr:"Invalid Email!",perr:""}));
            return;
        }
        if(data.password.trim().length<5||!/^[0-9]*$/.test(data.password.trim())){
            setError((prev)=>({nerr:"",merr:"",perr:"Password cannot contain non digits or be less than 5 characters!"}));
            return;
        }
        const name=data.name;
        const email=data.email;
        const password=data.password;
        try{
            const mess=await api.post("/user/signup",{name,email,password});
            toast.success(mess.data);
            setData({name:"",email:"",password:""});
            setError({nerr:"", merr:"", perr:""});
            setTimeout(() => navigate("/user/login"), 1500);
        }catch(error){

        }
    }
    return (
        <div className="body-wrapper">
        <div className="outer">
            <h1 style={{textAlign:"center"}}>Signup</h1>
            <form method="post">
                <div className="box">
                    <label htmlFor="name"><h3>Enter Your Name:</h3></label>
                    <input type="text" id="name" name="name" value={data.name} onChange={handleChange} required></input>
                    <h4>{err.nerr}</h4>
                </div>
                <div className="box">
                    <label htmlFor="mail"><h3>Enter Your Email:</h3></label>
                    <input type="email" id="mail" name="email" value={data.email} onChange={handleChange} placeholder="ex. johndoe@gmail.com" required></input>
                    <h4>{err.merr}</h4>
                </div>
                <div className="box">
                    <label htmlFor="pass"><h3>Create your Password:</h3></label>
                    <input type="password" id="pass" name="password" value={data.password} onChange={handleChange} autoComplete="false" placeholder="Only Digits" required></input>
                    <h4>{err.perr}</h4>
                </div>
                <div>
                    <button type="button" onClick={redirect} style={{padding:"0px",backgroundColor:"rgb(228, 223, 223)",border:"0px"}}><h3 style={{color:"blue",marginTop:"0px"}}>Already Registered?Login</h3></button>
                </div>
                <div className="butn">
                    <button type="submit" onClick={handleSubmit} className="butn1">Register</button>
                </div>
            </form>
            <ToastContainer/>
        </div>
        </div>
    );
}
export default Signup;