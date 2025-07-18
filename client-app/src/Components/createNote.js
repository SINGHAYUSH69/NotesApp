import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "../Styles/createNote.css";
import api from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateNote=()=>{
    const [note,setNote]=useState({title:"",body:""});
    const setTitle=(e)=>{
        setNote((prev)=>({...prev,title:e.target.value}));
    }
    const setBody=(value)=>{
        setNote((prev)=>({...prev,body:value}));
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await api.post("/notes/create",{title:note.title,body:note.body});
            toast.success(response.data.message);
        }catch(error){
            console.log(error);
            toast.error("Could Not Save Note!");
        }
    }
    return(
        <div className="outer">
            <h2>New Note</h2>
            <div>
                <label htmlFor="title"><h3>Title:</h3></label>
                <input type="text" id="title" name="title" value={note.title} onChange={setTitle} className="input2" required></input>
            </div>
            <hr></hr>
            <div>
                <MDEditor value={note.body}  preview="view" onChange={setBody}/>
            </div>
            <div className="box2">
                <button className="butn2" onClick={handleSubmit}>Save</button>
            </div>
            <ToastContainer/>
        </div>
    );
}
export default CreateNote;