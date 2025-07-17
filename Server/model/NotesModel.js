const {Schema,model}=require("mongoose");
const NoteSchema=new Schema({
    title:{type:String,trim:true,required:true},
    body:{type:String,trim:true,required:true},
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true}
},{
    timestamps:true,
});
const Notemodel=model("Notes",NoteSchema);
module.exports=Notemodel;