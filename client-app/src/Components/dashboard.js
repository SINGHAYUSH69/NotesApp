import ViewNote from "./viewNote";
import CreateNote from "./createNote";
import "../Styles/dashboard.css";
import { useState } from "react";
import ThemeContext from "./themecontext";
const Dashboard=()=>{
    const [active,setMode]=useState(false);
    const [updated,setUpdate]=useState(false);
    const [selectNote,setSelectedNote]=useState(null);
    const changeMode=()=>{
        setMode(!active);
    }
    return(
        <ThemeContext.Provider value={{active,changeMode}}>
            <div className="dashboard">
                <div className="left-pane">
                    <div className="nav">
                    <button type="button" onClick={changeMode} style={{width:"100%",backgroundColor:active?"black":"#e4dfdf",border:"0px"}}>
                        <img src={active?"/dark.jpg":"/day.jpg"}></img>
                    </button>
                </div>
                <ViewNote updated={updated} setSelectedNote={setSelectedNote}/>
                </div>
                <CreateNote setUpdate={setUpdate} selectNote={selectNote} setSelectedNote={setSelectedNote} />
            </div>
        </ThemeContext.Provider>
    );
}
export default Dashboard;