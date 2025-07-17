const {UserRegister,UserLogin,UserDelete}=require("../controllers/UserController");
const {generateToken,verifyToken}=require("../middleware/jwt");
const express=require('express');
const router=express.Router();
router.post("/login",UserLogin);
router.post("/signup",UserRegister);
router.delete("/delete/:id",verifyToken,UserDelete);
module.exports=router;