
import "../Styles/viewNote.css";
import api from "./api";
import { useEffect,useState,useContext } from "react";
import "../Styles/viewNote.css";
import ThemeContext from "./themecontext";
const ViewNote=(props)=>{
    const [list,setList]=useState([]);
    const {active}=useContext(ThemeContext);
    useEffect(()=>{
        const fetchNotes=async()=>{
            try{
                const response=await api.post("/notes/view");
                setList(response.data.list);
            }catch(error){
            console.log(error);
            }
        }
        fetchNotes();
    },[props.updated]);
    return(
        <>
        <div className={active?"sidebar dark":"sidebar"}>
            <strong>Notes</strong>
            {list.map((item)=>(
                <div className={active?"item dark":"item"} key={item._id} onClick={()=>props.setSelectedNote(item)}>
                    <h5>{item.title}</h5>
                </div>
            ))}
        </div>
        </>
    );
}
export default ViewNote;