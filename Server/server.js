require('dotenv').config();
require("./config/connect");
const express=require("express");
const UserRoute=require("./routes/userRoutes");
const Notesrouter=require("./routes/NoteRoutes");
const app=express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Home Page");
});
app.use("/user",UserRoute);
app.use("/notes",Notesrouter);
app.listen(3000,()=>{
    console.log("Server Started");
});