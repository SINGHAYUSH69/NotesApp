const {model,Schema}=require("mongoose");
const validator=require("validator");
const bcrypt=require('bcryptjs');
const UserSchema=new Schema({
    name:{type:String,required:true,lowercase:true,trim:true},
    email:{type:String,required:true,trim:true,unique:true,validate:[validator.isEmail,"Invalid Email Format"]},
    password:{type:String,required:true,minlength:5,trim:true}
},{
    timestamps:true,
});
UserSchema.pre('save',async function (next){
    if(this.modifiedPaths().includes("password")){
        this.password=await bcrypt.hash(this.password,8);
    }
    next();
})
const UserModel=model("User",UserSchema);
module.exports=UserModel;