const express=require("express");
const {createNote,viewNote,deleteNote,updateNote}=require("../controllers/NotesController");
const Notesrouter=express.Router();
const {generateToken,verifyToken}=require("../middleware/jwt");
Notesrouter.post("/create",verifyToken,createNote);
Notesrouter.post("/view",verifyToken,viewNote);
Notesrouter.post("/delete/:id",verifyToken,deleteNote);
Notesrouter.post("/update/:id",verifyToken,updateNote);
module.exports=Notesrouter;