const Note=require("../model/NotesModel");
const {generateToken,verifyToken}=require("../middleware/jwt");
const createNote=async (req,res)=>{
    const {title,body}=req.body;
    if(!req.user.id){
        return res.status(401).send({message:"Token Validation Failed!"});
    }
    if(!title){
        return res.status(400).send({message:"Title Cannot be Empty"});
    }
    if(!body){
        return res.status(400).send({message:"Body Cannot be Empty"});
    }
    try{
        const newNote=new Note({title,body,userId:req.user.id});
        await newNote.save();
        if(!newNote){
            return res.status(409).send({message:"Failed to Create Note!"});
        }
        return res.status(201).send({message:"New Note Created"});
    }catch(error){
        console.log(error);
        return res.status(500).send({message:"Server Error"});
    }
}
const viewNote=async (req,res)=>{
    try{
        const NoteList=await Note.find({userId:req.user.id}).sort({updatedAt:-1});
        if(NoteList.length===0){
            return res.status(404).send({message:"No Notes Found"});
        }
        return res.status(200).send({message:NoteList});
    }catch(error){
        console.log(error);
        return res.status(500).send({message:"Failed to fetch Notes"});
    }
}
const deleteNote=async (req,res)=>{
    const {id}=req.params;
    try{
        const exists=await Note.findById(id);
    if(!exists){
        return res.status(404).send({message:"No Note Found"});
    }
    if(exists.userId.toString()!==req.user.id){
        return res.status(403).send({message:"You are Not allowed to Delete this Note"});
    }
        const deletedNote= await Note.findByIdAndDelete(id);
        if(!deletedNote){
            return res.status(401).send({message:"Unable to Delete Note"});
        }
        return res.status(200).send({message:"Note Deleted"});
    }catch(error){
        console.log(error);
        return res.status(500).send({message:"Failed to Reach Server"});
    }
}
const updateNote=async (req,res)=>{
    const {id}=req.params;
    const {title,body}=req.body;
    try{
        const note=await Note.findById(id);
        if(!note){
            return res.status(404).send({message:"No Note Found"});
        }
        if(note.userId.toString()!==req.user.id){
        return res.status(403).send({message:"You are Not allowed to Delete this Note"});
        }
        if(!title){
        return res.status(400).send({message:"Title Cannot be Empty"});
        }
        if(!body){            
            return res.status(400).send({message:"Body Cannot be Empty"});
        }
        const updatednote=await Note.findByIdAndUpdate(id,{title,body},{new:true});
        if(!updatednote){
           return res.status(401).send({message:"Note Could Not be Updated!"}); 
        }
        return res.status(201).send({message:updatednote});
    }catch(error){
        console.log(error);
        return res.status(500).send({message:"Server Error"});
    }
}
module.exports={createNote,viewNote,deleteNote,updateNote};