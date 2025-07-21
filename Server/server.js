require("dotenv").config();
require("./config/connect");
const cors=require("cors");
const express=require("express");
const UserRoute=require("./routes/userRoutes");
const Notesrouter=require("./routes/NoteRoutes");
const app=express();
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Home Page");
});
app.use("/user",UserRoute);
app.use("/notes",Notesrouter);
app.listen(80,()=>{
    console.log("Server Started");
});
module.exports=app;
