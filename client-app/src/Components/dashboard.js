import ViewNote from "./viewNote";
import CreateNote from "./createNote";
import "../Styles/dashboard.css";
import { useState } from "react";
import ThemeContext from "./themecontext";
import {useNavigate} from "react-router-dom";
const Dashboard=()=>{
    const [active,setMode]=useState(false);
    const [updated,setUpdate]=useState(false);
    const [selectNote,setSelectedNote]=useState(null);
    const navigate=useNavigate();
    const changeMode=()=>{
        setMode(!active);
    }
    const handleBack=()=>{
        localStorage.removeItem('token');
        navigate("/user/signup");
    }
    return(
        <ThemeContext.Provider value={{active,changeMode}}>
            <div className={active?"nav darkbar":"nav"}>
                <button type="button" onClick={changeMode} style={{width:"10%",backgroundColor:active?"rgb(48, 31, 31)":"#e4dfdf",border:"0px"}}>
                    <img src={active?"/dark.jpg":"/day.jpg"} alt="Mode"></img>
                </button>
                <button type="button"  onClick={handleBack} style={{width:"10%",backgroundColor:active?"rgb(48, 31, 31)":"#e4dfdf",border:"0px"}}>
                    <img src="/logout.png" alt="Logout"></img>
                </button>
            </div>
            <div className="dashboard">
                <div className="left-pane">
                    <ViewNote updated={updated} setSelectedNote={setSelectedNote}/>
                </div>
                <CreateNote setUpdate={setUpdate} selectNote={selectNote} setSelectedNote={setSelectedNote} />
            </div>
        </ThemeContext.Provider>
    );
}
export default Dashboard;