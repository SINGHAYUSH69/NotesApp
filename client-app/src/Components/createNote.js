import { useState,useContext } from "react";
import MDEditor from "@uiw/react-md-editor";
import "../Styles/createNote.css";
import api from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "./themecontext";

const CreateNote=(props)=>{

    const [note,setNote]=useState({title:"",body:""});
    const {active}=useContext(ThemeContext);
    const [loading,setLoading]=useState(false);
    const handleDelete=async()=>{
        if(!props.selectNote?._id){
            return;
        }
        const confirm = window.confirm("Are you sure you want to delete this note?");
        if (!confirm) return;
        try{
            setLoading(true);
            const deleted=await api.delete(`/notes/delete/${props.selectNote._id}`);
            toast.success(deleted.data.message);
            setLoading(false);
            props.setUpdate(prev=>!prev);
            props.setSelectedNote(null);
        }catch(error){
           setLoading(false); 
        }

    }
    const back=()=>{
        props.setSelectedNote(null);
    }
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
            setNote({title:"",body:""});
            props.setUpdate(prev=>!prev);
            props.setSelectedNote(null);
        }catch(error){
            console.log(error);
            toast.error("Could Not Save Note!");
        }
    }
    if(props.selectNote){
        return(
            <div className={active ? "doom" : "bright"}>
        <h2 className={active ? "doom-head" : ""}>{props.selectNote.title}</h2>
        <hr />
        <MDEditor.Markdown source={props.selectNote.body} style={{ padding: 10 }} />
        <div className="foot">
            <div><button type="button" style={{backgroundColor:"rgb(66, 66, 124)",color:"grey",padding:"10px"}} onClick={back}>GO Back</button></div>
            <div><button type="button" style={{backgroundColor:"rgba(178, 71, 81, 1)",color:"grey",padding:"10px"}} onClick={handleDelete} disabled={loading}>{loading?"Deleting...":"Delete"}</button></div>
        </div>
      </div>
        );
    }
    return(
        <div className={active?"doom":"bright"}>
            <h2 className={active?"doom-head":""}>New Note</h2>
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