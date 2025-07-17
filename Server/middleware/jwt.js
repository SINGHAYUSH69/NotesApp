const jwt=require("jsonwebtoken");
const generateToken=(payload)=>{
    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'1h'});
}
const verifyToken=(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(401).send("Token Not Provided");
    }
    const token=authorization.substring(7);
    try{
        const isVerified=jwt.verify(token,process.env.SECRET_KEY);
        req.user={id:isVerified.id};
        next();
    }catch(error){
        return res.status(500).send("Unable to Verify");
    }
}
module.exports={generateToken,verifyToken};