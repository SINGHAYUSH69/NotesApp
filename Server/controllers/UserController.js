const User=require("../model/UserModel");
const bcrypt=require("bcryptjs");
const {generateToken,verifyToken}=require("../middleware/jwt");
const UserRegister=async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        const exists=await User.findOne({email});
        if(exists){
            return res.status(409).send("User with this Email Id Already Exists");
        }
        const regex=/^[a-zA-Z\s]*$/;
        if(!regex.test(name)||!name){
            return res.status(400).send("Invalid Name-Must Include only alphabets and whitespace");
        }
        if(password.includes(" ")||!password){
            return res.status(400).send("Invalid Password");
        }
        const newUser=new User({name,email,password});
        await newUser.save();
        return res.status(201).send(`User ${name} registered`);
    }catch(error){
        console.log(error);
        return res.status(400).send("Failed To Register");
    }
}
const UserLogin=async (req,res)=>{
   const {email,password}=req.body;
    if(!email){
        return res.status(401).send("Empty Email");
    }
    const UserExists=await User.findOne({email});
    if(!UserExists){
        return res.status(401).send("Email Not Registered");
    }
    console.log("Entered Password:", password);
    console.log("Hashed Password in DB:", UserExists.password);
    const ismatch=await bcrypt.compare(password,UserExists.password);
    console.log("Password Match:", ismatch);
    if(ismatch){
        const token=generateToken({id:UserExists._id});
        return res.status(200).send({"Successful Login":token});

    }else{
        return res.status(401).send("Invalid Password");
    }
}
const UserDelete= async (req,res)=>{
    const {id}=req.params;
    console.log(id);
    console.log(req.user.id);
    if(req.user.id!==id){
        return res.status(401).send("You are not allowed to delete this");
    }
    try{
        const Userdeleted= await User.findByIdAndDelete(id);
        if(!Userdeleted){
            return res.status(400).send("Unable to delete User");
        }
        return res.status(201).send("User Deleted");
    }catch(error){
        console.log(error);
    }
}
module.exports={UserRegister,UserLogin,UserDelete};