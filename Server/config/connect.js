const {connect}=require("mongoose");
const db_connect=async ()=>{
    try{
        await connect(`${process.env.DB_URL}/${process.env.DB_name}`);
        console.log("Database Connected");
    }catch(error){
        console.log(error);
    }
}
db_connect();
