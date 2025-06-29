const checkAdmin=(req,res,next)=>{
    if(!req.isAdmin){
        return res.status(403).json({message:"Acess denied, Admins only"})  
    }
    next()  
};
module.exports=checkAdmin

