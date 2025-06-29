const User= require("../models/User")
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken")

const register = async (req, res) => {
  const { name, email, password,isAdmin } = req.body;

  try {
    const existinguser = await User.findOne({ email });
    if (existinguser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password , isAdmin: isAdmin === true || isAdmin === "true"});
    
    await newUser.save();

     res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
         isAdmin: newUser.isAdmin
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error in registering user", error: err.message });
  }
};

const login=async(req,res)=>{
    const{email,password}=req.body
    try{
        const user= await User.findOne({email})
        if(!user) return res.status(400).json({message:"Invalid credentials"})
    const isMatch=await bcrypt.compare(password,user.password)
     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

         const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.status(200).json({token,user:{name:user.name,email:user.email,isAdmin:user.isAdmin}});
    }
    catch(err){
          res.status(500).json({ message: "Error logging in", error: err.message });
    }
}
module.exports={register,login}